class TextButton {
    constructor() {
        this.button = CardService.newTextButton();
    }

    setText(label) {
        return this.button.setText(label);
    }
}