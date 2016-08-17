// ROOT APP COMPONENT
// =============================================================================
// Small fragment controlling the root element for the entire webapp heirarchy.
// Deliberately small and location-agnostic, this component is to be used on
// both client and server (most likely by the "/" route).

import React from "react";

// CONTAINERS
import SubSelector from "../containers/SubSelector";

const App = ({ children }) => {
  // GLOBAL APP STYLES
  if ( process.env.BROWSER ) {
    require( "../../styles/main.scss" );
  }

  return (
    <div className="app-wrapper">
      <SubSelector />
      { children }
    </div>
  );
};

export default App;
