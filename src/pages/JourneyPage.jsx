import "./JourneyPage.css";


function JourneyPage({ greeting }) {
  return (
    <section className="journey-page">
      <div className="journey-header">
        <p className="journey-eyebrow">Journey</p>
        <h1>{greeting}, Julie.</h1>
        <p>Your current stage is Preparing to Move.</p>
      </div>

      <div className="journey-grid">
        <article className="dashboard-card">
          <h2>Current Stage</h2>
          <p className="stage-label">Preparing to Move</p>
          <p>Planning, paperwork, purchases, and preparation before arrival.</p>
        </article>

        <article className="dashboard-card">
          <h2>Overall Progress</h2>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>12% complete</p>
        </article>

        <article className="dashboard-card wide-card">
          <h2>Active Quests</h2>

          <div className="quest-list">
            <div>🏡 Home</div>
            <div>🏛 Administration</div>
            <div>🐱 Pets</div>
            <div>🧭 Exploration</div>
          </div>
        </article>

        <article className="dashboard-card wide-card">
          <h2>Suggested Next</h2>
          <p>Pick one action to keep momentum.</p>

          <ul className="action-list">
            <li>Arrange internet options</li>
            <li>Confirm apartment purchases</li>
            <li>Review Anmeldung requirements</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default JourneyPage;