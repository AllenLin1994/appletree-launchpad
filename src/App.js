import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LanguagePage from './LanguagePage';
import EnglishStoryPage from './EnglishStoryPage.js';
import VocabularyPage from './VocabularyPage';
import StoryPage from './StoryPage.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/language" element={<LanguagePage />} />
          <Route path="/englishStoryPage" element={<EnglishStoryPage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/storyPage" element={<StoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;