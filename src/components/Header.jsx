
import heroImg from '../assets/symbol.svg';
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-brand">

        <div className="header-logo">
  <img src={heroImg} alt="Germany Move Quest logo" />
</div>
              <div className="header-text">
          <div className="header-app-title">Germany Move Quest</div>
          <div className="header-tagline">
            Your companion for moving to and living in Germany.
          </div>
        </div>
      </div>

      <div className="header-user">
        <span>👤</span>
        <span>Julie</span>
      </div>
    </header>
  );
}

export default Header;