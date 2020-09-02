export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    //init token state for dev purposes. remove after dev is completed
    token: 'BQB3K5xRPCPUH1aT2p1KJny101R7TGUOOqKaaBOAImzQrQldovxi8GOQKGDSsG24DrYcqWbCbXOxaqApT8DikBQOGdTWe5_s-8hEaxS6FY2t7fYhtiUreSF7GEARiwnPIKyxvD6fcRjFdPN812-Lc-PBPIw'
    // token: null,
}

//reduce takes state of what the StateProvider looks like and an action
const reducer = (state, action) => {
    // pro tip to debug what action is being passed in
    console.log(action);

    //Action contains type and payload
    // reduers job is to listen to actions
    switch(action.type) {
        case 'SET_USER':
            return {
                //keep whatever was in the current state
                ...state,
                //but update the user key
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        //must always have a default
        default: 
            return state;
    }
}

export default reducer;