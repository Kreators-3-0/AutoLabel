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
