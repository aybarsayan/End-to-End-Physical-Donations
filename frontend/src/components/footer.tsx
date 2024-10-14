import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export function Footer() {
  return (
    <footer
      className="py-4 mt-auto"
      style={{ backgroundColor: "#43787a", color: "white", paddingTop: "20px" }}
    >
      <Container>
        <Row className="text-center">
          <Col md={4}>
            <h5>AyanEduTechs</h5>
            <p>
              {" "}
              <b>
                End-to-End Physical Donations with Blockchain and DID Technology
              </b>
            </p>
            <p>Aptos Code Collision Hackathon</p>
            <div className="d-flex justify-content-center mt-3">
              <a
                href="https://github.com/aybarsayan"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <img
                  src="../../imgs/github.svg"
                  alt="GitHub"
                  style={{ width: "24px", height: "24px" }}
                />
              </a>
              <a
                href="https://www.instagram.com/ayanedutechs/"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <img
                  src="../../imgs/Instagram_logo.svg"
                  alt="Instagram"
                  style={{ width: "24px", height: "24px" }}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/ayanedutechs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="../../imgs/LinkedIn_icon.svg"
                  alt="LinkedIn"
                  style={{ width: "24px", height: "24px" }}
                />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5>Info</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Main Page
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  Who Are We?
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Team</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.linkedin.com/in/aybarsayan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Aybars Göktuğ AYAN
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/bugra-ayan-5b3aa4241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Buğra AYAN
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr style={{ backgroundColor: "white" }} />
        <Row className="mt-3">
          <Col className="text-center">
            <small>2024 AyanEduTechs</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
