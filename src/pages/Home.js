import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
  
     

      
      <div className="hero">
        <div className="hero-text">
          <h1>
            
           “Drive Your Dreams, One Ride at a Time”
          </h1>

          <p>
            Discover a seamless car rental experience designed for your lifestyle.
Whether it’s a weekend getaway, a business trip, or a long adventure, we’ve got the perfect ride for you.
Fast booking, flexible plans, and a wide range of cars at your fingertips your journey starts the moment you hit the road.
          </p>

          <div className="buttons">
            <Link to="/login">
              <button className="btn-outline">Login</button>
            </Link>

            <Link to="/register">
              <button className="btn-fill">Register</button>
            </Link>
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default Home;
