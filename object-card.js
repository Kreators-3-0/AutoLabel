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