import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { verificationFlow } from "./utils/verify"
import * as Kilt from '@kiltprotocol/sdk-js'
import { AptosClient, AptosAccount, CoinClient, Network,TxnBuilderTypes, BCS } from "aptos";

const moduleAddress = "0xae367e82b01e6e693c4d74a017e4f830fe1f62e9d2e38da6c75f2cf7ec1bf82c";
const moduleName = "donation_contract_v2";

// Aptos client'ı oluştur
const client = new AptosClient("https://testnet.aptoslabs.com");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'test';

var serviceAccount = require('./database.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cryptobox-56968-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
	  user: "yourazzi13@gmail.com",
	  pass: "",
	},
  });


app.use(bodyParser.json());

function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.params.apiAnahtari;
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Geçersiz API anahtarı' });
  }
  next();
}




app.get('/getBalance', async (req: Request, res: Response): Promise<void> => {
    try {
      const moduleAddress = "0xae367e82b01e6e693c4d74a017e4f830fe1f62e9d2e38da6c75f2cf7ec1bf82c";
      const moduleName = "donation_contract_v2";
  
      const breadCount = await client.view({
        function: `${moduleAddress}::${moduleName}::get_bread_count`,
        type_arguments: [],
        arguments: [moduleAddress]
      });
  
      const pastaCount = await client.view({
        function: `${moduleAddress}::${moduleName}::get_pasta_count`,
        type_arguments: [],
        arguments: [moduleAddress]
      });
  
      const diaperCount = await client.view({
        function: `${moduleAddress}::${moduleName}::get_diaper_count`,
        type_arguments: [],
        arguments: [moduleAddress]
      });
  
      const batteryCount = await client.view({
        function: `${moduleAddress}::${moduleName}::get_battery_count`,
        type_arguments: [],
        arguments: [moduleAddress]
      });
  
      const result = {
        breadCount: breadCount[0].toString(),
        pastaCount: pastaCount[0].toString(),
        diaperCount: diaperCount[0].toString(),
        batteryCount: batteryCount[0].toString(),
      };
  
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'Hata', message: (error as Error).message });
    }
  });
  

app.post('/sendTransaction', async (req: Request, res: Response): Promise<void> => {
    const { from, products, amounts, privateKey } = req.body;
  
    if (!from || !products || !amounts || !privateKey) {
      res.status(400).send({ status: 'Hata', message: 'Eksik veya yanlış parametreler' });
      return;
    }
  
    if (!Array.isArray(products) || !Array.isArray(amounts) || products.length !== amounts.length) {
      res.status(400).send({ status: 'Hata', message: 'Ürünler ve miktarlar array formatında olmalı ve aynı uzunlukta olmalı' });
      return;
    }

    let privateKey1 = ""
  
    try {
      // Aptos hesabını oluştur
      const account = new AptosAccount(Buffer.from(privateKey1.replace(/^0x/, ''), 'hex'));
  
      // products ve amounts'u tek bir integer'a dönüştür
      const withdrawal1 = products.slice(0, 4).reduce((acc, val, index) => {
        return acc + (val > 0 ? 1 : 0) * Math.pow(10, 3 - index);
      }, 0);
      
      const withdrawal2 = amounts.slice(0, 4).reduce((acc, val, index) => {
        return acc + (val * Math.pow(10, 3 - index));
      }, 0);

      console.log("Withdrawal1:", withdrawal1);
      console.log("Withdrawal2:", withdrawal2);
        
      // İşlemi oluştur
      const payload = {
        type: "entry_function_payload",
        function: `${moduleAddress}::${moduleName}::withdraw_donation`,
        type_arguments: [],
        arguments: [moduleAddress, withdrawal1, withdrawal2]
      };
  
      // İşlemi gönder
      const txnRequest = await client.generateTransaction(account.address(), payload);
      const signedTxn = await client.signTransaction(account, txnRequest);
      const transactionRes = await client.submitTransaction(signedTxn);
      await client.waitForTransaction(transactionRes.hash);
  
      const urunler = ["Pil", "Ekmek", "Bebek Bezi", "Makarna"];
  
      const snapshot = await db.ref('orders').orderByKey().limitToLast(1).once('value');
      const data = snapshot.val();
      const latestOrder = Object.values(data)[0] as { email: string; timestamp: number };
      const email = latestOrder.email;
      const time = new Date(latestOrder.timestamp);
  
      // Dizinin içeriğini kontrol ederek güvenli dizin kullanımı
      const productNames = products.map((productIndex: number, index: number) => 
        productIndex > 0 ? `${urunler[index] || "Bilinmeyen Ürün"} (${amounts[index]})` : null
      ).filter(Boolean).join(", ");
  
      const mailOptions = {
        from: '"AyanEduTechs" <yourazzi13@gmail.com>',
        to: email,
        subject: "Withdrawal Successful",
        text: `Merhaba! ${time.toString()} tarihinde yaptığınız ${productNames} çekimi ${transactionRes.hash} hash değeri ile kontrol edebileceğiniz üzere başarılı bir şekilde tamamlanmıştır.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2 style="color: #4CAF50;">Merhaba!</h2>
                <p>${time.toString()} tarihinde yaptığınız <strong>${productNames}</strong> çekimi, https://explorer.aptoslabs.com/txn/${transactionRes.hash}?network=testnet hash değeri ile kontrol edebileceğiniz üzere başarılı bir şekilde tamamlanmıştır.</p>
                <br>
                <p>En iyi dileklerimizle,</p>
                <p><strong>AyanEduTechs</strong></p>
            </div>
            `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.send({ status: 'Başarılı', transactionHash: transactionRes.hash });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'Hata', message: (error as Error).message });
    }
});

