
// Session Manager Module
(function() {
  // Vérifier si nous sommes dans un environnement navigateur
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    console.error("SessionManager: Environnement non supporté");
    return;
  }

  function generateSessionKey() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  function getSessionKey() {
    let key = localStorage.getItem('currentSessionKey');
    if (!key) {
      key = generateSessionKey();
      localStorage.setItem('currentSessionKey', key);
      // Initialiser les données de base pour cette session
      localStorage.setItem(`session_${key}`, JSON.stringify({
        decks: [],
        themes: [],
        flashcards: {}
      }));
    }
    return key;
  }

  // Initialiser le module
  function init() {
    console.log("Initialisation du SessionManager...");
    // Vérifier si une clé de session existe déjà
    getSessionKey();
  }

  // Exporter les fonctions
  window.SessionManager = {
    init: init,
    getSessionKey: getSessionKey,
    generateSessionKey: generateSessionKey,
    createNewSession: function() {
        console.log('Création d\'une nouvelle session...');
        const sessionKey = this.generateSessionKey();
        console.info('Nouvelle clé générée: ' + sessionKey);
        
        try {
            localStorage.setItem('currentSessionKey', sessionKey);
            console.log('Clé enregistrée dans localStorage');
            
            // Initialiser les données de base pour cette session
            localStorage.setItem(`session_${sessionKey}`, JSON.stringify({
                decks: [],
                themes: [],
                flashcards: {}
            }));
            console.info('Session initialisée avec succès');
        } catch (error) {
            console.error('Erreur lors de la création de la session: ' + error.message);
        }

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

  // Auto-initialisation
  init();
})();
