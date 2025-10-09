// Local Storage Utility Functions for MyConstitution App

export const StorageUtils = {
  // Basic storage operations
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // User management
  saveUser: (user) => {
    StorageUtils.set('user', user);
    StorageUtils.set('isLoggedIn', true);
    StorageUtils.set('lastLogin', new Date().toISOString());
  },

  getUser: () => {
    return StorageUtils.get('user');
  },

  isLoggedIn: () => {
    return StorageUtils.get('isLoggedIn') === true;
  },

  logout: () => {
    StorageUtils.remove('user');
    StorageUtils.remove('isLoggedIn');
    StorageUtils.remove('lastLogin');
  },

  // Learning progress tracking
  getProgress: () => {
    return StorageUtils.get('learningProgress') || {
      completedSections: [],
      currentChapter: null,
      lastReadPosition: null,
      totalTimeSpent: 0,
      lastActiveDate: null
    };
  },

  updateProgress: (section, timeSpent = 0) => {
    const progress = StorageUtils.getProgress();
    
    if (!progress.completedSections.includes(section)) {
      progress.completedSections.push(section);
    }
    
    progress.currentChapter = section;
    progress.totalTimeSpent += timeSpent;
    progress.lastActiveDate = new Date().toISOString();
    
    StorageUtils.set('learningProgress', progress);
    return progress;
  },

  markSectionComplete: (section) => {
    const progress = StorageUtils.getProgress();
    if (!progress.completedSections.includes(section)) {
      progress.completedSections.push(section);
      StorageUtils.set('learningProgress', progress);
    }
  },

  // Quiz history
  getQuizHistory: () => {
    return StorageUtils.get('quizHistory') || {};
  },

  saveQuizResult: (quizId, score, timeTaken) => {
    const history = StorageUtils.getQuizHistory();
    const result = {
      score,
      timeTaken,
      attempts: (history[quizId]?.attempts || 0) + 1,
      lastAttempt: new Date().toISOString(),
      bestScore: Math.max(score, history[quizId]?.bestScore || 0)
    };
    
    history[quizId] = result;
    StorageUtils.set('quizHistory', history);
    return result;
  },

  // Bookmarks system
  getBookmarks: () => {
    return StorageUtils.get('bookmarks') || [];
  },

  addBookmark: (articleId, title) => {
    const bookmarks = StorageUtils.getBookmarks();
    const bookmark = { id: articleId, title, addedAt: new Date().toISOString() };
    
    if (!bookmarks.find(b => b.id === articleId)) {
      bookmarks.push(bookmark);
      StorageUtils.set('bookmarks', bookmarks);
    }
    return bookmarks;
  },

  removeBookmark: (articleId) => {
    const bookmarks = StorageUtils.getBookmarks();
    const filtered = bookmarks.filter(b => b.id !== articleId);
    StorageUtils.set('bookmarks', filtered);
    return filtered;
  },

  isBookmarked: (articleId) => {
    const bookmarks = StorageUtils.getBookmarks();
    return bookmarks.some(b => b.id === articleId);
  },

  // Personal notes
  getNotes: () => {
    return StorageUtils.get('personalNotes') || {};
  },

  saveNote: (articleId, note) => {
    const notes = StorageUtils.getNotes();
    notes[articleId] = {
      content: note,
      lastUpdated: new Date().toISOString()
    };
    StorageUtils.set('personalNotes', notes);
    return notes;
  },

  deleteNote: (articleId) => {
    const notes = StorageUtils.getNotes();
    delete notes[articleId];
    StorageUtils.set('personalNotes', notes);
    return notes;
  },

  // Theme preferences
  getTheme: () => {
    return StorageUtils.get('theme') || 'light';
  },

  setTheme: (theme) => {
    StorageUtils.set('theme', theme);
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  },

  // UI preferences
  getUIPreferences: () => {
    return StorageUtils.get('uiPreferences') || {
      sidebarCollapsed: false,
      defaultView: 'grid',
      notificationsEnabled: true,
      fontSize: 'medium'
    };
  },

  updateUIPreferences: (prefs) => {
    const current = StorageUtils.getUIPreferences();
    const updated = { ...current, ...prefs };
    StorageUtils.set('uiPreferences', updated);
    return updated;
  },

  // Usage statistics
  getUsageStats: () => {
    return StorageUtils.get('usageStats') || {
      totalTimeSpent: 0,
      pagesVisited: [],
      lastSessionDuration: 0,
      totalQuizzesTaken: 0,
      learningStreak: 0,
      lastActiveDate: null
    };
  },

  updateUsageStats: (stats) => {
    const current = StorageUtils.getUsageStats();
    const updated = { ...current, ...stats };
    StorageUtils.set('usageStats', updated);
    return updated;
  },

  // Learning streak calculation
  updateLearningStreak: () => {
    const stats = StorageUtils.getUsageStats();
    const today = new Date().toDateString();
    const lastActive = stats.lastActiveDate ? new Date(stats.lastActiveDate).toDateString() : null;
    
    if (lastActive === today) {
      // Already active today, no change
      return stats.learningStreak;
    } else if (lastActive === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
      // Active yesterday, increment streak
      stats.learningStreak += 1;
    } else {
      // Missed a day, reset streak
      stats.learningStreak = 1;
    }
    
    stats.lastActiveDate = new Date().toISOString();
    StorageUtils.set('usageStats', stats);
    return stats.learningStreak;
  },

  // Draft posts for discussions
  saveDraftPost: (draft) => {
    StorageUtils.set('draftPost', {
      ...draft,
      savedAt: new Date().toISOString()
    });
  },

  getDraftPost: () => {
    return StorageUtils.get('draftPost');
  },

  clearDraftPost: () => {
    StorageUtils.remove('draftPost');
  }
};

// Initialize theme on app load
export const initializeApp = () => {
  const theme = StorageUtils.getTheme();
  StorageUtils.setTheme(theme);
  
  // Update learning streak
  StorageUtils.updateLearningStreak();
  
  // Track app start
  const stats = StorageUtils.getUsageStats();
  StorageUtils.updateUsageStats({
    ...stats,
    lastSessionStart: new Date().toISOString()
  });
};

// Track page visits
export const trackPageVisit = (page) => {
  const stats = StorageUtils.getUsageStats();
  const pagesVisited = [...(stats.pagesVisited || [])];
  
  if (!pagesVisited.includes(page)) {
    pagesVisited.push(page);
  }
  
  StorageUtils.updateUsageStats({
    ...stats,
    pagesVisited
  });
};

