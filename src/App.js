import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { get, isNil } from 'lodash';

import Lobby from './containers/Lobby';
import Game from './containers/Game';
import './App.css';
import QrCode from './containers/QrCode';

function App() {
  const [auth, setAuth] = useState({
    playerID: null,
    credentials: null,
    roomID: null,
  });

  const GameRoute = ({ auth, setAuth }) => {
    const location = useLocation();
    const roomID = location.pathname.split('/').pop(); // Extract roomID from the pathname

    console.log(roomID, 'roomID');

    // redirect if the roomID in auth doesn't match, or no credentials
    return roomID &&
      auth.roomID === roomID &&
      !isNil(auth.credentials) &&
      !isNil(auth.playerID) ? (
      <Game auth={auth} setAuth={setAuth} />
    ) : (
      <Navigate to="/" state={{ from: location, roomID }} />
    );
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/game/:id"
            element={<GameRoute auth={auth} setAuth={setAuth} />}
          />
          <Route path="/qrcode/:id" element={<QrCode />} />
          <Route path="/" element={<Lobby setAuth={setAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
