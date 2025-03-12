// object-CardSection.js

/**
 * Wrapper class for creating and managing Google Apps Script card sections.
 */
class CardSection {
    constructor() {
        this.card = CardService.newCardSection();
    }

    addWidget(widget) {
        return this.card.addWidget(widget);
    }
}