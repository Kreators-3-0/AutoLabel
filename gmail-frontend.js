function buildAddOnCard(e) {
  if (!e || !e.messageMetadata) {
    return CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("AI Email Labeler"))
      .addSection(
        CardService.newCardSection()
          .addWidget(
            CardService.newTextParagraph()
              .setText("⚠️ Error: No email metadata found. Please open an email.")
          )
      )
      .build();
  }

  var messageId = e.messageMetadata.messageId;
  var classification = classifyEmail(messageId);

  var card = CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("AI Email Labeler"))
      .addSection(
          CardService.newCardSection()
              .addWidget(
                  CardService.newTextParagraph()
                      .setText("Email Type: " + classification)
              )
              .addWidget(
                  CardService.newTextButton()
                      .setText("Apply Label")
                      .setOnClickAction(
                          CardService.newAction()
                              .setFunctionName("applyLabel")
                              .setParameters({ "messageId": messageId, "label": classification })
                      )
              )
      )
      .build();
  return [card];
}

function classifyEmail(messageId) {
    var message = GmailApp.getMessageById(messageId);
    var body = message.getBody()

    var label = getEmailLabelFromAPI(body);

    return label;
}

function getEmailLabelFromAPI(body) {
  var url = "https://www.rehabscienceyeg.com/api/email/classify-email/";

  var payload = {
    "content": body
  };

  var options = {
    "method": "post", 
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true  // Prevent script from crashing on error
  };

  var response = UrlFetchApp.fetch(url, options);

  var statusCode = response.getResponseCode();
  if (statusCode !== 200) {
      console.log("Error: " + response.getContentText());
      return "Error";
  }

  var responseText = JSON.parse(response.getContentText());
  
  // Assuming responseText contains a 'classification' field, and we want to extract the label
  var classificationMessage = responseText.classification;

  // Process the classificationMessage to extract just the label name
  var label = extractLabelFromClassification(classificationMessage);
  return label;
}

function extractLabelFromClassification(classificationMessage) {
  
  var labelMatch = classificationMessage.match(/label:\s*(.*)/i);
  if (labelMatch && labelMatch[1]) {
    return labelMatch[1].trim(); 
  } else {
    return "Unclassified";  // Default label if the pattern doesn't match
  }
}

function applyLabel(e) {
  var messageId = e.parameters.messageId;
  var labelName = e.parameters.label;

  var message = GmailApp.getMessageById(messageId);
  var thread = message.getThread();

  // Apply the label to the thread
  var label = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
  thread.addLabel(label);

  // Create a new card with a "refresh" type message
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("AI Email Labeler"))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph()
            .setText("The label '" + labelName + "' has been successfully applied!")
        )
        .addWidget(
          CardService.newTextButton()
            .setText("View Updated Thread")
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("viewThread")
                .setParameters({ "threadId": thread.getId() })
            )
        )
    )
    .build();

  return [card];
}

function viewThread(e) {
  var threadId = e.parameters.threadId;
  var thread = GmailApp.getThreadById(threadId);

  // Navigate to the thread in Gmail
  return CardService.newNavigation().openLink(thread.getPermalink());
}

