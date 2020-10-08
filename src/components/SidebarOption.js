import React from "react";
import "../styles/SidebarOption.css";
import { useStateProviderValue } from "../StateProvider";

// SidebarOption will take an Icon component
function SidebarOption({ title, Icon, id }) {
  const [{ selectedPlaylist, spotify }, dispatch] = useStateProviderValue();

  const handleClick = () => {
    console.log("1");
    if (id) {
      spotify.getPlaylistTracks(id).then((playlist) => {
        dispatch({
          type: "SET_SELECTED_PLAYLIST",
          selectedPlaylist: playlist,
        });
      });
    }
  };

  console.log("selected >>>>", selectedPlaylist);

  return (
    <div className="sidebarOption" onClick={handleClick}>
      {Icon && <Icon className="sidebarOptionIcon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
