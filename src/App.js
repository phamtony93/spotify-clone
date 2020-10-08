import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import Player from "./components/Player";
import { useStateProviderValue } from "./StateProvider";
import { spotify } from "./spotify";

function App() {
  //dispatch is a function that allows us to interact with the StateContext layer. We can dispatch actions to update state
  const [{ user, playlists, token }, dispatch] = useStateProviderValue();

  useEffect(() => {
    //When we are redirected back to the app compoenent, the app component is rerendered with the new url. Grab access token from url at that point
    const hash = getTokenFromUrl();
    window.location.hash = ""; //clear the access token within the url
    //define _token with underscore to differentiate between variable local to the function and token state variable
    const _token = hash.access_token;
    // console.log(hash)

    //sanity check
    if (_token) {
      // setToken(_token);
      //insted of setting token in state, dispatch it to StateProvider
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      //Pass access token to SpotifyWebApi (community developed wrapper for spotify api)
      spotify.setAccessToken(_token);
      //getMe() will return a promise
      spotify.getMe().then((user) => {
        //dispatch user data to StateProvider instead of setting state. Ensure correct object is passed as defined in the reducer file
        dispatch({
          type: "SET_USER",
          user: user,
          //user (shorthand for user: user in ES6)
        });
      });
      //Dispatch user's playlist to StatePovider layer
      spotify.getUserPlaylists(spotify.user).then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("37i9dQZEVXcTYvdwTEpTSD").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });

      spotify.getMyCurrentPlayingTrack().then((currentSong) => {
        dispatch({
          type: "SET_CURRENT_SONG",
          currentSong: currentSong,
        });
      });
    }

    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    });
  }, []);

  // const checkForPlayer = () => {
  // window.onSpotifyWebPlaybackSDKReady = () => {
  //   const token =
  //     "BQAxdY8iDcHEoHDVfzKfsvdaQbkWqzWducAjwjocd8fTHfmNx9I7zug4kGEYF39822z0AUSILFnspb7t0_tAW8qx8lv4VzpOmkSmR-LNJ6wmbTnhRbajZ0JzrdwDWWS6x6Ine_0fFUwYWVCSeWQ_qnaNcgA3uQ";
  //   const player = new window.Spotify.Player({
  //     name: "Web Playback SDK Quick Start Player",
  //     getOAuthToken: (cb) => {
  //       cb(token);
  //     },
  //   });
  //   player.connect();
  // };

  //   const token =
  //     "BQANrJ2Kvt4T7jWUH1SssTRjI7P14OvGoZwjnEAYb4hAAnQEf4Cicc8ZaDGyJG_yZD31-02XSzBnsyQ65RbCXX7vHG_V6CE85SyuaoaE3KVqmmvmoPxSbER5aHEZzGavjYImBk5QHNiGzw32VIsg3fwsv324Kg";

  //   if (window.Spotify !== null) {
  //     const player = new window.Spotify.Player({
  //       name: "Tony's Spotify Player",
  //       getOAuthToken: (cb) => {
  //         cb(token);
  //       },
  //     });

  //     player.connect();
  //   }
  // };

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
