import React from "react";
//whenver we create a component, create a corresponding css file to keep things clean
import "../styles/Player.css";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Footer from "../components/Footer";

function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player_body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>

      <Footer />
    </div>
  );
}

export default Player;
