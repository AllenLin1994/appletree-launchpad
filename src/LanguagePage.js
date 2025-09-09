import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguagePage.css';

const LanguagePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigate = useNavigate();

  const languages = [
    { id: 'en', name: 'English', flag: 'EN', nativeName: 'English' },
    { id: 'zh', name: '华文', flag: 'CN', nativeName: '中文' }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    
    // 保存语言选择到localStorage
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
    // 根据选择的语言跳转到不同的页面
    if (language.id === 'en') {
      setTimeout(() => {
        navigate('/englishStoryPage');
      }, 1500);
    } else if (language.id === 'zh') {
      setTimeout(() => {
        navigate('/chinese-stories');
      }, 1500);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="language-page">
      <div className="language-container fade-in">
        <button className="back-button" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          返回
        </button>

        <div className="language-header">
          <div className="language-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3498db" strokeWidth="2"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#3498db" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 9H9.01" stroke="#3498db" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 9H15.01" stroke="#3498db" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1>选择语言</h1>
          <p>Select a language</p>
        </div>

        <div className="language-list">
          {languages.map((language) => (
            <div
              key={language.id}
              className={`language-card ${selectedLanguage?.id === language.id ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect(language)}
            >
              <div className="language-flag">{language.flag}</div>
              <div className="language-info">
                <h3>{language.name}</h3>
                <p>{language.nativeName}</p>
              </div>
              <div className="language-check">
                <div className="check-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedLanguage && (
          <div className="selection-feedback">
            <p>已选择: {selectedLanguage.name}</p>
            <p>正在加载故事库...</p>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        )}

        <div className="language-footer">
          <p>更多语言即将推出</p>
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;