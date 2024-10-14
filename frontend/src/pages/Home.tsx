import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import "./PopupStyles.css"; // We're importing the style file

const locations: { name: string; coords: LatLngExpression; items: string[] }[] =
  [
    {
      name: "New York",
      coords: [40.7128, -74.006],
      items: ["Chocolate", "Crackers", "Water Bottle", "Chips"],
    },
    {
      name: "London",
      coords: [51.5074, -0.1278],
      items: ["Energy Bar", "Gum", "Biscuits", "Soda"],
    },
    {
      name: "Tokyo",
      coords: [35.6762, 139.6503],
      items: ["Sandwich", "Fruit Juice", "Snack Nuts", "Candy"],
    },
    {
      name: "Sydney",
      coords: [-33.8688, 151.2093],
      items: ["Band-Aid", "Lozenge", "Battery", "Toothpaste"],
    },
    {
      name: "Rio de Janeiro",
      coords: [-22.9068, -43.1729],
      items: ["Water Bottle", "Chips", "Energy Bar", "Chocolate"],
    },
    {
      name: "Cape Town",
      coords: [-33.9249, 18.4241],
      items: ["Soda", "Gum", "Sandwich", "Fruit Juice"],
    },
    {
      name: "Moscow",
      coords: [55.7558, 37.6173],
      items: ["Crackers", "Biscuits", "Candy", "Tea"],
    },
    {
      name: "Dubai",
      coords: [25.2048, 55.2708],
      items: ["Chocolate", "Water Bottle", "Chips", "Energy Bar"],
    },
    {
      name: "Mumbai",
      coords: [19.076, 72.8777],
      items: ["Biscuits", "Gum", "Fruit Juice", "Snack Nuts"],
    },
    {
      name: "Bangkok",
      coords: [13.7563, 100.5018],
      items: ["Candy", "Crackers", "Soda", "Water Bottle"],
    },
    {
      name: "Istanbul",
      coords: [41.0082, 28.9784],
      items: ["Chocolate", "Energy Bar", "Sandwich", "Biscuits"],
    },
    {
      name: "Cairo",
      coords: [30.0444, 31.2357],
      items: ["Water Bottle", "Chips", "Snack Nuts", "Tea"],
    },
    {
      name: "Nairobi",
      coords: [-1.2921, 36.8219],
      items: ["Crackers", "Soda", "Sandwich", "Chocolate"],
    },
    {
      name: "Lagos",
      coords: [6.5244, 3.3792],
      items: ["Biscuits", "Candy", "Gum", "Fruit Juice"],
    },
    {
      name: "Mexico City",
      coords: [19.4326, -99.1332],
      items: ["Water Bottle", "Energy Bar", "Tea", "Chips"],
    },
    {
      name: "Lima",
      coords: [-12.0464, -77.0428],
      items: ["Chocolate", "Crackers", "Sandwich", "Fruit Juice"],
    },
    {
      name: "Buenos Aires",
      coords: [-34.6037, -58.3816],
      items: ["Soda", "Water Bottle", "Candy", "Snack Nuts"],
    },
    {
      name: "Vancouver",
      coords: [49.2827, -123.1207],
      items: ["Chips", "Gum", "Biscuits", "Tea"],
    },
    {
      name: "Stockholm",
      coords: [59.3293, 18.0686],
      items: ["Fruit Juice", "Crackers", "Sandwich", "Chocolate"],
    },
    {
      name: "Berlin",
      coords: [52.52, 13.405],
      items: ["Band-Aid", "Lozenge", "Battery", "Toothpaste"],
    },
    {
      name: "Taipei",
      coords: [25.033, 121.5654],
      items: ["Cold Compress", "Water Bottle", "Wet Wipes", "Bandage"],
    },
    {
      name: "Seoul",
      coords: [37.5665, 126.978],
      items: ["Band-Aid", "Lozenge", "Battery", "Toothpaste"],
    },
    {
      name: "Singapore",
      coords: [1.3521, 103.8198],
      items: ["Cold Compress", "Bandage", "Water Bottle", "Wet Wipes"],
    },
    {
      name: "Johannesburg",
      coords: [-26.2041, 28.0473],
      items: ["Diapers", "Water Bottle", "Cold Compress", "Bandage"],
    },
    {
      name: "Addis Ababa",
      coords: [9.0054, 38.7636],
      items: ["Wet Wipes", "Cold Compress", "Water Bottle", "Bandage"],
    },
  ];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirm = (location: string, items: string[]) => {
    const itemsQuery = encodeURIComponent(items.join(","));
    if (window.confirm(`Do you want to donate to ${location}?`)) {
      navigate(
        `/store?location=${encodeURIComponent(location)}&items=${itemsQuery}`
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Where Would You Like to Donate?</h1>
      <div style={{ height: "70vh", width: "80%", margin: "20px 0" }}>
        <MapContainer
          center={[39.331137, 34.516464]}
          zoom={3.2}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <React.Fragment>
            {locations.map((location, index) => (
              <Marker key={index} position={location.coords}>
                <Popup>
                  <div className="popup-content">
                    <h3>{location.name}</h3>
                    <ul>
                      {location.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <button
                      className="donate-button"
                      onClick={() =>
                        handleConfirm(location.name, location.items)
                      }
                    >
                      Donate
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </React.Fragment>
        </MapContainer>
      </div>
      <h5
        style={{ marginTop: "20px", textAlign: "center", marginBottom: "20px" }}
      >
        You can use the map above to determine the location where you want to
        donate.
      </h5>
      <h5>
        After selecting your desired location, click on the pin and press the
        "Donate" button.
      </h5>
    </div>
  );
};

export default Home;
