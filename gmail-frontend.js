function buildAddOnCard(e) {
  var card = CardService.newCardBuilder().setHeader(
    CardService.newCardHeader().setTitle("AI Email Labeler")
  );

  // if no event data or meta data
  if (!e || !e.messageMetadata) {
    return card
      .addSection(
        CardService.newCardSection().addWidget(
          CardService.newTextParagraph().setText(
            "⚠️ Error: No email metadata found. Please open an email."
          )
        )
      )
      .build();
  }

  // if event data or meta data exists
  var messageId = e.messageMetadata.messageId;
  var classification = generateEmailLabel(messageId);

  return card
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph().setText(
            "Email Type: " + classification
          )
        )
        .addWidget(
          CardService.newTextButton()
            .setText("Apply Label")
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("applyLabel")
                .setParameters({ messageId: messageId, label: classification })
            )
        )
    )
    .build();
}

function generateEmailLabel(messageId) {
  if (!messageId) {
    Logger.log("Error: No messageId provided.");
    return "Labeling-Error";
  }

  var emailBody = GmailApp.getMessageById(messageId).getBody();
  return getEmailLabelFromAPI(emailBody);
}

function getEmailLabelFromAPI(emailBody) {
  var url = "https://www.rehabscienceyeg.com/api/email/classify-email/";

  var payload = { content: emailBody };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true, // Prevent script from crashing on error
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseContent = response.getContentText();

  if (response.getResponseCode() !== 200) {
    Logger.log("Error: " + responseContent);
    return "Labeling-Error";
  }

  var responseText = JSON.parse(responseContent);
  var classificationMessage = responseText.classification;
  return extractLabelFromClassification(classificationMessage);
}

function extractLabelFromClassification(classificationMessage) {
  if (!classificationMessage) { return "Classifying-Error"; }

  var labelMatch = classificationMessage.match(/label:\s*(.*)/i);

  if (labelMatch && labelMatch[1]) {
    return labelMatch[1].trim();
  } else {
    return "Unclassified";
  }
}

function applyLabel(e) {
  // right now, this applies labels to the entire thread based only on the most recent email
  var messageId = e.parameters.messageId;
  var labelName = e.parameters.label;

  var message = GmailApp.getMessageById(messageId);
  var thread = message.getThread();

  var label = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
  
  thread.addLabel(label);

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("AI Email Labeler"))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph().setText(
            "The label '" + labelName + "' has been successfully applied!"
          )
        )
        .addWidget(
          CardService.newTextButton()
            .setText("View Updated Thread")
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("viewThread")
                .setParameters({ threadId: thread.getId() })
            )
        )
    )
    .build();

  return [card];
}

function viewThread(e) {
  var threadId = e.parameters.threadId;
  var thread = GmailApp.getThreadById(threadId);
  var threadUrl = thread.getPermalink();

  return CardService.newActionResponseBuilder()
    .setOpenLink(CardService.newOpenLink()
      .setUrl(threadUrl)
    ).build();
}
