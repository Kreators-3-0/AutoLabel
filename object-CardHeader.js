// object-CardHeader.js

/**
 * Wrapper class for creating and managing Google Apps Script card headers.
 */
class CardHeader {
    constructor() {
        this.cardHeader = CardService.newCardHeader();
    }

    setTitle(cardHeaderTitle) {
        return this.cardHeader.setTitle(cardHeaderTitle);
    }
}