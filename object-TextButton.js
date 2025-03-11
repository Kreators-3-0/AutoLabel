// object-TextButton.js

/**
 * Wrapper class for creating and managing Google Apps Script text buttons.
 */
class TextButton {
    constructor() {
        this.button = CardService.newTextButton();
    }

    setText(label) {
        return this.button.setText(label);
    }
}