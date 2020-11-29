import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./store/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Layout } from "./Layout";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
