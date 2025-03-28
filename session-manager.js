
// Gestionnaire de session pour stocker et récupérer des données par clé de session
class SessionManager {
    static getCurrentSessionKey() {
        return localStorage.getItem('currentSessionKey') || this.createNewSession();
    }

    static createNewSession() {
        // Génère une clé aléatoire de 16 caractères
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // Initialiser les données pour cette clé
        const sessionData = {
            decks: [],
            themes: [],
            lastAccess: new Date().toISOString()
        };
        
        // Stocker les données dans localStorage
        localStorage.setItem('currentSessionKey', key);
        this.storeSessionData(key, sessionData);
        
        return key;
    }

    static getSessionData(key = null) {
        const sessionKey = key || this.getCurrentSessionKey();
        const data = localStorage.getItem(`session_${sessionKey}`);
        return data ? JSON.parse(data) : null;
    }

    static storeSessionData(key, data) {
        const sessionKey = key || this.getCurrentSessionKey();
        localStorage.setItem(`session_${sessionKey}`, JSON.stringify(data));
    }

    static getDecks() {
        const sessionData = this.getSessionData();
        return sessionData?.decks || [];
    }

    static getThemes() {
        const sessionData = this.getSessionData();
        return sessionData?.themes || [];
    }

    static saveDecks(decks) {
        const sessionKey = this.getCurrentSessionKey();
        const sessionData = this.getSessionData(sessionKey) || {};
        sessionData.decks = decks;
        sessionData.lastAccess = new Date().toISOString();
        this.storeSessionData(sessionKey, sessionData);
    }

    static saveThemes(themes) {
        const sessionKey = this.getCurrentSessionKey();
        const sessionData = this.getSessionData(sessionKey) || {};
        sessionData.themes = themes;
        sessionData.lastAccess = new Date().toISOString();
        this.storeSessionData(sessionKey, sessionData);
    }

    static getFlashcards(deckId) {
        const sessionKey = this.getCurrentSessionKey();
        return JSON.parse(localStorage.getItem(`session_${sessionKey}_flashcards_${deckId}`) || '[]');
    }

    static saveFlashcards(deckId, flashcards) {
        const sessionKey = this.getCurrentSessionKey();
        localStorage.setItem(`session_${sessionKey}_flashcards_${deckId}`, JSON.stringify(flashcards));
    }
}
