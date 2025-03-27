// Charger les flashcards au démarrage
document.addEventListener('DOMContentLoaded', loadFlashcards);

function addFlashcard() {
    const question = document.getElementById('question').value;
    const reponse = document.getElementById('reponse').value;

    if (question && reponse) {
        createFlashcardElement(question, reponse);
        saveFlashcard(question, reponse);
        // Réinitialiser les champs
        document.getElementById('question').value = '';
        document.getElementById('reponse').value = '';
    }
}

function createFlashcardElement(question, reponse) {
    const flashcard = document.createElement('div');
    flashcard.className = 'flashcard';
    flashcard.innerHTML = `
        <div class="front">${question}</div>
        <div class="back" style="display: none;">${reponse}</div>
        <div class="delete" onclick="deleteFlashcard(this)">✖</div>
    `;

    flashcard.addEventListener('click', function() {
        const front = this.querySelector('.front');
        const back = this.querySelector('.back');
        front.style.display = front.style.display === 'none' ? 'block' : 'none';
        back.style.display = back.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('flashcards-container').appendChild(flashcard);
}