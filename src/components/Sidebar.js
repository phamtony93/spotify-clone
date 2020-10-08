import React from "react";
import "../styles/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateProviderValue } from "../StateProvider";

function Sidebar() {
  let [{ playlists }, dispatch] = useStateProviderValue();

  console.log("playlists >>>>>>", playlists);

  return (
    <div className="sidebar">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
        className="sidebar_logo"
      ></img>
      <div clssName="sidebar_top">
        <SidebarOption title="Home" Icon={HomeIcon} />
        <SidebarOption title="Search" Icon={SearchIcon} />
        <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      </div>

      <br />
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      <div className="sidebar_bottom">
        {playlists?.items?.map((playlist) => {
          return <SidebarOption title={playlist.name} id={playlist.id} />;
        })}
      </div>
      {/* use optional chaining to protect app from crashing in event playlist is null */}
    </div>
  );
}

export default Sidebar;
