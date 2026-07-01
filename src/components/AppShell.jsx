import "./AppShell.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import JourneyPage from "../pages/JourneyPage";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
}

function AppShell() {
  const greeting = getGreeting();

  return (
    <div className="app-shell">
      <Header />

      <div className="app-layout">
        <Sidebar />

        <main className="app-main">
          <JourneyPage greeting={greeting} />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
export default AppShell;