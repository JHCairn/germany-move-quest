import "./LandingPage.css";
import heroImg from '../assets/symbol.svg';

function LandingPage({ onStart }) {
  return (
    <section id="center">

  <div className="landing-content">
      <div className="landing-logo">
        <div className="landing-logo-image">
        <img src={heroImg} alt="journey"></img> 
      </div></div>
   </div>

      
        <div className="landing-title">Germany Move Quest</div>
        <div className="landing-subtitle">Dein Weg nach Deutschland</div>

        <div className="landing-tagline">
          Your companion for moving to and living in Germany.
        </div>

        <button className="button-icon" onClick={onStart}>
          Begin Your Journey
        </button>
      
    </section>
  );
}

export default LandingPage;