import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StoryPage.css';

const StoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storyName, setStoryName] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [vocabularyWords, setVocabularyWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const story = location.state?.storyName;
    if (story) {
      setStoryName(story);
      loadStoryContent(story);
    } else {
      navigate('/english-stories');
    }
  }, [location, navigate]);

  const loadStoryContent = async (storyName) => {
    setLoading(true);
    setError('');

    try {
      const jsonData = await fetchJsonData(storyName);
      
      if (jsonData && jsonData.story) {
        setStoryContent(jsonData.story);
        setVocabularyWords(jsonData.vocabulary || []);
      } else {
        throw new Error('JSON文件中没有找到故事内容');
      }
    } catch (err) {
      console.error('加载故事内容失败:', err);
      setError('无法加载故事内容，使用默认故事');
      // 使用默认故事内容
      const fallbackData = getFallbackJsonData(storyName);
      setStoryContent(fallbackData.story);
      setVocabularyWords(fallbackData.vocabulary || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchJsonData = async (storyName) => {
    try {
      const filePath = `${process.env.PUBLIC_URL}/pic/${storyName}.json`;
      console.log('尝试读取JSON文件:', filePath);
      
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`JSON文件不存在: ${response.status}`);
      }
      
      const jsonData = await response.json();
      return jsonData;
      
    } catch (error) {
      console.log('JSON文件读取失败，使用模拟数据');
      return getFallbackJsonData(storyName);
    }
  };

  const getFallbackJsonData = (storyName) => {
    return {
      vocabulary: [
        { "emoji": "💊", "word": "Alleviate", "meaning": "make his sadness less" },
        { "emoji": "💡", "word": "Conceive", "meaning": "imagine or think of" },
        { "emoji": "🤗", "word": "Embrace", "meaning": "accept and welcome" }
      ],
      story: "In the magical land of Eldoria, a young wizard named Alistair lived in a tiny cottage with a big, sorrowful heart (full of sadness). His dragon, Ignis, had recently vanished, and no spell or potion could alleviate his grief (make his sadness less). Alistair's village, once a place of laughter, now felt precarious and fragile (unsteady and easily broken) because a terrible shadow beast was threatening to obliterate everything (destroy and wipe out completely).\n\nAlistair had a single, unwavering aspiration (a very strong hope or dream) to find his dragon. He had to be brave, even though a terrible dread filled his mind (a feeling of great fear)."
    };
  };

  const highlightVocabulary = (text, vocabulary) => {
    if (!vocabulary.length) return text;

    let highlightedText = text;
    vocabulary.forEach(({ word, meaning }) => {
      if (word && meaning) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        highlightedText = highlightedText.replace(
          regex, 
          `<span class="vocab-highlight" title="${meaning}">${word}</span>`
        );
      }
    });

    return highlightedText;
  };

  const handleBackToVocabulary = () => {
    navigate('/vocabulary', { state: { story: { name: storyName } } });
  };

  const handleBackToStories = () => {
    navigate('/english-stories');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleWordClick = (word, meaning) => {
    alert(`${word}: ${meaning}`);
  };

  const processedContent = highlightVocabulary(storyContent, vocabularyWords);

  return (
    <div className="story-page">
      <div className="content-container">
        <header className="page-header">
          <button className="back-button" onClick={handleBackToVocabulary}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http极速://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回词汇
          </button>
          
          <div className="header-content">
            <div className="story-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 极速17H7L3 21V5极速C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8e44ad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>{storyName}</h1>
            <p>Story Reading</p>
            {vocabularyWords.length > 0 && (
              <span className="vocab-count">{vocabularyWords.length} vocabulary words in story</span>
            )}
          </div>

          <button className="home-button" onClick={handleHome}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9极速L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            首页
          </button>
        </header>

        {error && (
          <div className="error-message info-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12极速C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>正在加载故事...</p>
          </div>
        ) : (
          <div className="story-content">
            <div className="story-text">
              <div 
                className="story-paragraphs"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>

            {vocabularyWords.length > 0 && (
              <div className="vocabulary-sidebar">
                <h3>故事词汇</h3>
                <div className="vocabulary-list">
                  {vocabularyWords.map((word, index) => (
                    <div 
                      key={index} 
                      className="vocab-item"
                      onClick={() => handleWordClick(word.word, word.meaning)}
                    >
                      <span className="vocab-emoji">{word.emoji}</span>
                      <div className="vocab-info">
                        <span className="vocab-word">{word.word}</span>
                        <span className="vocab-meaning">{word.meaning}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="story-actions">
              <button className="nav-button" onClick={handleBackToVocabulary}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12极速L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                返回学习词汇
              </button>
              
              <button className="nav-button" onClick={handleBackToStories}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142极速C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin极速="round"/>
                </svg>
                返回故事列表
              </button>
            </div>
          </div>
        )}

        <footer className="page-footer">
          <p>© 2023 The Appletree Launchpad. Story Reading System.</p>
        </footer>
      </div>
    </div>
  );
};

export default StoryPage;