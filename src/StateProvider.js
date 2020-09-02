import React, { 
    createContext,
    useContext,
    useReducer} 
    from 'react';

export const StateContext = createContext();

//children are the components that are passed to StateProvider (in this case App component)
//StateProvider takes an inital state and a reducer
export const StateProvider = ({ initialState, reducer, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//refer to documentation, provides function to dispatch action and retrieve data from StateProvider
export const useStateProviderValue = () => useContext(StateContext);