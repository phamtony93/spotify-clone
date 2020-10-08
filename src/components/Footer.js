import React from "react";
import "../styles/Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider, Tooltip } from "@material-ui/core";
import { useStateProviderValue } from "../StateProvider";

function Footer() {
  const [
    { token, spotify, playing, currentSong, repeat, shuffle, volume },
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

  const handleNext = async () => {
    await spotify.skipToNext().catch((e) => console.log(e));
    dispatch({
      type: "SET_PLAYING",
      playing: true,
    });
    spotify.getMyCurrentPlayingTrack().then((currentSong) => {
      dispatch({
        type: "SET_CURRENT_SONG",
        currentSong: currentSong,
      });
    });
  };

  const handlePrev = async () => {
    await spotify.skipToPrevious().catch((e) => console.log(e));
    dispatch({
      type: "SET_PLAYING",
      playing: true,
    });
    spotify.getMyCurrentPlayingTrack().then((currentSong) => {
      dispatch({
        type: "SET_CURRENT_SONG",
        currentSong: currentSong,
      });
    });
  };

  const handleRepeat = () => {
    if (repeat) {
      spotify.setRepeat("off").catch((e) => console.log(e));
      dispatch({
        type: "SET_REPEAT",
        repeat: false,
      });
    } else {
      spotify.setRepeat("track").catch((e) => console.log(e));
      dispatch({
        type: "SET_REPEAT",
        repeat: true,
      });
    }
  };

  const handleShuffle = () => {
    if (shuffle) {
      spotify.setShuffle(false).catch((e) => console.log(e));
      dispatch({
        type: "SET_SHUFFLE",
        shuffle: false,
      });
    } else {
      spotify.setShuffle(true).catch((e) => console.log(e));
      dispatch({
        type: "SET_SHUFFLE",
        shuffle: true,
      });
    }
  };

  const handleChange = (e) => {
    const volume = e.target.ariaValueNow;
    spotify.setVolume(volume).catch((e) => console.log(e));
    dispatch({
      type: "SET_VOLUME",
      volume: volume,
    });
  };

  const setVolumeMinMax = () => {
    if (volume !== 0) {
      spotify.setVolume(0).catch((e) => console.log(e));
      dispatch({
        type: "SET_VOLUME",
        volume: 0,
      });
    } else {
      spotify.setVolume(100).catch((e) => console.log(e));
      dispatch({
        type: "SET_VOLUME",
        volume: 100,
      });
    }
  };

  const albumImage = currentSong?.item?.album?.images[2]?.url;
  const songName = currentSong?.item?.name;
  const artistName = currentSong?.item?.artists[0]?.name;

  //   console.log("volume >>>>>>", volume);
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
        <Tooltip title="Shuffle">
          <ShuffleIcon
            onClick={handleShuffle}
            className={shuffle ? "footer_green" : "footer_icon"}
          />
        </Tooltip>
        <Tooltip title="Previous">
          <SkipPreviousIcon onClick={handlePrev} className="footer_icon" />
        </Tooltip>
        {playing ? (
          <Tooltip title="Pause">
            <PauseCircleOutlineIcon
              onClick={handlePlayPause}
              fontSize="large"
              className="footer__icon"
            />
          </Tooltip>
        ) : (
          <Tooltip title="Play">
            <PlayCircleOutlineIcon
              onClick={handlePlayPause}
              fontSize="large"
              className="footer_icon"
            />
          </Tooltip>
        )}
        <Tooltip title="Next">
          <SkipNextIcon onClick={handleNext} className="footer_icon" />
        </Tooltip>
        <Tooltip title="Repeat">
          <RepeatIcon
            onClick={handleRepeat}
            className={repeat ? "footer_green" : "footer_icon"}
          />
        </Tooltip>
      </div>
      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            {volume === 0 ? (
              <VolumeOffIcon onClick={setVolumeMinMax} />
            ) : (
              <VolumeDownIcon onClick={setVolumeMinMax} />
            )}
          </Grid>
          <Grid item xs>
            <Slider onChange={handleChange} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
