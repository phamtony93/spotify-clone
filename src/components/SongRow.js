import React from "react";
import "../styles/SongRow.css";
import { useStateProviderValue } from "../StateProvider";

function SongRow({ track }) {
  const [{ spotify }, dispatch] = useStateProviderValue();
  const addToQueue = (song) => {
    spotify.queue(song).catch((e) => console.log(e));
    console.log("added song >>>>>>>>>", song);
  };

  const playSong = (song) => {
    spotify.play({uris: [song]})
  }

  return (
    <div className="songRow" onClick={() => addToQueue(track.uri)}>
      <img
        className="songRow_albumLogo"
        src={track.album.images[0].url}
        alt=""
      />
      <div className="songRow_info">
        <h1>{track.name}</h1>
        <p>
          {track.artists
            .map((artist) => {
              return artist.name;
            })
            .join(" ")}{" "}
          - {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
