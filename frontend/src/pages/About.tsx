import React from "react";
import "./Aboutstyles.css";

export const About: React.FC = () => {
  return (
    <div className="content-container">
      <h1>End-to-End Physical Donation Project with Blockchain Technology</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          AyanEduTechs, founded in 2023, has developed this innovative donation
          system for the Aptos Code Collision Hackathon. This project leverages
          the advantages of blockchain technology's decentralized structure to
          create a network of vending machines across various locations. The aim
          is to enable donors to make physical donations directly through the
          internet without intermediaries.
        </p>
      </section>

      <section>
        <h2>Key Features of the Project</h2>

        <h3>Transparency and Trust in Donation Processes</h3>
        <p>
          One of the most important features of our project is ensuring
          transparency and trust for donors in the donation process. The lack of
          transparency in traditional donation systems often raises concerns
          about whether donations actually reach those in need. These concerns
          have led to decreased donation amounts and loss of trust.
        </p>
        <p>
          The system we've developed at AyanEduTechs provides a structure where
          donors can track their donations and confirm that they have actually
          reached those in need. This structure includes notifying donors via
          SMS or email after they've made a donation. This increases donor
          confidence and makes donation processes more transparent.
        </p>

        <h3>Decentralized Identity Management</h3>
        <p>
          The project focuses on decentralized digital identity management
          systems. This system enables transactions between donors and
          recipients while preserving privacy, allowing donors to make
          transactions without storing their identity information. A structure
          has been created where donors can make donations through decentralized
          identities, and these identities are managed in a decentralized
          manner.
        </p>
        <p>
          When donors want to make a donation, they log into the system using
          their decentralized identities and make donations through their chosen
          vending machine. After the donation reaches the recipient, the donor
          is notified of this status via SMS or email. This way, donors are
          assured that their donations have reached their intended destination.
        </p>

        <h3>Donation Through Physical Products</h3>
        <p>
          The AyanEduTechs project transforms the donation process from monetary
          to physical products. This way, donors directly donate products that
          can be used by those in need, and these products are delivered to
          recipients through vending machines. This system encourages the
          donation of tangible products instead of monetary donations, which can
          lead to a lack of trust in society.
        </p>
        <p>
          In the developed system, vending machines are devices widely used
          across various locations and serving different purposes. These vending
          machines have been integrated into our system and made available for
          use in the donation process. Donors can make donations by selecting
          the product they want through the vending machine.
        </p>

        <h3>Advanced Hardware and Software Integration</h3>
        <p>
          The project presents an innovative system where software and hardware
          components work in an integrated manner. The software part of the
          system is managed through blockchain-linked smart contracts, servers,
          and a website. The hardware part includes electronic components such
          as vending machines, RFID readers, and microcontrollers.
        </p>
        <p>
          Smart contracts are written in the Move language and run on the Aptos
          blockchain. These contracts ensure that donation transactions are
          carried out securely. A website has been developed for donors to make
          donations and for recipients to receive these donations. This website
          allows donors to select vending machines where they can make donations
          and purchase products in these vending machines through their virtual
          wallets.
        </p>

        <h3>
          Innovative Solution: Vending Machine Integration with MDB Protocol
        </h3>
        <p>
          The integration of vending machines into the system is achieved using
          the MDB (Multi-Drop Bus) protocol. The MDB protocol allows control of
          vending machines widely used in the market. A low-cost add-on
          developed is attached to the vending machine's connection cables by
          the vending machine owner or authorized person, adding it to our
          blockchain network as a DID (Decentralized Identity).
        </p>
        <p>
          Thanks to this add-on, vending machines are integrated into the
          blockchain network and become part of the donation system. Recipients
          can receive donated products from vending machines using RFID cards
          given to them by trusted institutions. This process is carried out by
          scanning the identification card at the credit card reading part of
          the vending machine.
        </p>
      </section>

      <section>
        <h2>Conclusion</h2>
        <p>
          The AyanEduTechs project is an innovative project that aims to
          increase transparency, trust, and efficiency in donation processes
          using the advantages offered by blockchain technology. Features such
          as decentralized identity management, donation through physical
          products, and integration of vending machines into the system are
          among the project's strengths.
        </p>
        <p>
          The project has great potential to improve donation systems not only
          in a single country but also internationally. The AyanEduTechs team
          will continue to work on further developing and expanding this
          project.
        </p>
      </section>
    </div>
  );
};
