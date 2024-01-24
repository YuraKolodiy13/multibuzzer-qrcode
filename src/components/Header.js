import React from 'react';
import { Navbar } from 'react-bootstrap';
import { isNil } from 'lodash';
import { leaveRoom } from '../lib/endpoints';
import { useNavigate } from 'react-router-dom';

function Logo({ size = 25 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 95 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#F2994A" />
      <circle cx="75" cy="20" r="20" fill="#348DF5" />
      <circle cx="20" cy="75" r="20" fill="#348DF5" />
      <circle cx="75" cy="75" r="20" fill="#348DF5" />
    </svg>
  );
}

export default function Header({
  auth = {},
  clearAuth,
  sound = null,
  setSound,
}) {
  const navigate = useNavigate();

  // leave current game
  async function leave() {
    try {
      await leaveRoom(auth.roomID, auth.playerID, auth.credentials);
      clearAuth();
      navigate('/');
    } catch (error) {
      console.log('leave error', error);
      clearAuth();
      navigate('/');
    }
  }

  return (
    <header>
      <Navbar>
        <Navbar.Brand>
          <Logo /> Multibuzzer
        </Navbar.Brand>
        <div className="nav-buttons">
          {!isNil(sound) ? (
            <button className="text-button" onClick={() => setSound()}>
              {sound ? 'Turn off sound' : 'Turn on sound'}
            </button>
          ) : null}
          {clearAuth ? (
            <button className="text-button" onClick={() => leave()}>
              Leave game
            </button>
          ) : null}
        </div>
      </Navbar>
    </header>
  );
}
