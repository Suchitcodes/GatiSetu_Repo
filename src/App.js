import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [role, setRole] = useState(null);

  if (role === "farmer") {
    return <FarmerDashboard onBack={() => setRole(null)} />;
  }

  if (role === "driver") {
    return <DriverDashboard onBack={() => setRole(null)} />;
  }

  return (
    <div className="app">
      <div className="welcome">
        <div className="logo">GatiSetu</div>

        <div className="welcome-content">
          <p className="eyebrow">RURAL LOGISTICS NETWORK</p>

          <h1>
            Move what matters.
            <br />
            <span>Move smarter.</span>
          </h1>

          <p className="description">
            Connect farmers, drivers, and essential goods through intelligent
            rural logistics.
          </p>

          <h2>How are you using GatiSetu?</h2>

          <div className="role-container">
            <button
              className="role-card"
              onClick={() => setRole("farmer")}
            >
              <div className="role-icon">🌾</div>

              <div>
                <strong>I'm a Farmer</strong>
                <p>Send my produce or goods</p>
              </div>

              <span>→</span>
            </button>

            <button
              className="role-card"
              onClick={() => setRole("driver")}
            >
              <div className="role-icon">🚛</div>

              <div>
                <strong>I'm a Driver</strong>
                <p>Find deliveries along my route</p>
              </div>

              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function NetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [justSynced, setJustSynced] = useState(false);

  useEffect(() => {
    function goOnline() {
      setOnline(true);
      setJustSynced(true);

      setTimeout(() => {
        setJustSynced(false);
      }, 3000);
    }

    function goOffline() {
      setOnline(false);
      setJustSynced(false);
    }

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!online) {
    return (
      <div className="sync-status offline-sync">
        <strong>● Offline</strong>
        <span>Saved locally — waiting to sync</span>
      </div>
    );
  }

  if (justSynced) {
    return (
      <div className="sync-status synced">
        <strong>✓ Synced</strong>
        <span>Local changes uploaded</span>
      </div>
    );
  }

  return (
    <div className="sync-status online-sync">
      <strong>● Online</strong>
      <span>Everything is synced</span>
    </div>
  );
}
function FarmerDashboard({ onBack }) {
  const [screen, setScreen] = useState("dashboard");

  if (screen === "create") {
    return <CreateDelivery onBack={() => setScreen("dashboard")} />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />

        <button className="back-button" onClick={onBack}>
          ← Change role
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-intro">
          <p className="eyebrow">FARMER DASHBOARD</p>

          <h1>
            Good morning,
            <br />
            <span>Farmer.</span>
          </h1>

          <p>What would you like to move today?</p>
        </div>

        <button
          className="create-delivery"
          onClick={() => setScreen("create")}
        >
          <div className="plus">+</div>

          <div>
            <strong>Create a delivery</strong>
            <p>Transport your produce, medicines or goods</p>
          </div>

          <span>→</span>
        </button>

        <section className="delivery-section">
          <div className="section-title">
            <h2>Active deliveries</h2>
            <span>0 deliveries</span>
          </div>

          <div className="empty-state">
            <div className="empty-icon">📦</div>

            <h3>No active deliveries</h3>

            <p>Your current deliveries will appear here.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function CreateDelivery({ onBack }) {
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    pickup: "",
    destination: "",
    urgency: "normal",
  });

  const [matched, setMatched] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

function handleSubmit(event) {
  event.preventDefault();

  const delivery = {
    ...formData,
    id: "GS1024",
    status: "Waiting for driver",
    driver: "Ramesh Kumar",
    price: 1250,
    distance: 42,
  };

  localStorage.setItem(
    "gatisetuDelivery",
    JSON.stringify(delivery)
  );

  setMatched(true);
}

  if (matched) {
    return (
      <DriverMatch
        formData={formData}
        onBack={() => setMatched(false)}
      />
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />
        <button className="back-button" onClick={onBack}>
          ← Back to dashboard
        </button>
      </header>

      <main className="form-page">
        <div className="form-heading">
          <p className="eyebrow">NEW DELIVERY</p>

          <h1>
            What are you
            <br />
            <span>sending?</span>
          </h1>

          <p>
            Enter the basic details and GatiSetu will find a suitable driver.
          </p>
        </div>

        <form className="delivery-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item type</label>

            <select
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
            >
              <option value="">Select an item</option>
              <option value="Tomatoes">Tomatoes</option>
              <option value="Potatoes">Potatoes</option>
              <option value="Rice">Rice</option>
              <option value="Medicines">Medicines</option>
              <option value="Essential Goods">Essential Goods</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>

            <input
              type="text"
              name="quantity"
              placeholder="Example: 500 kg"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Pickup location</label>

            <input
              type="text"
              name="pickup"
              placeholder="Example: Khordha Village"
              value={formData.pickup}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Destination</label>

            <input
              type="text"
              name="destination"
              placeholder="Example: Bhubaneswar Market"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Urgency</label>

            <div className="urgency-options">
              <label className="radio-card">
                <input
                  type="radio"
                  name="urgency"
                  value="normal"
                  checked={formData.urgency === "normal"}
                  onChange={handleChange}
                />

                <div>
                  <strong>Normal</strong>
                  <p>Standard delivery priority</p>
                </div>
              </label>

              <label className="radio-card">
                <input
                  type="radio"
                  name="urgency"
                  value="urgent"
                  checked={formData.urgency === "urgent"}
                  onChange={handleChange}
                />

                <div>
                  <strong>Urgent</strong>
                  <p>Prioritize faster transport</p>
                </div>
              </label>
            </div>
          </div>

          <button className="primary-button" type="submit">
            Find a Driver →
          </button>
        </form>
      </main>
    </div>
  );
}
function calculateMatchScore(formData) {
  let routeScore = 30;
  let capacityScore = 25;
  let distanceScore = 20;
  let urgencyScore = 10;

  const quantityNumber = parseInt(formData.quantity);

  if (!isNaN(quantityNumber)) {
    if (quantityNumber <= 800) {
      capacityScore = 25;
    } else {
      capacityScore = 5;
    }
  }

  if (formData.urgency === "urgent") {
    urgencyScore = 15;
  }

  const pickup = formData.pickup.toLowerCase();
  const destination = formData.destination.toLowerCase();

  if (
    pickup.includes("khordha") &&
    destination.includes("bhubaneswar")
  ) {
    routeScore = 40;
  }

  if (
    pickup.includes("balugaon") ||
    destination.includes("cuttack")
  ) {
    distanceScore = 15;
  }

  const total =
    routeScore +
    capacityScore +
    distanceScore +
    urgencyScore;

  return {
    total,
    routeScore,
    capacityScore,
    distanceScore,
    urgencyScore,
  };
}
function DriverMatch({ formData, onBack }) {

  const [payment, setPayment] = useState(false);

  const match = calculateMatchScore(formData);
  if (payment) {
    return <Payment formData={formData} />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />
        <button className="back-button" onClick={onBack}>
          ← Edit delivery
        </button>
      </header>

      <main className="match-page">
        <div className="match-heading">
          <p className="eyebrow">SMART MATCHING</p>

          <h1>
            We found your
            <br />
            <span>best driver.</span>
          </h1>

          <p>
            GatiSetu compared available routes, capacity, distance
            and delivery priority.
          </p>
        </div>

        <div className="match-card">

          <div className="match-top">
            <div>
              <p className="match-label">BEST MATCH</p>
              <h2>Ramesh Kumar</h2>
              <p className="driver-subtext">
                🚛 Tata Ace • OD 02 AB 4581
              </p>
            </div>

            <div className="match-score">
              <strong>{match.total}%</strong>
              <span>Match</span>
            </div>
          </div>

          <div className="match-route">
            <div>
              <span className="route-dot"></span>
              <p>Pickup</p>
              <strong>{formData.pickup}</strong>
            </div>

            <div className="route-line"></div>

            <div>
              <span className="route-dot destination-dot"></span>
              <p>Destination</p>
              <strong>{formData.destination}</strong>
            </div>
          </div>

          <div className="match-stats">
            <div>
              <span>Distance</span>
              <strong>42 km</strong>
            </div>

            <div>
              <span>Available capacity</span>
              <strong>800 kg</strong>
            </div>

            <div>
              <span>Estimated time</span>
              <strong>1 hr 20 min</strong>
            </div>

            <div>
              <span>Driver rating</span>
              <strong>★ 4.8</strong>
            </div>
          </div>

          <div className="match-reason">
            <p>WHY THIS DRIVER?</p>

            <div className="reason-row">
              <span>Route compatibility</span>
              <strong>{match.routeScore} / 40</strong>
            </div>

            <div className="reason-row">
              <span>Vehicle capacity</span>
              <strong>{match.capacityScore} / 25</strong>
            </div>

            <div className="reason-row">
              <span>Distance efficiency</span>
              <strong>{match.distanceScore} / 20</strong>
            </div>

            <div className="reason-row">
              <span>Delivery priority</span>
              <strong>{match.distanceScore} / 20</strong>
            </div>
          </div>

          <div className="price-box">
            <div>
              <span>Estimated delivery cost</span>
              <strong>₹1,250</strong>
            </div>

            <p>
              Includes distance, vehicle capacity and item handling.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setPayment(true)}
          >
            Accept Driver & Continue →
          </button>

        </div>
      </main>
    </div>
  );
}
function Payment({ formData }) {
  const [paid, setPaid] = useState(false);

  if (paid) {
    return <Tracking formData={formData} />;
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />

        <div className="secure-label">
          🔒 Secure Payment
        </div>
      </header>

      <main className="payment-page">

        <div className="payment-heading">
          <p className="eyebrow">PAYMENT</p>

          <h1>
            Confirm your
            <br />
            <span>delivery.</span>
          </h1>

          <p>
            Your payment is held securely until the delivery
            is completed.
          </p>
        </div>

        <div className="payment-card">

          <h2>Delivery summary</h2>

          <div className="summary-row">
            <span>Item</span>
            <strong>{formData.item}</strong>
          </div>

          <div className="summary-row">
            <span>Quantity</span>
            <strong>{formData.quantity}</strong>
          </div>

          <div className="summary-row">
            <span>Driver</span>
            <strong>Ramesh Kumar</strong>
          </div>

          <div className="summary-row">
            <span>Distance</span>
            <strong>42 km</strong>
          </div>

          <div className="summary-row">
            <span>Pickup</span>
            <strong>{formData.pickup}</strong>
          </div>

          <div className="summary-row">
            <span>Destination</span>
            <strong>{formData.destination}</strong>
          </div>

          <div className="payment-total">
            <span>Total</span>
            <strong>₹1,250</strong>
          </div>

          <button
            className="primary-button"
            onClick={() => setPaid(true)}
          >
            Pay ₹1,250 →
          </button>

          <p className="payment-note">
            🔒 Demo payment — no real money will be charged.
          </p>

        </div>

      </main>
    </div>
  );
}
function Tracking({ formData }) {
  const [status, setStatus] = useState(0);

  const statuses = [
    "Driver assigned",
    "Driver heading to pickup",
    "Goods picked up",
    "On the way",
    "Delivered",
  ];

  function nextStatus() {
    if (status < statuses.length - 1) {
      setStatus(status + 1);
    }
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />
        <div className="live-status">
          ● LIVE DELIVERY
        </div>
      </header>

      <main className="tracking-page">

        <div className="tracking-heading">
          <p className="eyebrow">DELIVERY #GS1024</p>

          <h1>
            Your goods are
            <br />
            <span>
              {status === 4 ? "delivered." : "on the move."}
            </span>
          </h1>

          <p>
            {formData.item} • {formData.quantity}
          </p>
        </div>

        <div className="tracking-card">

          <div className="driver-mini">
            <div className="driver-avatar">🚛</div>

            <div>
              <strong>Ramesh Kumar</strong>
              <p>Tata Ace • OD 02 AB 4581</p>
            </div>
          </div>

          <div className="tracking-route">

            <div>
              <span>FROM</span>
              <strong>{formData.pickup}</strong>
            </div>

            <div>→</div>

            <div>
              <span>TO</span>
              <strong>{formData.destination}</strong>
            </div>

          </div>

          <div className="status-list">

            {statuses.map((item, index) => (
              <div
                className={`status-item ${
                  index <= status ? "completed" : ""
                }`}
                key={item}
              >
                <div className="status-circle">
                  {index < status ? "✓" : index === status ? "●" : ""}
                </div>

                <span>{item}</span>
              </div>
            ))}

          </div>

          {status < 4 ? (
            <button
              className="primary-button"
              onClick={nextStatus}
            >
              Demo: Update Delivery Status →
            </button>
          ) : (
            <div className="delivery-complete">
              ✓ Delivery completed successfully
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

function DriverDashboard({ onBack }) {
  const [screen, setScreen] = useState("dashboard");

  const savedDelivery = localStorage.getItem("gatisetuDelivery");

  const delivery = savedDelivery
    ? JSON.parse(savedDelivery)
    : null;
    const driverMatch = delivery
  ? calculateMatchScore(delivery)
  : null;

  const savedAvailability = localStorage.getItem("driverAvailability");

  const initialAvailability = savedAvailability
    ? JSON.parse(savedAvailability)
    : {
        mode: "route",
        start: "Khordha",
        destination: "Bhubaneswar",
        radius: 20,
        capacity: 800,
      };

  const [availability, setAvailability] =
    useState(initialAvailability);

  const [saved, setSaved] = useState(false);

  function handleAvailabilityChange(event) {
    const { name, value } = event.target;

    setAvailability({
      ...availability,
      [name]: value,
    });

    setSaved(false);
  }

  function saveAvailability() {
    localStorage.setItem(
      "driverAvailability",
      JSON.stringify(availability)
    );

    setSaved(true);
  }

  if (screen === "request" && delivery) {
    return (
      <DriverRequest
        delivery={delivery}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />

        <button className="back-button" onClick={onBack}>
          ← Change role
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-intro">
          <p className="eyebrow">DRIVER DASHBOARD</p>

          <h1>
            Good morning,
            <br />
            <span>Driver.</span>
          </h1>

          <p>
            Tell GatiSetu where you're available today.
          </p>
        </div>

        <div className="driver-grid">

          {/* AVAILABILITY */}

          <div className="driver-panel">
            <p className="panel-label">
              TODAY'S AVAILABILITY
            </p>

            <h2>How are you driving today?</h2>

            <div className="availability-tabs">

              <button
                className={
                  availability.mode === "route"
                    ? "availability-tab active"
                    : "availability-tab"
                }
                onClick={() => {
                  setAvailability({
                    ...availability,
                    mode: "route",
                  });

                  setSaved(false);
                }}
              >
                🛣 Travelling a route
              </button>

              <button
                className={
                  availability.mode === "radius"
                    ? "availability-tab active"
                    : "availability-tab"
                }
                onClick={() => {
                  setAvailability({
                    ...availability,
                    mode: "radius",
                  });

                  setSaved(false);
                }}
              >
                📍 Staying nearby
              </button>

            </div>

            {availability.mode === "route" ? (
              <div className="availability-content">

                <div className="availability-field">
                  <label>Starting location</label>

                  <input
                    name="start"
                    value={availability.start}
                    onChange={handleAvailabilityChange}
                    placeholder="Example: Khordha"
                  />
                </div>

                <div className="route-arrow">
                  ↓
                </div>

                <div className="availability-field">
                  <label>Destination</label>

                  <input
                    name="destination"
                    value={availability.destination}
                    onChange={handleAvailabilityChange}
                    placeholder="Example: Bhubaneswar"
                  />
                </div>

                <div className="availability-summary">
                  <span>AVAILABLE ROUTE</span>

                  <strong>
                    {availability.start || "Starting point"}
                    {" → "}
                    {availability.destination || "Destination"}
                  </strong>
                </div>

              </div>
            ) : (
              <div className="availability-content">

                <div className="radius-visual">
                  <div className="radius-circle">
                    <div className="radius-center">
                      🚛
                    </div>
                  </div>
                </div>

                <div className="availability-field">
                  <label>
                    Delivery radius
                  </label>

                  <input
                    type="range"
                    name="radius"
                    min="5"
                    max="100"
                    step="5"
                    value={availability.radius}
                    onChange={handleAvailabilityChange}
                  />

                  <div className="radius-labels">
                    <span>5 km</span>

                    <strong>
                      {availability.radius} km
                    </strong>

                    <span>100 km</span>
                  </div>
                </div>

                <div className="availability-summary">
                  <span>AVAILABLE WITHIN</span>

                  <strong>
                    {availability.radius} km of my location
                  </strong>
                </div>

              </div>
            )}

            <div className="capacity-box">
              <div>
                <span>Available capacity</span>

                <strong>
                  {availability.capacity} kg
                </strong>
              </div>

              <div>
                <span>Vehicle</span>

                <strong>Tata Ace</strong>
              </div>
            </div>

            <button
              className="primary-button"
              onClick={saveAvailability}
            >
              Save Availability
            </button>

            {saved && (
              <div className="saved-message">
                ✓ Availability updated
              </div>
            )}
          </div>


          {/* DELIVERY REQUEST */}

          <div className="driver-panel">

            {delivery ? (
              <>
                <div className="section-title">
                  <div>
                    <p className="panel-label">
                      MATCHED REQUEST
                    </p>

                    <h2>New delivery</h2>
                  </div>

                  <span className="match-badge">
                    {driverMatch.total}% match
                  </span>
                </div>

                <div className="request-preview">

                  <div className="request-icon">
                    🌾
                  </div>

                  <div>
                    <strong>
                      {delivery.quantity}{" "}
                      {delivery.item}
                    </strong>

                    <p>
                      {delivery.pickup}
                      {" → "}
                      {delivery.destination}
                    </p>
                  </div>

                </div>

                <div className="request-details">

                  <div>
                    <span>Distance</span>
                    <strong>
                      {delivery.distance} km
                    </strong>
                  </div>

                  <div>
                    <span>
                      Estimated earning
                    </span>

                    <strong>
                      ₹{delivery.price}
                    </strong>
                  </div>

                </div>

                <button
                  className="primary-button"
                  onClick={() =>
                    setScreen("request")
                  }
                >
                  View Request →
                </button>
              </>
            ) : (
              <div className="empty-state">

                <div className="empty-icon">
                  🚛
                </div>

                <h3>No delivery requests</h3>

                <p>
                  Matching requests will appear here.
                </p>

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}
function DriverRequest({ delivery, onBack }) {
  const match = calculateMatchScore(delivery);
  const [accepted, setAccepted] = useState(false);

  if (accepted) {
    return <DriverDelivery />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />
        <button className="back-button" onClick={onBack}>
          ← Back to dashboard
        </button>
      </header>

      <main className="match-page">
        <div className="match-heading">
          <p className="eyebrow">DELIVERY REQUEST</p>

          <h1>
            A delivery fits
            <br />
            <span>your route.</span>
          </h1>

          <p>
            This request has been matched based on your route,
            available capacity and distance.
          </p>
        </div>

        <div className="match-card">
          <div className="match-top">
            <div>
              <p className="match-label">FARMER</p>
              <h2>Suresh Kumar</h2>
              <p className="driver-subtext">
                🌾 Khordha, Odisha
              </p>
            </div>

            <div className="match-score">
              <strong>{match.total}%</strong>
              <span>Match</span>
            </div>
          </div>

          <div className="request-product">
            <span>ITEM</span>
            <strong>
  {delivery.quantity} {delivery.item}
</strong>
          </div>

          <div className="match-route">
            <div>
              <span className="route-dot"></span>
              <p>Pickup</p>
              <strong>{delivery.pickup}</strong>
            </div>

            <div className="route-line"></div>

            <div>
              <span className="route-dot destination-dot"></span>
              <p>Destination</p>
             <strong>{delivery.destination}</strong>
            </div>
          </div>

          <div className="match-stats">
            <div>
              <span>Distance</span>
              <strong>{delivery.distance} km</strong>
            </div>

            <div>
              <span>Load</span>
              <strong>500 kg</strong>
            </div>

            <div>
              <span>Available capacity</span>
              <strong>800 kg</strong>
            </div>

            <div>
              <span>Estimated earning</span>
              <strong>₹{delivery.price}</strong>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() => {
  const updatedDelivery = {
    ...delivery,
    status: "Driver assigned",
  };

  localStorage.setItem(
    "gatisetuDelivery",
    JSON.stringify(updatedDelivery)
  );

  setAccepted(true);
}}
          >
            Accept Delivery →
          </button>

          <button className="reject-button" onClick={onBack}>
            Decline Request
          </button>
        </div>
      </main>
    </div>
  );
}
function DriverDelivery() {
  const [status, setStatus] = useState(0);

  const statuses = [
    "Heading to pickup",
    "Goods picked up",
    "On the way",
    "Delivered",
  ];

  function nextStatus() {
    if (status < statuses.length - 1) {
      setStatus(status + 1);
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
  <div className="logo">GatiSetu</div>

  <NetworkStatus />
        <div className="live-status">
          ● ACTIVE DELIVERY
        </div>
      </header>

      <main className="tracking-page">
        <div className="tracking-heading">
          <p className="eyebrow">DELIVERY #GS1024</p>

          <h1>
            Delivery
            <br />
            <span>in progress.</span>
          </h1>

          <p>500 kg Tomatoes</p>
        </div>

        <div className="tracking-card">
          <div className="driver-mini">
            <div className="driver-avatar">🌾</div>

            <div>
              <strong>Suresh Kumar</strong>
              <p>Farmer • Khordha</p>
            </div>
          </div>

          <div className="tracking-route">
            <div>
              <span>FROM</span>
              <strong>Khordha Village</strong>
            </div>

            <div>→</div>

            <div>
              <span>TO</span>
              <strong>Bhubaneswar Market</strong>
            </div>
          </div>

          <div className="current-status-box">
            <span>CURRENT STATUS</span>
            <strong>{statuses[status]}</strong>
          </div>

          <div className="status-list">
            {statuses.map((item, index) => (
              <div
                className={`status-item ${
                  index <= status ? "completed" : ""
                }`}
                key={item}
              >
                <div className="status-circle">
                  {index < status ? "✓" : index === status ? "●" : ""}
                </div>

                <span>{item}</span>
              </div>
            ))}
          </div>

          {status < statuses.length - 1 ? (
            <button
              className="primary-button"
              onClick={nextStatus}
            >
              Update to: {statuses[status + 1]} →
            </button>
          ) : (
            <div className="delivery-complete">
              ✓ Delivery completed — payment released
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;