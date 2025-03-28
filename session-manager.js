
/**
 * Gestionnaire de session pour CDS Flashcard-Base
 * Permet de gérer les données utilisateur avec des clés de session uniques
 */
class SessionManager {
    /**
     * Génère une nouvelle clé de session aléatoire
     */
    static generateSessionKey(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < length; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }

    /**
     * Crée une nouvelle session avec une clé unique
     */
    static createNewSession() {
        const sessionKey = this.generateSessionKey();
        localStorage.setItem('currentSessionKey', sessionKey);
        
        // Initialiser les données de base pour cette session
        localStorage.setItem(`session_${sessionKey}`, JSON.stringify({
            decks: [],
            themes: [],
            flashcards: {}
        }));
        
        return sessionKey;
    }

    /**
     * Récupère la clé de session actuelle
     */
    static getCurrentSessionKey() {
        return localStorage.getItem('currentSessionKey');
    }

    /**
     * Récupère les données de la session actuelle
     */
    static getCurrentSessionData() {
        const key = this.getCurrentSessionKey();
        if (!key) return null;
        
        const data = localStorage.getItem(`session_${key}`);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Sauvegarde les données de la session actuelle
     */
    static saveCurrentSessionData(data) {
        const key = this.getCurrentSessionKey();
        if (!key) return false;
        
        localStorage.setItem(`session_${key}`, JSON.stringify(data));
        return true;
    }

    /**
     * Méthodes spécifiques pour récupérer différents types de données
     */
    static getDecks() {
        const sessionData = this.getCurrentSessionData();
        return sessionData ? sessionData.decks : [];
    }

    static getThemes() {
        const sessionData = this.getCurrentSessionData();
        return sessionData ? sessionData.themes : [];
    }

    static getFlashcards(deckId) {
        const sessionData = this.getCurrentSessionData();
        if (!sessionData || !sessionData.flashcards) return [];
        
        return sessionData.flashcards[deckId] || [];
    }

    /**
     * Méthodes spécifiques pour sauvegarder différents types de données
     */
    static saveDecks(decks) {
        const sessionData = this.getCurrentSessionData() || {};
        sessionData.decks = decks;
        this.saveCurrentSessionData(sessionData);
    }

    static saveThemes(themes) {
        const sessionData = this.getCurrentSessionData() || {};
        sessionData.themes = themes;
        this.saveCurrentSessionData(sessionData);
    }

    static saveFlashcards(deckId, flashcards) {
        const sessionData = this.getCurrentSessionData() || {};
        if (!sessionData.flashcards) {
            sessionData.flashcards = {};
        }
        sessionData.flashcards[deckId] = flashcards;
        this.saveCurrentSessionData(sessionData);
    }

    /**
     * Change la clé de session actuelle
     */
    static switchSession(sessionKey) {
        // Vérifier que la session existe
        const sessionData = localStorage.getItem(`session_${sessionKey}`);
        if (!sessionData) return false;
        
        localStorage.setItem('currentSessionKey', sessionKey);
        return true;
    }
}

// Si utilisé en dehors d'un module ES
if (typeof window !== 'undefined') {
    window.SessionManager = SessionManager;
}

// Pas d'export pour éviter les erreurs dans les navigateurs
// Nous utilisons déjà window.SessionManager au-dessus
