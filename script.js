
// Main Application Script
(function() {
  function initializeApp() {
    console.info('Application initialisée');
    console.log('Vérification de la clé de session...');
    
    // Vérifier que SessionManager existe
    if (typeof window.SessionManager === 'undefined') {
      console.error('SessionManager n\'est pas disponible. Chargement...');
      loadSessionManager(() => {
        setupEventListeners();
      });
      return;
    }
    
    setupEventListeners();
  }
  
  function loadSessionManager(callback) {
    const script = document.createElement('script');
    script.src = 'session-manager.js';
    script.onload = function() {
      console.log('SessionManager chargé avec succès');
      if (callback && typeof callback === 'function') {
        callback();
      }
    };
    script.onerror = function() {
      console.error('Erreur de chargement de SessionManager');
    };
    document.head.appendChild(script);
  }
  
  function setupEventListeners() {
    const startButton = document.getElementById('startButton');
    const sessionKeyInput = document.getElementById('sessionKeyInput');
    const createNewSessionBtn = document.getElementById('createNewSessionBtn');
    
    // Get or create a session key when the page loads
    try {
      const currentKey = window.SessionManager.getSessionKey();
      
      if (sessionKeyInput) {
        sessionKeyInput.value = currentKey;
      }
    } catch (e) {
      console.error('Erreur lors de l\'obtention de la clé de session:', e);
    }
    
    // Create new session functionality
    if (createNewSessionBtn) {
      createNewSessionBtn.addEventListener('click', function() {
        try {
          const newKey = window.SessionManager.generateSessionKey();
          if (sessionKeyInput) {
            sessionKeyInput.value = newKey;
          }
          localStorage.setItem('currentSessionKey', newKey);
          console.log('Nouvelle clé de session générée:', newKey);
        } catch (e) {
          console.error('Erreur lors de la génération d\'une nouvelle clé:', e);
        }
      });
    }
    
    // Start button functionality
    if (startButton) {
      startButton.addEventListener('click', function() {
        const enteredKey = sessionKeyInput ? sessionKeyInput.value.trim() : '';
        
        if (enteredKey) {
          localStorage.setItem('currentSessionKey', enteredKey);
          window.location.href = 'acceuil.html';
        } else {
          alert('Veuillez entrer une clé de session valide.');
        }
      });
    }
  }
  
  // Initialiser l'application quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
})();
