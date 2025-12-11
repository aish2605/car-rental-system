import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>Welcome to Car Rental System</h1>
        <p>Rent your favorite car at the best price 🚗✨</p>

        <a href="/login" className="home-btn">Get Started</a>
      </div>
    </div>
  );
}
