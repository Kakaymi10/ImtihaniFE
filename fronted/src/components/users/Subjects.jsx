import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastProvider } from 'react-toast-notifications';
import QuizGame from './GameController';
import PointsDisplay from './PointsDisplay';
import quizImage from '../../assets/quizz.png';
import Modal from 'react-modal';
import { FaPlayCircle, FaTimes } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './LandingBar.css';
import biologyImage from '../../assets/biology.jpg';
import historyImage from '../../assets/history.png';
import geographyImage from '../../assets/geography.png';
import scienceImage from '../../assets/science.png';
Modal.setAppElement('#root');

const Subjects = () => {
  const [userId, setUserId] = useState('');
  const [subjects, setSubjects] = useState(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
    return storedSubjects || [];
  });
  
  const [isplay, setIsPlay] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const isPlay = JSON.parse(localStorage.getItem('isPlay'));
  
  

  const userName = localStorage.getItem('userName');
  const updateScore = (newScore) => {
    
    localStorage.setItem('quizScore', newScore);

  };

  const imgese = {
    Biology: biologyImage,
    History: historyImage,
    Geography: geographyImage,
    Science: scienceImage,
    Physics: scienceImage,
    "General Culture": geographyImage,
    Mathematics: geographyImage,

  }
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    if (storedUserId && storedUserName && subjects.length === 0) {
      axios
        .get('https://chadlearnhib.onrender.com/subject/')
        .then((response) => {
          setSubjects(response.data);
          localStorage.setItem('subjects', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error fetching subjects:', error);
        });
    }
  }, [subjects]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
  
    if (storedUserId && storedUserName) {
      axios
        .get(`https://chadlearnhib.onrender.com/points/${storedUserName}`)
        .then((response) => {
          localStorage.setItem('quizScore', response.data.point);
        })
        .catch((error) => {
          console.error('Error fetching points:', error);
        });
    }
  }, []);
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal = (subject) => {
    setSelectedSubject(subject);

    const fetchQuestions = async () => {
      const url = `https://chadlearnhib.onrender.com/subject/${subject}`;

      try {
        const response = await axios.get(url);
        localStorage.setItem('questions', JSON.stringify(response.data));
        console.log('API response:', response.data);
     
      } catch (error) {
        console.error('Error fetching questions:', error);
        addToast('Error fetching questions. Please try again.', { appearance: 'error' });
      }
    };
    fetchQuestions();
  
  };

  const closeModal = () => {

    setSelectedSubject(null);
  };

 
  const play = () => {
    localStorage.setItem('isPlay', true);
    window.location.reload();
  };
 
  const points = localStorage.getItem('quizScore');
  console.log('points', points);

  return (
    <div className="lisse relative min-h-screen text-center bg-opacity-70 bg-black">
      {isPlay ? (
        <ToastProvider>
        
        <QuizGame onGameEnd={updateScore} />
      </ToastProvider>
      ) : (
        <div className='subect-block'>
          <div className="absolute top-1 left-1">
            <PointsDisplay points={points} />
          </div>
          <div className="flex-col transform justify-center h-full p-4 pt-0 text-white subjects">
            <h1 className="text-3xl font-bold mb-4">Welcome {userName}!</h1>
            <div className="">
              <h2 className="text-2xl font-bold mb-4">Choose a subject:</h2>
              <Carousel>
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="img_cont bg-blue-500 bg-opacity-20 rounded p-3 pb-10 rounded cursor-pointer hover:bg-opacity-30"
                    onClick={() => openModal(subject.name)}
                  >
                    <img src={imgese[subject?.name]} alt="quizz" className='img'/>
                    <span className="absolute z-50 bottom-0 left-1/2 transform -translate-x-1/2 mb-8 text-2xl font-bold">
                      {subject.name}
                    </span>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <Modal
            isOpen={!!selectedSubject}
            onRequestClose={closeModal}
            contentLabel="Subject Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={true}
            close={closeModal}
          >
            <div className="modal-header">
              <h2 className="text-2xl text-red-500 mt-6 font-bold mb-4">{selectedSubject}</h2>
              <button className="close-button absolute top-1 right-1 bg-white text-black" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div>
              <p className="text-black">Add your subject explanation text here </p>
              <p
                onClick={play}
                className="play-container hover:bg-blue-500 hover:text-white mt-6 absolute bottom-2 left-1/2 transform -translate-x-1/2 mb-5 w-4/6 cursor-pointer"
              >
                <span className="play-text">Play</span>
                <FaPlayCircle className="play-icon  cursor-pointer" />
              </p>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Subjects;
