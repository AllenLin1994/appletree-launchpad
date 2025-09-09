import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './VocabularyPage.css';

const VocabularyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vocabularyItems, setVocabularyItems] = useState([]);
  const [storyName, setStoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const story = location.state?.story;
    if (story) {
      setStoryName(story.name);
      loadVocabularyFromJson(story.name);
    } else {
      navigate('/EnglishStoryPage');
    }
  }, [location, navigate]);

  const loadVocabularyFromJson = async (storyName) => {
    setLoading(true);
    setError('');

    try {
      const jsonData = await fetchJsonData(storyName);
      
      if (jsonData && jsonData.vocabulary && jsonData.vocabulary.length > 0) {
        const formattedVocabulary = jsonData.vocabulary.map((item, index) => ({
          id: index + 1,
          emoji: item.emoji || '📝',
          name: item.word || 'Unknown Word',
          definition: item.meaning || 'Definition not available',
          example: `e.g. Example using ${item.word || 'this word'}`,
          image: `${process.env.PUBLIC_URL}/pic/${storyName}/vocab${index + 1}.jpg`
        }));
        
        setVocabularyItems(formattedVocabulary);
      } else {
        throw new Error('JSON文件中没有找到词汇数据');
      }
    } catch (err) {
      console.error('加载词汇数据失败:', err);
      // 使用默认词汇数据作为备用
      const defaultVocabulary = getDefaultVocabulary(storyName);
      setVocabularyItems(defaultVocabulary);
      setError('无法加载JSON文件，使用默认词汇数据');
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
      console.log('尝试读取JSON文件:', jsonData);
      return jsonData;
      
    } catch (error) {
      console.log('JSON文件读取失败，使用模拟数据');
      return getFallbackJsonData(storyName);
    }
  };

  const getFallbackJsonData = (storyName) => {
    // 返回模拟的JSON数据
    return {
      vocabulary: [
        { "emoji": "💊", "word": "Alleviate", "meaning": "make his sadness less" },
        { "emoji": "💡", "word": "Conceive", "meaning": "imagine or think of" },
        { "emoji": "🤗", "word": "Embrace", "meaning": "accept and welcome" },
        { "emoji": "📈", "word": "Exaggerate", "meaning": "make the danger seem bigger than it was" },
        { "emoji": "💀", "word": "Perish", "meaning": "die or be destroyed" },
        { "emoji": "💣", "word": "Obliterate", "meaning": "destroy and wipe out completely" },
        { "emoji": "😤", "word": "Obstinate", "meaning": "stubborn and unwilling to give up" },
        { "emoji": "😬", "word": "Precarious", "meaning": "unsteady and easily broken" },
        { "emoji": "🧱", "word": "Sturdy", "meaning": "strong and solid" },
        { "emoji": "😔", "word": "Sorrowful", "meaning": "full of sadness" },
        { "emoji": "✨", "word": "Aspiration", "meaning": "a very strong hope or dream" },
        { "emoji": "😨", "word": "Dread", "meaning": "a feeling of great fear" }
      ],
      story: "In the magical land of Eldoria, a young wizard named Alistair lived in a tiny cottage with a big, sorrowful heart..."
    };
  };

  const getDefaultVocabulary = (storyName) => {
    // 默认词汇数据
    return [
      {
        id: 1,
        emoji: '💊',
        name: 'Alleviate',
        definition: 'make (suffering or problem) less severe',
        example: 'e.g. The medicine helped alleviate his headache.',
        image: `${process.env.PUBLIC_URL}/pic/${storyName}/vocab1.jpg`
      },
      {
        id: 2,
        emoji: '💡',
        name: 'Conceive',
        definition: 'form or devise a plan or idea',
        example: 'e.g. It was hard to conceive a better solution.',
        image: `${process.env.PUBLIC_URL}/pic/${storyName}/vocab2.jpg`
      },
      {
        id: 3,
        emoji: '🤗',
        name: 'Embrace',
        definition: 'accept or support willingly',
        example: 'e.g. She embraced the new opportunity.',
        image: `${process.env.PUBLIC_URL}/pic/${storyName}/vocab3.jpg`
      }
    ];
  };

  const handleNext = () => {
    if (currentIndex < vocabularyItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (vocabularyItems.length > 0) {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (vocabularyItems.length > 0) {
      setCurrentIndex(vocabularyItems.length - 1);
    }
  };

  const handleBack = () => {
    navigate('/EnglishStoryPage');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  const handleReadStory = () => {
    navigate('/StoryPage', { state: { storyName } });
  };

  const currentItem = vocabularyItems[currentIndex];

  return (
    <div className="vocabulary-page">
      <div className="content-container">
        <header className="page-header">
          <button className="back-button" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回
          </button>
          
          <div className="header-content">
            <div className="book-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>{storyName}</h1>
            <p>Vocabulary Learning</p>
            {vocabularyItems.length > 0 && (
              <span className="vocab-count">{vocabularyItems.length} vocabulary words</span>
            )}
          </div>

          <button className="home-button" onClick={handleHome}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            首页
          </button>
        </header>

        {error && (
          <div className="error-message info-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>正在加载词汇...</p>
          </div>
        ) : vocabularyItems.length > 0 ? (
          <div className="vocabulary-content">
            <div className="vocabulary-card">
              <div className="vocabulary-info">
                <div className="vocab-word">
                  <span className="vocab-emoji">{currentItem.emoji}</span>
                  <h2>{currentItem.name}</h2>
                  <div className="part-of-speech">word</div>
                </div>

                <div className="vocab-definition">
                  <h3>Meaning</h3>
                  <p>{currentItem.definition}</p>
                </div>

                <div className="vocab-example">
                  <h3>Example</h3>
                  <p>{currentItem.example}</p>
                </div>

                <div className="progress-indicator">
                  <span className="progress-text">
                    {currentIndex + 1} of {vocabularyItems.length}
                  </span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${((currentIndex + 1) / vocabularyItems.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="navigation-buttons">
              <button className="nav-button prev-button" onClick={handlePrevious}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                上一个
              </button>

              <button className="nav-button restart-button" onClick={handleRestart}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 4L23 10L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 20L1 14L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.51 9.00004C4.15817 7.60866 5.05334 6.35033 6.15094 5.28891C7.24854 4.2275 8.52827 3.38399 9.92889 2.80497C11.3295 2.22596 12.8247 1.92264 14.3356 1.91196C15.8465 1.90129 17.3455 2.18351 18.7544 2.74376M20.49 15C19.8418 16.3914 18.9467 17.6497 17.8491 18.7112C16.7515 19.7726 15.4717 20.6161 14.0711 21.1951C12.6705 21.7741 11.1753 22.0775 9.66441 22.0881C8.1535 22.0988 6.65452 21.8166 5.24562 21.2563" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                重新开始
              </button>

              <button className="nav-button next-button" onClick={handleNext}>
                下一个
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button className="nav-button story-button" onClick={handleReadStory}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 极速4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 极速21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2极速V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap极速="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                阅读故事
              </button>
            </div>
          </div>
        ) : (
          <div className="no-vocabulary">
            <svg width="80" height="80" viewBox="0 极速0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ccc" strokeWidth="2"/>
              <path d="M12 8V12" stroke="#ccc" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 16H12.01" stroke="#ccc" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>没有找到词汇内容</h3>
            <p>请确保JSON文件格式正确</p>
            <button className="back-button" onClick={handleBack}>
              返回故事列表
            </button>
          </div>
        )}

        <footer className="page-footer">
          <p>© 2023 The Appletree Launchpad. Vocabulary Learning System.</p>
        </footer>
      </div>
    </div>
  );
};

export default VocabularyPage;