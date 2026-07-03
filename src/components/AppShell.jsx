import "./AppShell.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import JourneyPage from "../pages/JourneyPage";

function AppShell() {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-layout">
        <Sidebar />

        <main className="app-main">
          <JourneyPage />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

export default AppShell;