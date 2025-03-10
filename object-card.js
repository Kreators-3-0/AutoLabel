class Card {
    constructor() {
        this.card = CardService.newCardBuilder();
    }

    setHeader(cardHeader) {
        return this.card.setHeader(cardHeader);
    }

    build() {
        return this.card.build();
    }
}