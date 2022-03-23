import "./App.css";
import Login from "./components/LoginPage/Login";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [appToken, setappToken] = useState("");

  if (!appToken) 
    return ( <div className="App"> <Login setappToken={setappToken} />  </div> );
    else return (
    
     <div className="App">
     <Dashboard props={appToken}/>
    
    </div>
  );
}

export default App;
