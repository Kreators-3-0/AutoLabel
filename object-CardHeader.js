// object-CardHeader.js
class CardHeader {
    constructor() {
        this.cardHeader = CardService.newCardHeader();
    }

    setTitle(cardHeaderTitle) {
        return this.cardHeader.setTitle(cardHeaderTitle);
    }
}