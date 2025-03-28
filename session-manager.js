// Session Manager pour CDS FLASHCARD-BASE
// Gère la persistance des données avec clés de session

class SessionManager {
    static init() {
        console.log("Initialisation du SessionManager...");
        if (!this.getSessionKey()) {
            this.generateSessionKey();
        }
        return this;
    }

    static getSessionKey() {
        return localStorage.getItem('currentSessionKey') || this.generateSessionKey();
    }

    static generateSessionKey() {
        const key = Math.random().toString(36).substring(2, 10);
        localStorage.setItem('currentSessionKey', key);
        return key;
    }

    static setSessionKey(key) {
        localStorage.setItem('currentSessionKey', key);
    }

    static getPrefix() {
        return `session_${this.getSessionKey()}_`;
    }

    // Récupère les decks pour la session courante
    static getDecks() {
        const prefix = this.getPrefix();
        const decksKey = `${prefix}decks`;
        const decks = localStorage.getItem(decksKey);
        return decks ? JSON.parse(decks) : [];
    }

    // Sauvegarde les decks pour la session courante
    static saveDecks(decks) {
        const prefix = this.getPrefix();
        localStorage.setItem(`${prefix}decks`, JSON.stringify(decks));
    }

    // Récupère les thèmes pour la session courante
    static getThemes() {
        const prefix = this.getPrefix();
        const themesKey = `${prefix}themes`;
        const themes = localStorage.getItem(themesKey);
        return themes ? JSON.parse(themes) : [];
    }

    // Sauvegarde les thèmes pour la session courante
    static saveThemes(themes) {
        const prefix = this.getPrefix();
        localStorage.setItem(`${prefix}themes`, JSON.stringify(themes));
    }

    // Récupère les flashcards d'un deck pour la session courante
    static getFlashcards(deckId) {
        const prefix = this.getPrefix();
        const flashcardsKey = `${prefix}flashcards_${deckId}`;
        const flashcards = localStorage.getItem(flashcardsKey);
        return flashcards ? JSON.parse(flashcards) : [];
    }

    // Sauvegarde les flashcards d'un deck pour la session courante
    static saveFlashcards(deckId, flashcards) {
        const prefix = this.getPrefix();
        localStorage.setItem(`${prefix}flashcards_${deckId}`, JSON.stringify(flashcards));
    }

    // Exporte toutes les données en JSON
    static exportData() {
        const prefix = this.getPrefix();
        const data = {};

        // Collecter toutes les clés de session
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(prefix)) {
                const shortKey = key.replace(prefix, '');
                data[shortKey] = JSON.parse(localStorage.getItem(key));
            }
        });

        return JSON.stringify(data);
    }

    // Importe les données à partir d'un JSON
    static importData(jsonData) {
        const prefix = this.getPrefix();
        const data = JSON.parse(jsonData);

        Object.keys(data).forEach(key => {
            localStorage.setItem(`${prefix}${key}`, JSON.stringify(data[key]));
        });
    }
}

// Initialiser le SessionManager
window.SessionManager = SessionManager.init();