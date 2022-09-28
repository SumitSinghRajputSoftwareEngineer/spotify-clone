
import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
// // npm i spotify-web-api-js
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';

const spotify = new SpotifyWebApi();

function App() {
  //Run code based on a given condition
  const [token,setToken] = useState(null);
  useEffect(()=>{
    //code...
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token){
      setToken(_token);
      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        console.log('😀',user);
      })
    }
    console.log("I HAVE A TOKEN ",token);
  },[]);
  return (
    //BEM Convention

    <div className="App">
    {
      token ? (
        <Player />
      ) : (
        <Login />
      )
    }
    </div>
  );
}

export default App;
