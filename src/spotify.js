//Where all the spotify logic will live
//only use capitalize naming convention for react components
import SpotifyWebApi from "spotify-web-api-js";

export const AUTH_END_POINT = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "5d156ee5b4c74b0494f9040df2e5c5e5";

export const spotify = new SpotifyWebApi();

//identify scopes to be requested from the Spotify documentation
// https://developer.spotify.com/documentation/general/guides/scopes/#user-read-recently-played
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "streaming",
];





//Access Token: expires after 1 hour
//Generate here: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
const accessToken =
  "BQANrJ2Kvt4T7jWUH1SssTRjI7P14OvGoZwjnEAYb4hAAnQEf4Cicc8ZaDGyJG_yZD31-02XSzBnsyQ65RbCXX7vHG_V6CE85SyuaoaE3KVqmmvmoPxSbER5aHEZzGavjYImBk5QHNiGzw32VIsg3fwsv324Kg";

//Provided access token prepended to redirect url. Obtain token by parsing the url string on the current window
export const getTokenFromUrl = () => {
  //http://localhost:3000/#access_token=BQAziY4R6aOl9wCsNRb-Lgae2bHMPGpJCAcWEq5X
  //Find #, take the substring starting at 1, stop at next & (which is the next parameter)
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      //split between the access_token=BQA....
      let parts = item.split("=");
      //decode uri compoenent, the key
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

//create login url
//response_type = token
export const loginUrl = `${AUTH_END_POINT}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
