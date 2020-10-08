export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  //init token state for dev purposes. remove after dev is completed
  // token: 'BQDi9hJKdymtx3YzLLoWJ-_8LM_C-4nbEQABVGFFmvWr1D78gq…sXP98vhlpJ5CqlHUnPZHM9LyjwUvaR6iGpI4fYF7Wyzb7fTp0'
  token: null,
  repeat: false,
  shuffle: false,
  volume: 75,
};

//reduce takes state of what the StateProvider looks like and an action
const reducer = (state, action) => {
  // pro tip to debug what action is being passed in
  // console.log(action);

  //Action contains type and payload
  // reduers job is to listen to actions
  switch (action.type) {
    case "SET_USER":
      return {
        //keep whatever was in the current state
        ...state,
        //but update the user key
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSong: action.currentSong,
      };
    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };

    case "SET_REPEAT":
      return {
        ...state,
        repeat: action.repeat,
      };
    case "SET_SHUFFLE":
      return {
        ...state,
        shuffle: action.shuffle,
      };
    case "SET_VOLUME":
      return {
        ...state,
        volume: action.volume,
      };
    //must always have a default
    default:
      return state;
  }
};

export default reducer;
