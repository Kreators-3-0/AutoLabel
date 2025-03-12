// object-Card.js
/**
 * Wrapper class for creating and managing Google Apps Script cards.
 */
class Card {
    constructor() {
        this.card = CardService.newCardBuilder();
    }

    setHeader(cardHeader) {
        return this.card.setHeader(cardHeader);
    }

    addSection(cardSection) {
        return this.card.addSection(cardSection);
    }

    build() {
        return this.card.build();
    }
}