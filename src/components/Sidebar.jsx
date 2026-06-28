import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button>🏠 Journey</button>
        <button>🧭 Quests</button>
        <button>📍 Places</button>
        <button>🛒 Shopping</button>
        <button>👤 Profile</button>
      </nav>
    </aside>
  );
}

export default Sidebar;