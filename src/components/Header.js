import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/Logo_White.png";
import searchIcon from "../Assets/search-icon@2x.svg";
import "./Header.css";

const Header = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  const goHome = () => {
    navigate("/", { replace: true });
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      navigate("/search", {
        state: searchRef.current.value,
        replace: true,
      });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Logo" onClick={goHome} />
        </div>
        <div className="header-search">
          {searchBoxOpen && (
            <div className="header-search-box">
              <input
                ref={searchRef}
                autoFocus={searchBoxOpen}
                type="text"
                placeholder="Search all news"
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          &nbsp;
          <i onClick={() => setSearchBoxOpen(!searchBoxOpen)}>
            <img src={searchIcon} alt="Search" />
          </i>
        </div>
      </div>
    </header>
  );
};

export default Header;
