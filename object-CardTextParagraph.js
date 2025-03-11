// object-CardTextParagraph.js

/**
 * Wrapper class for creating and managing Google Apps Script card text paragraphs.
 */
class CardTextParagraph {
    constructor() {
        this.card = CardService.newTextParagraph();
    }

    setText(text) {
        return this.card.setText(text);
    }
}