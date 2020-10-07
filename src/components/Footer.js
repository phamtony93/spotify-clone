import React from "react";
import "../styles/Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import { useStateProviderValue } from "../StateProvider";

function Footer() {
  const [
    { token, spotify, playing, currentSong },
    dispatch,
  ] = useStateProviderValue();

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause().catch((e) => console.log(e));
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play().catch((e) => console.log(e));
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const handleNext = () => {
    spotify.skipToNext().catch((e) => console.log(e));
  };

  const handlePrev = () => {
    spotify.skipToPrevious().catch((e) => console.log(e));
  };

  const albumImage = currentSong?.item?.album?.images[2]?.url;
  const songName = currentSong?.item?.name;
  const artistName = currentSong?.item?.artists[0]?.name;

  console.log("spotify >>>>>> ", spotify);
  console.log("current playing >>>>>>", currentSong);
  return (
    <div className="footer">
      <div className="footer_left">
        <img className="footer_albumLogo" src={albumImage} alt="'"></img>
        <div className="footer_songInfo">
          <h4>{songName}</h4>
          <p>{artistName}</p>
        </div>
      </div>
      <div className="footer_center">
        <ShuffleIcon className="footer_green" />
        <SkipPreviousIcon onClick={handlePrev} className="footer_icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer_icon"
          />
        )}
        <SkipNextIcon onClick={handleNext} className="footer_icon" />
        <RepeatIcon className="footer_green" />
      </div>
      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
