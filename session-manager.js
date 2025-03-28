// Session Manager Module
(function() {
  function generateSessionKey() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function getSessionKey() {
    let key = localStorage.getItem('currentSessionKey');
    if (!key) {
      key = generateSessionKey();
      localStorage.setItem('currentSessionKey', key);
    }
    return key;
  }

  // Make functions available globally
  window.SessionManager = {
    getSessionKey: getSessionKey,
    generateSessionKey: generateSessionKey,
    createNewSession: function() {
        const sessionKey = this.generateSessionKey();
        localStorage.setItem('currentSessionKey', sessionKey);

        // Initialiser les données de base pour cette session
        localStorage.setItem(`session_${sessionKey}`, JSON.stringify({
            decks: [],
            themes: [],
            flashcards: {}
        }));

        return sessionKey;
    },
    getCurrentSessionKey: function() {
        return localStorage.getItem('currentSessionKey');
    },
    getCurrentSessionData: function() {
        const key = this.getCurrentSessionKey();
        if (!key) return null;

        const data = localStorage.getItem(`session_${key}`);
        return data ? JSON.parse(data) : null;
    },
    saveCurrentSessionData: function(data) {
        const key = this.getCurrentSessionKey();
        if (!key) return false;

        localStorage.setItem(`session_${key}`, JSON.stringify(data));
        return true;
    },
    getDecks: function() {
        const sessionData = this.getCurrentSessionData();
        return sessionData ? sessionData.decks : [];
    },
    getThemes: function() {
        const sessionData = this.getCurrentSessionData();
        return sessionData ? sessionData.themes : [];
    },
    getFlashcards: function(deckId) {
        const sessionData = this.getCurrentSessionData();
        if (!sessionData || !sessionData.flashcards) return [];

        return sessionData.flashcards[deckId] || [];
    },
    saveDecks: function(decks) {
        const sessionData = this.getCurrentSessionData() || {};
        sessionData.decks = decks;
        this.saveCurrentSessionData(sessionData);
    },
    saveThemes: function(themes) {
        const sessionData = this.getCurrentSessionData() || {};
        sessionData.themes = themes;
        this.saveCurrentSessionData(sessionData);
    },
    saveFlashcards: function(deckId, flashcards) {
        const sessionData = this.getCurrentSessionData() || {};
        if (!sessionData.flashcards) {
            sessionData.flashcards = {};
        }
        sessionData.flashcards[deckId] = flashcards;
        this.saveCurrentSessionData(sessionData);
    },
    switchSession: function(sessionKey) {
        // Vérifier que la session existe
        const sessionData = localStorage.getItem(`session_${sessionKey}`);
        if (!sessionData) return false;

        localStorage.setItem('currentSessionKey', sessionKey);
        return true;
    }
  };
})();