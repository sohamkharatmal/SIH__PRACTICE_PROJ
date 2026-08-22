import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">🛡️</div>

          <div>
            <h2>SafeTrip</h2>
            <span>Smart Tourist Safety</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="login-button">
          Login
        </button>
      </nav>


      {/* Hero Section */}
      <main className="hero" id="home">

        <div className="hero-content">

          <div className="badge">
            ✦ AI Powered Tourist Protection
          </div>

          <h1>
            Travel Freely.
            <br />
            <span>Stay Protected.</span>
          </h1>

          <p>
            Smart technology for safer journeys.
            Live tracking, intelligent risk detection,
            digital identity and instant emergency response.
          </p>

          <div className="hero-buttons">

            <button className="primary-button">
              Get Started →
            </button>

            <button className="secondary-button">
              Explore Features
            </button>

          </div>

        </div>


        {/* Animated Visual */}
        <div className="hero-visual">

          <div className="glow glow-one"></div>
          <div className="glow glow-two"></div>

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="safety-card">

            <div className="card-top">
              <span>●</span>
              <span>LIVE SAFETY</span>
            </div>

            <div className="shield">
              🛡️
            </div>

            <h3>Tourist Protected</h3>

            <p>
              Your journey is being monitored
            </p>

            <div className="status">
              <span></span>
              System Active
            </div>

          </div>

          {/* Floating Icons */}
          <div className="floating-icon location">
            📍
          </div>

          <div className="floating-icon map">
            🗺️
          </div>

          <div className="floating-icon id-card">
            🪪
          </div>

        </div>

      </main>


      {/* SOS Section */}
      <section className="sos-section">

        <div className="sos-wrapper">

          <div className="sos-ring ring-one"></div>
          <div className="sos-ring ring-two"></div>
          <div className="sos-ring ring-three"></div>

          <button className="sos-button">

            <span className="sos-icon">
              🚨
            </span>

            <span className="sos-text">
              SOS
            </span>

            <span className="sos-subtext">
              Emergency
            </span>

          </button>

        </div>

        <p className="sos-description">
          One tap connects you to emergency assistance
        </p>

      </section>


      {/* Feature Preview */}
      <section className="features-preview" id="features">

        <div className="feature">
          <span>📍</span>
          <h3>Live Tracking</h3>
          <p>Monitor your journey in real time.</p>
        </div>

        <div className="feature">
          <span>🛡️</span>
          <h3>Risk Detection</h3>
          <p>Identify potentially unsafe situations.</p>
        </div>

        <div className="feature">
          <span>🪪</span>
          <h3>Digital Tourist ID</h3>
          <p>Secure and verified digital identity.</p>
        </div>

        <div className="feature">
          <span>🚨</span>
          <h3>Emergency SOS</h3>
          <p>Instant emergency response.</p>
        </div>

      </section>

    </div>
  );
}

export default App;