// GET endpoint for /getcredential/:apiAnahtari
app.get('/getcredential/:apiAnahtari', apiKeyMiddleware, async (req: Request, res: Response) => {
    try {
        const usersRef = db.ref('users');
        const undefinedRef = db.ref('undefined');
        
        // Fetch the values from the database
        const usersSnapshot = await usersRef.once('value');
        const undefinedSnapshot = await undefinedRef.once('value');
        
        const usersValue = usersSnapshot.val();
        const undefinedValue = undefinedSnapshot.val();
        
        // Parse the 'undefined' field in 'users' if it's a string
        if (usersValue && typeof usersValue.undefined === 'string') {
            try {
                usersValue.undefined = JSON.parse(usersValue.undefined);
            } catch (e) {
                console.error('Failed to parse undefined field in users:', (e as Error).message);
            }
        }

        // Extract relevant data
        const email = usersValue.undefined.claim.contents.Email;
        const claimHashes = usersValue.undefined.claimHashes;
        const claimNonceMap = JSON.stringify(usersValue.undefined.claimNonceMap);
        const rootHash = usersValue.undefined.rootHash;
        const signature = usersValue.undefined.claimerSignature.signature;
        const challenge = usersValue.undefined.claimerSignature.challenge;

        const data = [
            email,
            ...claimHashes,
            claimNonceMap,
            rootHash,
            signature,
            challenge
        ];
        console.log(data);
        
        // Function to convert string to hex with separator
        function stringToHexWithSeparator(str: string): string {
            return str.split('')
                .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
                .join('') + '2c'; // '2c' is the hex code for ',' (comma)
        }

        // Convert the data array to hexadecimal with separators
        const hexData = data.map(item => stringToHexWithSeparator(item)).join('');

        res.status(200).json({ hexData });
    } catch (error) {
        res.status(500).json({ message: 'Veri çekilirken bir hata oluştu', error: (error as Error).message });
    }
});

app.post('/validate/:apiAnahtari', apiKeyMiddleware, async (req: Request, res: Response) => {
  try {
    console.log("sorgu geldi");
    
    const hexInput = req.body.hexData;
    await Kilt.connect(process.env.WSS_ADDRESS as string)

    console.log('Received hex input:', hexInput);

    // Function to convert hex string to normal string
    function hexToString(hex: string): string {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }

    // Convert the hex input to a string
    const convertedString = hexToString(hexInput.replace(/\s+/g, ''));

    console.log('Converted string:', convertedString);

    // Assuming the format as comma-separated values
    const valuesArray = convertedString.split(',');

    console.log('Parsed values array:', valuesArray);

    let claim = `
    {
    "claim": {
      "cTypeHash": "0x3291bb126e33b4862d421bfaa1d2f272e6cdfc4f96658988fbcffea8914bd9ac",
      "contents": {
        "Email": "${valuesArray[0]}"
      },
      "owner": "did:kilt:4staaktXUAuBCujvdB4JRjiQo85e5KJCYZZks8Y8VRwFNT5w"
    },
    "claimHashes": [
      "${valuesArray[1]}",
      "${valuesArray[2]}"
    ],
    "claimNonceMap": {
      ${valuesArray[3].slice(1)},
      ${valuesArray[4].slice(0, -1)}
    },
    "delegationId": null,
    "legitimations": [],
    "rootHash": "${valuesArray[5]}",
    "claimerSignature": {
      "signature": "${valuesArray[6]}",
      "keyUri": "did:kilt:4staaktXUAuBCujvdB4JRjiQo85e5KJCYZZks8Y8VRwFNT5w#0xaef05fbb3b33c3da49b4c48f5634a6ceac579278998b937be80af5d5cc07131d",
      "challenge": "${valuesArray[7]}"
    }
  }
    `

    let JsonClaim = JSON.parse(claim);

    console.log("Json Claim: ", claim)
    
    // Burada asenkron işlemler yapılabilir, örneğin bir API çağrısı veya veritabanı işlemi
    // await someAsyncFunction();
    const success = await verificationFlow(JsonClaim)
    console.log("Success: "+ success);
    
    // Send a temporary boolean response (true for now)
    if (success){
      res.status(200).json({ valid: true });
    }else{
      res.status(500).json({ message: 'Verification Error' });
    }
  } catch (error) {
    console.error('Error during validation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});