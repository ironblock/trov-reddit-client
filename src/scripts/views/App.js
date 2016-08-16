// ROOT APP COMPONENT
// =============================================================================
// Small fragment controlling the root element for the entire webapp heirarchy.
// Deliberately small and location-agnostic, this component is to be used on
// both client and server (most likely by the "/" route).

import React from "react";

const App = ({ children }) => (
  <div className="app-wrapper">
    <h1>Reddit Client</h1>
    { children }
  </div>
);

export default App;
