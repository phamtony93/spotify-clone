import React from "react";
import "../styles/Body.css";
import Header from "./Header";
import { useStateProviderValue } from "../StateProvider";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../components/SongRow";

function Body(spotify) {
  const [
    { discover_weekly, selectedPlaylist },
    dispatch,
  ] = useStateProviderValue();

  const playlistChosen = selectedPlaylist?.length === 0 ? false : true;

  console.log("selected playlist >>>>>>>>>", selectedPlaylist);
  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body_info">
        <img src={discover_weekly?.images[0].url} alt=""></img>
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h4>{playlistChosen ? selectedPlaylist.title : "Discover Weekly"}</h4>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body_songs">
        {/* group this section of icons together */}
        <div className="body_icons">
          <PlayCircleFilledIcon className="body_shuffle" />
          {/* material ui prop */}
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        {playlistChosen
          ? selectedPlaylist?.items.map((item) => {
              return <SongRow track={item.track} />;
            })
          : discover_weekly?.tracks.items.map((item) => {
              return <SongRow track={item.track} />;
            })}
      </div>
    </div>
  );
}

export default Body;
