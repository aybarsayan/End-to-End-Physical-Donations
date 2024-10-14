import React, { useState, useEffect } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import {
  AptosClient,
  Types,
  AptosAccount,
  FaucetClient,
  CoinClient,
} from "aptos";

// Firebase configuration
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Create Aptos client
const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");
const moduleAddress =
  "0xae367e82b01e6e693c4d74a017e4f830fe1f62e9d2e38da6c75f2cf7ec1bf82c";
const moduleName = "donation_contract_v2";

declare global {
  interface Window {
    aptos: any;
  }
}

type ShoppingCartProps = {
  isOpen: boolean;
};

async function getAccount(): Promise<string | null> {
  if (window.aptos) {
    try {
      const response = await window.aptos.connect();
      return response.address;
    } catch (error) {
      console.error("Error connecting to Petra wallet:", error);
      return null;
    }
  }
  return null;
}

async function checkBalance(account: string, amount: number): Promise<boolean> {
  const coinClient = new CoinClient(client);
  const balance = await coinClient.checkBalance(account);
  console.log("Account Balance: ", balance);
  console.log("Required Balance: ", amount);
  return BigInt(balance) >= BigInt(amount);
}

async function sendDonation(
  account: string,
  products: number[],
  amounts: number[],
  totalAmount: number
): Promise<void> {
  // Encode products as 0 or 1
  const normalizedProducts = products.slice(0, 4).map((p) => (p > 0 ? 1 : 0));

  // Calculate donation1 (product presence) for the first 4 products
  const donation1 = normalizedProducts.reduce(
    (acc: number, val: number, index: number) =>
      acc + val * Math.pow(10, 3 - index),
    0
  );

  // Calculate amount1 (product quantity) for the first 4 products
  const amount1 = amounts
    .slice(0, 4)
    .reduce((acc: number, val: number, index: number) => {
      // If the product exists (normalizedProducts[index] === 1), add the quantity
      return (
        acc + (normalizedProducts[index] ? val : 0) * Math.pow(10, 3 - index)
      );
    }, 0);

  console.log("Donation1:", donation1);
  console.log("Amount1:", amount1);

  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${moduleAddress}::${moduleName}::donate`,
    type_arguments: [],
    arguments: [moduleAddress, donation1, amount1],
  };

  try {
    const pendingTransaction = await window.aptos.signAndSubmitTransaction(
      payload
    );
    await client.waitForTransaction(pendingTransaction.hash);
    console.log("Transaction successful:", pendingTransaction.hash);
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      const account = await getAccount();
      setIsWalletConnected(!!account);
    };
    checkWalletConnection();
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => {
    const product = storeItems.find((p) => p.id === item.id);
    return sum + (product ? product.price : 0);
  }, 0);

  const totalAmountInOctas = totalAmount * 1; // Convert to Octas (8 decimal places)

  const checkout = async () => {
    const account = await getAccount();
    if (!account) {
      alert("Petra wallet not found or couldn't connect!");
      return;
    }

    // Prepare product IDs and quantities
    const productIds = new Array(4).fill(0);
    const productAmounts = new Array(4).fill(0);

    cartItems.forEach((item) => {
      const index = storeItems.findIndex((p) => p.id === item.id);
      if (index < 4) {
        productIds[index] = 1; // 1 if product exists, 0 if not
        productAmounts[index] = item.quantity; // Product quantity
      }
    });

    console.log("Products:", productIds.toString());
    console.log("Amounts:", productAmounts.toString());

    if (await checkBalance(account, totalAmountInOctas)) {
      try {
        await sendDonation(
          account,
          productIds,
          productAmounts,
          totalAmountInOctas
        );
        alert("Payment made! Cart information saved.");

        const newOrderRef = push(ref(database, "orders"));
        await set(newOrderRef, {
          email: email,
          phone: phone,
          products: productIds,
          amounts: productAmounts,
          totalAmount: totalAmountInOctas,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Transaction failed:", error);
        alert("Donation process failed. Please try again.");
      }
    } else {
      alert("Insufficient balance in your account!");
    }
  };

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total: {totalAmountInOctas} APT
          </div>
          {isWalletConnected ? (
            <Button className="w-100" onClick={checkout}>
              Complete Payment
            </Button>
          ) : (
            <Button className="w-100" onClick={() => window.aptos.connect()}>
              Connect to Petra Wallet
            </Button>
          )}
          <h5>
            If you want to receive information after the donation is completed,
            you can fill in the fields below.
          </h5>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
          </div>
          <hr />
          <hr />
          <h5>
            If you want to track the result of your donation on the blockchain,
            you can click on the link below.
          </h5>
          <Button
            className="w-100"
            onClick={() =>
              window.open(
                `https://explorer.aptoslabs.com/account/${moduleAddress}?network=testnet`,
                "_blank"
              )
            }
          >
            View
          </Button>
          <hr />
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
