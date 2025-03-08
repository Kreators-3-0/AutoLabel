// gmail-frontend.gs
function showCardWithAppTitle() {
  return CardService.newCardBuilder().setHeader(
    CardService.newCardHeader().setTitle(APP_TITLE)
  );
}

function showNoEmailData(card) {
  return card
      .addSection(
        CardService.newCardSection().addWidget(
          CardService.newTextParagraph().setText(ERROR_NO_EMAIL_METADATA)
        )
      )
      .build();
}

function showApplyLabel(card, classification, messageId) {
  return card
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph().setText(
            PROPOSED_LABEL + classification
          )
        )
        .addWidget(
          CardService.newTextButton()
            .setText(APPLY_LABEL)
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("applyLabel")
                .setParameters({ messageId: messageId, label: classification })
            )
        )
    ).build();
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
    )
    .build();
}

function showBulkLabel(card) {
  card.addSection(
  CardService.newCardSection()
    .addWidget(
      CardService.newTextParagraph().setText(
        "Click the button below to label your inbox emails in bulk!"
      )
    )
    .addWidget(
      CardService.newTextButton()
        .setText("Label My Emails")
        .setOnClickAction(
          CardService.newAction()
            .setFunctionName("bulkLabelEmails") 
        )
    )
  );
  return card.build();
}

function showApplyBulkLabelSuccess(count) {
    return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle(APP_TITLE))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph()
            .setText(
              "Labeled " + count + " thread(s)."
            )
        )
    )
    .build();
}