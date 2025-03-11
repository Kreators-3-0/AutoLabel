// object-CardSection.js
class CardSection {
    constructor() {
        this.card = CardService.newCardSection();
    }

    addWidget(cardTextParagraph) {
        return this.card.addWidget(cardTextParagraph);
    }
}