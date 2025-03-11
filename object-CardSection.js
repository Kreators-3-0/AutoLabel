// object-CardSection.js
class CardSection {
    constructor() {
        this.card = CardService.newCardSection();
    }

    addWidget(widget) {
        return this.card.addWidget(widget);
    }
}