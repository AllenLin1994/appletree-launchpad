import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EnglishStoryPage.css';

const EnglishListPage = () => {
  const navigate = useNavigate();

  function importAll(r) {
    return r.keys().map((key) => ({
      src: r(key),
      name: key.replace('./', '').replace(/\.[^/.]+$/, '').replace(/_/g, ' ')
    }));
  }

  const englishStories = importAll(require.context(`../pic`, false, /\.(png|jpe?g|svg)$/));

  const handleStorySelect = (story) => {
    console.log('Selected story:', story);
    // 这里可以跳转到故事详情页面
    navigate('/vocabulary', { state: { story } });
  };

  const handleBack = () => {
    navigate('/language');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="english-list-page">
      <div className="content-container">
        {/* 头部 */}
        <header className="page-header">
          <button className="back-button" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回
          </button>
          
          <div className="header-content">
            <div className="shelf-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21V8H3V6Z" fill="#8BC34A"/>
                <path d="M3 10H21V12H3V10Z" fill="#8BC34A"/>
                <path d="M3 14H21V16H3V14Z" fill="#8BC34A"/>
                <path d="M3 18H21V20H3V18Z" fill="#8BC34A"/>
                <path d="M2 4H22V20H2V4Z" stroke="#5D4037" strokeWidth="2"/>
              </svg>
            </div>
            <h1>Story Shelf</h1>
            <p>English Stories Collection</p>
          </div>

          <button className="home-button" onClick={handleHome}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            首页
          </button>
        </header>

        {/* 故事网格 */}
        <div className="stories-grid">
          {englishStories.map((img, idx) => (
            <div 
              className="story-card" 
              key={idx}
              onClick={() => handleStorySelect(img)}
            >
              <div className="image-container">
                <img 
                  src={img.src} 
                  alt={img.name} 
                  className="story-img"
                  onLoad={(e) => {
                    const imgElement = e.target;
                    imgElement.style.opacity = '1';
                  }}
                />
              </div>
              <div className="story-title">{img.name}</div>
            </div>
          ))}
        </div>

        {/* 页脚 */}
        <footer className="page-footer">
          <p>© 2023 The Appletree Launchpad. All English stories collection.</p>
        </footer>
      </div>
    </div>
  );
};

export default EnglishListPage;