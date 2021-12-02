import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./Store/Store";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider
        value={
            {
                dataStore: new Store(),
            }
        }>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
