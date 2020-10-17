import React from "react";
import "../styles/SidebarOption.css";
import { useStateProviderValue } from "../StateProvider";

// SidebarOption will take an Icon component
function SidebarOption({ title, Icon, id , likedSongs}) {
  const [{ selectedPlaylist, spotify }, dispatch] = useStateProviderValue();

  const handleClick = () => {
    console.log("1");
    if (id) {
      spotify.getPlaylistTracks(id).then((playlist) => {
        console.log(playlist)
        dispatch({
          type: "SET_SELECTED_PLAYLIST",
          selectedPlaylist: { ...playlist, title },
        });
      });
    }
  };

  const setLikedSongs = () => {
    if (likedSongs) {
      spotify.getMySavedTracks().then(playlist => {
        dispatch({
          type: "SET_SELECTED_PLAYLIST",
          selectedPlaylist: {...playlist, title: 'Liked Songs'},
        })
      })
    }
  }
  console.log("selected >>>>", selectedPlaylist);

  return (
    <div className="sidebarOption" onClick={likedSongs ? setLikedSongs : handleClick}>
      {Icon && <Icon className="sidebarOptionIcon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
