import heroImg from '../assets/symbol.svg';

function LandingPage({ onStart }) {
  return (
    <section id="center">
      <div className="hero-icon">
        <img src={heroImg} alt="journey" height="100" width="100" />
      </div>

      <div>
        <h1>Germany Move Quest</h1>
        <h2>Dein Weg nach Deutschland</h2>

        <p>
          Your companion for moving to and living in Germany.
        </p>

        <button className="button-icon" onClick={onStart}>
          Begin Your Journey
        </button>
      </div>
    </section>
  );
}

export default LandingPage;