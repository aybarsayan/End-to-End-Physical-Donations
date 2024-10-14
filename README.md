# End-to-End Physical Donations with Blockchain and DID Technology

## Project Overview

This project, developed by **AyanEduTechs** for the **Aptos Code Collision Hackathon**, is a comprehensive system that leverages blockchain technology, Decentralized Identifiers (DIDs), and IoT devices to facilitate end-to-end physical donations. Our solution combines **ESP32** microcontrollers, a **React**-based frontend, **Vite** for optimized building, an **Express.js** server, and smart contracts written in **Move** for the Aptos blockchain.

## Project Description

The "End-to-End Physical Donations with Blockchain and DID Technology" project aims to revolutionize the donation process by creating a transparent, efficient, and secure system. It addresses the challenges of accountability and traceability in physical donations by utilizing blockchain technology and DIDs.

Key features include:

- Secure donor identification using DIDs
- Real-time tracking of donations from donor to recipient
- Smart contract-based donation management on the Aptos blockchain
- IoT-enabled donation receptacles for automated inventory management
- Transparent and immutable record-keeping of all donation transactions

## Technologies Used

- **ESP32**: Programmed to interact with various sensors and devices, managing the physical aspects of donation collection and distribution.
- **React**: Used for building a fast and dynamic web application interface.
- **Vite**: Employed as a build tool for rapid development and deployment of the React application.
- **Express.js**: Node.js framework used for server-side API and operations.
- **Move**: The programming language used for writing and managing smart contracts on the Aptos blockchain.
- **Aptos Blockchain**: The underlying blockchain infrastructure for secure and transparent transaction management.
- **Decentralized Identifiers (DIDs)**: Implemented for secure and verifiable digital identities of donors and recipients.
- **MDB Protocol**: Used for connecting to and transferring data with vending machines or similar donation receptacles.

## Project Structure

- `frontend/`: React and Vite-based user interface.
- `backend/`: Express.js-based server and API layer.
- `contracts/`: Smart contracts written in Move for the Aptos blockchain.
- `esp32/`: Software and device control codes for the ESP32 microcontroller.
- `did-implementation/`: Scripts and modules for DID creation and management.

## Installation

### Prerequisites

- Node.js (v14 or later)
- Yarn or NPM
- Aptos CLI
- Move Compiler
- ESP32 development environment (e.g., Arduino IDE with ESP32 support)
- Rust (for Aptos development)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AyanEduTechs/end-to-end-donations.git
   cd end-to-end-donations
   ```

2. **Install Dependencies:**

   - For Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For Backend:
     ```bash
     cd backend
     npm install
     ```

3. **Compile and Deploy Smart Contracts:**

   - Navigate to the `contracts/` directory
   - Use Aptos CLI to compile and deploy the Move modules:
     ```bash
     aptos move compile
     aptos move publish
     ```

4. **Set Up ESP32:**

   - Open the Arduino IDE
   - Load the code from the `esp32/` directory
   - Configure your ESP32 board and flash the code

5. **Configure DID Implementation:**

   - Follow the instructions in `did-implementation/README.md` to set up and configure DIDs

6. **Start the Application:**
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - Backend:
     ```bash
     cd backend
     npm run start
     ```

## Usage

1. **Donor Registration:**

   - Users register on the platform and are issued a DID
   - DIDs are stored on the Aptos blockchain for verification

2. **Making a Donation:**

   - Donors select items to donate through the web interface
   - A QR code is generated, linking to the donor's DID and donation details

3. **Physical Donation:**

   - Donors visit a smart donation receptacle (powered by ESP32)
   - The QR code is scanned, verifying the donor's identity and donation commitment
   - Items are deposited and automatically logged by the system

4. **Blockchain Recording:**

   - Each donation transaction is recorded on the Aptos blockchain
   - Smart contracts manage the allocation and tracking of donations

5. **Recipient Claiming:**

   - Approved recipients can claim donations through the platform
   - DIDs are used to verify recipient identity and eligibility

6. **Transparency and Tracking:**
   - All stakeholders can track the status and journey of donations in real-time
   - The blockchain provides an immutable record of all transactions

## Contributing

We welcome contributions to the "End-to-End Physical Donations with Blockchain and DID Technology" project! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to our coding standards and includes appropriate tests.

## Acknowledgments

- Aptos team for organizing the Code Collision Hackathon
- All contributors and team members of AyanEduTechs
- The open-source community for the various tools and libraries used in this project

## Contact

For any queries regarding this project, please contact:

- Project Lead: [Aybars Ayan](mailto:aybarsayan@gmail.com)

---

Built with ❤️ by AyanEduTechs for the Aptos Code Collision Hackathon
