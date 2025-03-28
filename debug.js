
// Fonctions de débogage pour l'application CDS FLASHCARD-BASE
console.log("Console de débogage initialisée");

// Fonction pour inspecter et valider un formulaire
function debugForm(formId) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`Formulaire ${formId} non trouvé!`);
        return null;
    }
    
    console.log(`Inspection du formulaire ${formId}:`);
    
    // Récupérer tous les champs du formulaire
    const inputs = form.querySelectorAll('input, textarea, select');
    const formData = {};
    
    inputs.forEach(input => {
        formData[input.id || input.name] = {
            type: input.type,
            value: input.value,
            required: input.required,
            validity: input.validity.valid
        };
    });
    
    console.log("Données du formulaire:", formData);
    return formData;
}

// Fonction pour aider à résoudre les problèmes de soumission de formulaire
function monitorFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`Formulaire ${formId} non trouvé pour la surveillance!`);
        return;
    }
    
    form.addEventListener('submit', (e) => {
        console.log(`Soumission du formulaire ${formId} détectée`);
        debugForm(formId);
    });
    
    console.log(`Surveillance du formulaire ${formId} activée`);
}

// Exporter les fonctions pour utilisation globale
window.debugForm = debugForm;
window.monitorFormSubmission = monitorFormSubmission;

// Message d'initialisation
console.log("Application initialisée");


// Outil de console de débogage
(function() {
  // Créer un élément pour afficher les logs
  function createDebugConsole() {
    // Vérifier si la console existe déjà
    if (document.getElementById('debug-console')) {
      return document.getElementById('debug-console');
    }
    
    const debugConsole = document.createElement('div');
    debugConsole.id = 'debug-console';
    debugConsole.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      max-height: 200px;
      background-color: rgba(0, 0, 0, 0.85);
      color: #fff;
      z-index: 10000;
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      overflow-y: auto;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    `;
    
    // Bouton pour afficher/masquer la console
    const toggleButton = document.createElement('button');
    toggleButton.id = 'debug-toggle';
    toggleButton.textContent = '🔍 Debug';
    toggleButton.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background-color: #5D3FD3;
      color: white;
      border: none;
      border-radius: 30px;
      padding: 8px 15px;
      font-weight: bold;
      z-index: 10001;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    
    // Ajouter au DOM
    document.body.appendChild(debugConsole);
    document.body.appendChild(toggleButton);
    
    // Gestion de l'affichage
    let isVisible = false;
    toggleButton.addEventListener('click', () => {
      isVisible = !isVisible;
      debugConsole.style.transform = isVisible ? 'translateY(0)' : 'translateY(100%)';
      toggleButton.textContent = isVisible ? '❌ Fermer' : '🔍 Debug';
    });
    
    return debugConsole;
  }
  
  // Initialiser quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDebugConsole);
  } else {
    initDebugConsole();
  }
  
  function initDebugConsole() {
    const debugConsole = createDebugConsole();
    
    // Intercepter les logs de la console
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };
    
    // Fonction pour ajouter un message à notre console de débogage
    function logToDebugConsole(message, type = 'log') {
      if (!debugConsole) return;
      
      const entry = document.createElement('div');
      
      // Styliser selon le type de message
      let color = '#fff';
      let prefix = '';
      
      switch(type) {
        case 'error':
          color = '#ff6b6b';
          prefix = '❌ ERROR: ';
          break;
        case 'warn':
          color = '#feca57';
          prefix = '⚠️ WARNING: ';
          break;
        case 'info':
          color = '#54a0ff';
          prefix = 'ℹ️ INFO: ';
          break;
      }
      
      entry.style.cssText = `
        color: ${color};
        padding: 2px 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      `;
      
      // Formatage du message
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      if (typeof message === 'object') {
        try {
          message = JSON.stringify(message);
        } catch (e) {
          message = "[Objet non sérialisable]";
        }
      }
      
      entry.textContent = `[${timestamp}] ${prefix}${message}`;
      debugConsole.appendChild(entry);
      debugConsole.scrollTop = debugConsole.scrollHeight;
    }
    
    // Remplacer les fonctions de console
    console.log = function() {
      const args = Array.from(arguments);
      originalConsole.log.apply(console, args);
      logToDebugConsole(args.join(' '), 'log');
    };
    
    console.error = function() {
      const args = Array.from(arguments);
      originalConsole.error.apply(console, args);
      logToDebugConsole(args.join(' '), 'error');
    };
    
    console.warn = function() {
      const args = Array.from(arguments);
      originalConsole.warn.apply(console, args);
      logToDebugConsole(args.join(' '), 'warn');
    };
    
    console.info = function() {
      const args = Array.from(arguments);
      originalConsole.info.apply(console, args);
      logToDebugConsole(args.join(' '), 'info');
    };
    
    // Message de démarrage
    console.info('Console de débogage initialisée');
  }
})();
