import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './components/Player'
import { useStateProviderValue } from './StateProvider'

//Create new instance of SpotifyWebApi to interact with Spotify API
const spotify = new SpotifyWebApi();

function App() {
  //dispatch is a function that allows us to interact with the StateContext layer. We can dispatch actions to update state
  const [{ user, token }, dispatch] = useStateProviderValue();

  useEffect( () => {
    //When we are redirected back to the app compoenent, the app component is rerendered with the new url. Grab access token from url at that point
    const hash = getTokenFromUrl();
    window.location.hash=""; //clear the access token within the url
    //define _token with underscore to differentiate between variable local to the function and token state variable
    const _token = hash.access_token;
    // console.log(hash)
  
    //sanity check
    if (_token) {
      // setToken(_token);
      //insted of setting token in state, dispatch it to StateProvider
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      //Pass access token to SpotifyWebApi (community developed wrapper for spotify api)
      spotify.setAccessToken(_token);
      //getMe() will return a promise
      spotify.getMe().then(user => {
        //dispatch user data to StateProvider instead of setting state. Ensure correct object is passed as defined in the reducer file
        dispatch({
          type: 'SET_USER',
          user: user
          //user (shorthand for user: user in ES6)
        })        
      })
      //Dispatch user's playlist to StatePovider layer
      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      })
    }

  }, []);

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify}/>
          ) : (
            <Login />
          )
      }
    </div>
  );
}

export default App;
