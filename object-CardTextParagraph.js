class CardTextParagraph {
    constructor() {
        this.card = CardService.newTextParagraph();
    }

    setText(text) {
        return this.card.setText(text);
    }
}