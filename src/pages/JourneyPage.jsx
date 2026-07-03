import "./JourneyPage.css";

function JourneyPage() {
  return (
    <section className="journey-page">
      <div className="journey-header">
        <p className="journey-eyebrow">Your Journey</p>
        <h1>Good morning, Julie.</h1>
        <p>Your current stage is Preparing to Move.</p>
      </div>

      <div className="journey-grid">
        <article className="dashboard-card">
          <p className="card-eyebrow">Current Stage</p>
          <h2>Preparing to Move</h2>
          <p>Planning, paperwork, purchases, and preparation before arrival.</p>
        </article>

        <article className="dashboard-card">
          <p className="card-eyebrow">Overall Progress</p>
          <h2>12%</h2>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>12 of 100 planned actions complete.</p>
        </article>

        <article className="dashboard-card wide-card">
          <p className="card-eyebrow">Recommended Next</p>
          <h2>Pick one action to keep momentum.</h2>

          <ul className="recommendation-list">
            <li>Review Anmeldung requirements</li>
            <li>Compare internet options</li>
            <li>Confirm apartment setup items</li>
          </ul>
        </article>

        <article className="dashboard-card wide-card">
          <p className="card-eyebrow">Quest Progress</p>
          <h2>Applicable quests</h2>

          <div className="quest-progress-list">
            <div className="quest-progress-row">
              <span>🏛 Administration</span>
              <span>3 / 8</span>
            </div>

            <div className="quest-progress-row">
              <span>🏡 Home</span>
              <span>5 / 18</span>
            </div>

            <div className="quest-progress-row">
              <span>💰 Finance</span>
              <span>2 / 7</span>
            </div>

            <div className="quest-progress-row">
              <span>🐱 Pets</span>
              <span>1 / 4</span>
            </div>

            <div className="quest-progress-row">
              <span>🧳 Transition</span>
              <span>0 / 6</span>
            </div>
          </div>
        </article>

        <article className="dashboard-card wide-card">
          <p className="card-eyebrow">Upcoming Milestones</p>
          <h2>Things to keep on the radar</h2>

          <ul className="milestone-list">
            <li>Apartment handover</li>
            <li>Move date</li>
            <li>Anmeldung window</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default JourneyPage;