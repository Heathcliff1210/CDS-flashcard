
// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
  console.info('Application initialisée');
  console.log('Vérification de la clé de session...');
  const startButton = document.getElementById('startButton');
  const sessionKeyInput = document.getElementById('sessionKeyInput');
  const createNewSessionBtn = document.getElementById('createNewSessionBtn');
  
  // Get or create a session key when the page loads
  const currentKey = window.SessionManager.getSessionKey();
  
  if (sessionKeyInput) {
    sessionKeyInput.value = currentKey;
  }
  
  // Create new session functionality
  if (createNewSessionBtn) {
    createNewSessionBtn.addEventListener('click', function() {
      const newKey = window.SessionManager.generateSessionKey();
      sessionKeyInput.value = newKey;
      localStorage.setItem('currentSessionKey', newKey);
    });
  }
  
  // Start button functionality
  if (startButton) {
    startButton.addEventListener('click', function() {
      const enteredKey = sessionKeyInput.value.trim();
      
      if (enteredKey) {
        localStorage.setItem('currentSessionKey', enteredKey);
        window.location.href = 'acceuil.html';
      } else {
        alert('Veuillez entrer une clé de session valide.');
      }
    });
  }
});
