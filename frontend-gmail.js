// gmail-frontend.gs

/**
 * Sets the app title in the card header.
 *
 * @param {Card} card - The card object to set the header on.
 * @returns {Card} The updated card with the header set.
 */
function showCardWithAppTitle(card) {
  var cardHeader = new CardHeader();

  return card.setHeader(cardHeader.setTitle(APP_TITLE));
}

/**
 * Displays a message when no email metadata is available.
 *
 * @param {Card} card - The card object to update.
 * @returns {Card} The updated card with an error message.
 */
function showNoEmailDataMessage(card) {
  var cardSection = new CardSection();
  var cardTextParagraph = new CardTextParagraph();

  return card
      .addSection(
        cardSection.addWidget(
          cardTextParagraph.setText(ERROR_NO_EMAIL_METADATA)
        )
      );
}

/**
 * Adds a button to apply a label to an email.
 *
 * @param {Card} card - The card object to update.
 * @param {string} classification - The classification label to apply.
 * @param {string} messageId - The ID of the email message.
 * @returns {Card} The updated card with an apply label button.
 */
function showApplyLabelButton(card, classification, messageId) {

  var cardSection = new CardSection();
  var proposedLabelCard = new CardTextParagraph();
  var textButton = new TextButton();
  
  return card
    .addSection(
      cardSection
        .addWidget(
          proposedLabelCard.setText(
            PROPOSED_LABEL + classification
          )
        )
        .addWidget(
          textButton
            .setText(APPLY_LABEL)
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("labelEmail")
                .setParameters(
                  { 
                    messageId: messageId, label: classification 
                  }
                )
            )
        )
    );
}

/**
 * Adds a button to delete all labels from an email thread.
 *
 * @param {Card} card - The card object to update.
 * @param {string} messageId - The ID of the email message.
 * @returns {Card} The updated card with a delete labels button.
 */
function showDeleteLabelsButton(card, messageId) {
  return card
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph().setText(
            "Delete all labels for this thread"
          )
        )
        .addWidget(
          CardService.newTextButton()
            .setText("Delete labels")
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("deleteAllLabelsFromThread")
                .setParameters({ messageId: messageId})
            )
        )
    )
}

/**
 * Displays a success message after applying a label.
 *
 * @param {string} labelName - The name of the label that was applied.
 * @returns {GoogleAppsScript.Card.Card} The card displaying the success message.
 */
function showApplyLabelSuccessMessage(labelName) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle(APP_TITLE))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph().setText(
            getLabelSuccessText(labelName)
          )
        )
    );
}

/**
 * Adds a button for bulk labeling of emails.
 *
 * @param {Card} card - The card object to update.
 * @returns {Card} The updated card with a bulk label button.
 */
function showBulkLabelButton(card) {
  var cardSection = new CardSection();
  var cardTextParagraph = new CardTextParagraph();
  var textButton = new TextButton();

  card.addSection(
    cardSection
      .addWidget(
        cardTextParagraph.setText(
          "Click the button below to label your inbox emails in bulk!"
        )
      )
      .addWidget(
        textButton
          .setText("Label My Emails")
          .setOnClickAction(
            CardService.newAction()
              .setFunctionName("bulkLabelEmails") 
          )
      )
  );
  return card;
}

/**
 * Displays a success message after applying labels to multiple email threads.
 *
 * @param {number} count - The number of threads labeled.
 * @returns {GoogleAppsScript.Card.Card} The card displaying the success message.
 */
function showApplyBulkLabelSuccessMessage(count) {
  var cardHeader = new CardHeader();
  var cardTextParagraph = new CardTextParagraph();
  var cardSection = new CardSection();

    return CardService.newCardBuilder()
      .setHeader(cardHeader.setTitle(APP_TITLE))
      .addSection(
        cardSection
          .addWidget(
            cardTextParagraph
              .setText(
                "Labeled " + count + " thread(s)."
              )
          )
      );
}