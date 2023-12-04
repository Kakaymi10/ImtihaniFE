import './App.css'
import 'animate.css/animate.min.css';
import backgroundAudio from './assets/background-audio.mp3';
import buttonClickSound from './assets/button-click-sound.wav';
import { useState, useEffect,useRef } from 'react';
import { IoVolumeMute } from "react-icons/io5";
import { VscUnmute } from "react-icons/vsc";
import Home from './components/Home/Home.js';
import LandingBar from './components/users/landingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    audioRef.current.volume = 0.01;

    const handleCanPlayThrough = () => {
      // You can choose to play the audio here if needed
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);


  useEffect(() => {
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      audioRef.current.volume = 0.01;
    }
  }, [isMuted]);
  

  
  return (
    <Router>
      <div className='bg-gradient-to-br from-blue-500 via-yellow-500 to-red-500 w-full'>
        <audio ref={audioRef} loop>
          <source src={backgroundAudio} type="audio/mp3" />
        </audio>
        {isMuted ? (
          <IoVolumeMute
            onClick={toggleMute}
            className='absolute top-2 right-4 text-3xl text-red-500 cursor-pointer z-50'
          />
        ) : (
          <VscUnmute
            onClick={toggleMute}
            className='absolute top-2 right-4 text-3xl text-3xl text-green-500 cursor-pointer z-50'
          />
        )}
      <Routes>
        <Route path="/" element={<Home />} />
   
        <Route path="/imtihani" element={<LandingBar buttonClickSound={buttonClickSound} isMuted={isMuted} />} />
      </Routes>
      </div>
    </Router>

  )
}

export default App

/*<LandingBar 
    buttonClickSound={buttonClickSound}
    isMuted={isMuted} />*/

/*const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    audioRef.current.volume = 0.01;

    const handleCanPlayThrough = () => {
      // You can choose to play the audio here if needed
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);


  useEffect(() => {
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      audioRef.current.volume = 0.01;
    }
  }, [isMuted]);*/
  /*<div className='bg-gradient-to-br from-blue-500 via-yellow-500 to-red-500 w-full'>
      <audio ref={audioRef} loop>
          <source src={backgroundAudio} type="audio/mp3" />
        </audio>
      {isMuted ? (
        <IoVolumeMute
        onClick={toggleMute}
        className='absolute top-2 right-4 text-3xl text-red-500 cursor-pointer z-50'
      />
      ) : (
        <VscUnmute
        onClick={toggleMute}
        className='absolute top-2 right-4 text-3xl text-3xl text-green-500 cursor-pointer z-50'
        />
      )}
      <
    </div>*/