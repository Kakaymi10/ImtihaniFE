import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizImage from './../../assets/quizz.png';
import FlagImage from './../../assets/quizze.png';
import './LandingBar.css';
import Subjects from './Subjects';

const LandingBar = ({ buttonClickSound, isMuted }) => {
  const [userName, setUserName] = useState('');
  const [inputError, setInputError] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [continueToSubjects, setContinueToSubjects] = useState(false);

  useEffect(() => {
    // Check if userName is present in localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setContinueToSubjects(true);
    }
  }, []); // Empty dependency array means this effect runs once, on mount

  const handleNameChange = (event) => {
    setUserName(event.target.value);
    setInputError(false);
  };

  const playClickSound = () => {
    const clickSound = new Audio(buttonClickSound);
    if (!isMuted) {
      clickSound.play();
    }
  };

  const handleContinueClick = async () => {
    setSpinner(true);
    playClickSound();

    try {
      if (userName.trim() === '') {
        throw new Error('Username cannot be empty.');
      }

      const apiUrl = 'https://chadlearnhib.onrender.com/user';
      const response = await axios.post(apiUrl, { name: userName });

      console.log('API response:', response.data);
      toast.success(`Welcome ${userName}!`);
      // Store user data in local storage
      localStorage.setItem('userId', response.data);
      localStorage.setItem('userName', userName);
      setContinueToSubjects(true);
    } catch (error) {
      console.error('There was a problem with the Axios request:', error);

      // Display toast messages for different error scenarios
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }

    setSpinner(false);
  };

  return (
    <>
      {continueToSubjects ? (


        <div className="relative flex flex-col items-center justify-center h-screen text-center block-subject">
          < Subjects 
          isMuted={isMuted}
            className='subject w-full h-screen text-center bg-opacity-70 bg-black '
          />
        </div>

    ) : (
    <div className="relative flex flex-col items-center justify-center h-screen text-center bg-opacity-70 bg-black">
      <div className="relative z-10 text-white p-4 mt-10 md:p-8 lg:mt-8 xl:mt-8 h-screen">
        <h1 className="text-6xl text-blue-500 md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-8 animate__animated animate__bounceIn">
          Imtihani
        </h1>
        <h4 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-8 lg:mb-0  rounded animate__animated animate__bounceIn">
        Libérez le maître du quiz qui sommeille en vous ! Répondez correctement, entendez les acclamations. Répondez incorrectement, préparez-vous à un hilarant 'baa-dum-tss' de chèvre ! Que les jeux de quiz commencent ! 🎉🧠
        </h4>
        <div className="flex justify-center">
          <img
            src={FlagImage}
            alt="Flag"
            className="w-40 p-8 lg:p-20 md:w-60 lg:w-40 xl:w-96 animate__animated animate__slideInLeft"
          />
          <img
            src={QuizImage}
            alt="Quiz"
            className="w-40 md:w-60 lg:w-80 xl:w-66 animate__animated animate__slideInRight"
          />
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          className={`border text-black border-gray-300 rounded-md p-2 mb-2 lg:mr-4 xl:mr-4 w-full md:w-80 lg:w-96 ${inputError ? 'shake-error' : ''}`}
          value={userName}
          onChange={handleNameChange}
        />

        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 mb-10 rounded-md hover:bg-green-700 w-full md:w-auto cursor-pointer"
            onClick={handleContinueClick}
          >
            {spinner ? (
              <div className="flex items-center justify-center p-1.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-900"></span>
                </span>
              </div>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    )}
    </>
  );

};

export default LandingBar
