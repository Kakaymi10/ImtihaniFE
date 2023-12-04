import React, { useEffect } from 'react';
import './Home.css';
import Navbar from './Navbar';
import Banner from './Banner';
import About from './About';

import AOS from 'aos';
import 'aos/dist/aos.css';


function Home() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <div className="Apps">
      <Navbar />

      <div data-aos="fade-left">
        <Banner />
      </div>
      <div data-aos="fade-down">
        <About />
      </div>
      

      <div className='footer' data-aos="fade-up">
        <p className='content_footer'>Made with ❤️ by Chad Learn Hub</p>
      </div>
    </div>
  );
}

export default Home;
