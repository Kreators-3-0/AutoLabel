class TextButton {
    constructor() {
        this.button = CardService.newTextButton();
    }

    setText() {
        return this.button.setText(label);
    }
}