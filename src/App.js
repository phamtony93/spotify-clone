import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import Player from "./components/Player";
import { useStateProviderValue } from "./StateProvider";
import { spotify } from "./spotify";

function App() {
  //dispatch is a function that allows us to interact with the StateContext layer. We can dispatch actions to update state
  const [{ user, playlists, token, player }, dispatch] = useStateProviderValue();
  let playerCheckInterval = null;

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
      console.log('1')
      playerCheckInterval = setInterval(() => checkForPlayer(_token), 1000)
    }

    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    });

  }, []);

  const checkForPlayer = (token) => {
    if(window.Spotify !== null) {
      const player = new window.Spotify.Player({
        name: "Test Spotify Player",
        getOAuthToken: cb => { cb(token); }
      })
      dispatch({
        type: 'SET_PLAYER',
        player: player
      })
      // console.log('player >>>> ', player)
      clearInterval(playerCheckInterval);

      player.on('initialization_error', e => console.log(e));
      player.on('authentication_error', e => {
        console.log(e);
      })
      player.on('account_error', e => console.log(e))
      player.on('playback_error', e => console.log(e))
      player.on('player_state_changed', state => console.log(state))
      player.on('ready', async data => {
        let {device_id} = data;
        console.log("Let the music play on!");
        transferPlaybackHere(device_id, token);
        dispatch({
          type: 'SET_DEVICE_ID',
          device_id: device_id
        })
      })
      // createEventHandlers();

      player.connect();
      // player.getVolume().then(volume => {
      //   dispatch({
      //     type: 'SET_VOLUME',
      //     volume: volume * 100
      //   })
      // })

    }
  };

  // const createEventHandlers = () => {
  //   console.log('player >>>> ', player)
  //   player.on('initialization_error', e => console.log(e));
  //   player.on('authentication_error', e => {
  //     console.log(e);
  //   })
  //   player.on('account_error', e => console.log(e))
  //   player.on('playback_error', e => console.log(e))
  //   player.on('player_state_changed', state => console.log(state))
  //   player.on('ready', async data => {
  //     let {device_id} = data;
  //     console.log("Let the music play on!!");
  //     console.log('2');
  //     transferPlaybackHere(device_id);
  //     dispatch({
  //       type: 'SET_DEVICE_ID',
  //       device_id: device_id
  //     });
  //   })
  // }

  const transferPlaybackHere = (device_id, token) => {
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      }, 
      body: JSON.stringify({
        "device_ids":[device_id],
        "play": true
      })
    })
  }

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
