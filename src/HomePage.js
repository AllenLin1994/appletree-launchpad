import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/language');
  };

  return (
    <div className={`home-page ${loaded ? 'loaded' : ''}`}>
      <div className="background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="content">
        <header className="header">
          <div className="logo">
            <div className="apple-icon">
              <div className="apple-body"></div>
              <div className="apple-leaf"></div>
            </div>
            <h1>The Appletree<br /><span>Launchpad</span></h1>
          </div>
        </header>
        
        <main className="main">
          <div className="hero">
            <h2>Learn vocabulary easily with simple stories</h2>
            <p>通过有趣的故事和上下文情境，轻松记忆新单词，让语言学习变得自然高效。</p>
            <button className="cta-button" onClick={handleGetStarted}>
              Get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </main>
        
        <footer className="footer">
          <p>© 2023 The Appletree Launchpad. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;