import "./AppShell.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

function AppShell() {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-layout">
        <Sidebar />

        <main className="app-main">
          <h1>Journey</h1>
          <p>Good morning, Julie.</p>
          <p>Current stage: Preparing to Move</p>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

export default AppShell;