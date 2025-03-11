// gmail-frontend.gs
function showCardWithAppTitle(card) {
  var cardHeader = new CardHeader();

  return card.setHeader(cardHeader.setTitle(APP_TITLE));
}

function showNoEmailData(card) {
  var cardSection = new CardSection();
  var cardTextParagraph = new CardTextParagraph();

  return card
      .addSection(
        cardSection.addWidget(
          cardTextParagraph.setText(ERROR_NO_EMAIL_METADATA)
        )
      );
}

function showApplyLabel(card, classification, messageId) {

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
                .setFunctionName("applyLabel")
                .setParameters(
                  { 
                    messageId: messageId, label: classification 
                  }
                )
            )
        )
    );
}

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
                .setFunctionName("deleteLabelsFromThread")
                .setParameters({ messageId: messageId})
            )
        )
    )
}

function showApplyLabelSuccess(labelName) {
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

function showBulkLabel(card) {
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

function showApplyBulkLabelSuccess(count) {
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