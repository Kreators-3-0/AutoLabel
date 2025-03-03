function generateEmailLabel(messageId) {
  if (!messageId) {
    Logger.log(ERROR_NO_MESSAGE_ID);
    return ERROR_LABEL;
  }

  var emailBody = GmailApp.getMessageById(messageId).getBody();
  return getEmailLabelFromAPI(emailBody);
}

function extractLabelFromClassification(classificationMessage) {
  if (!classificationMessage) { return ERROR_LABEL; }

  var labelMatch = classificationMessage.match(/label:\s*(.*)/i);

  if (labelMatch && labelMatch[1]) { return labelMatch[1].trim(); } 
  else { return ERROR_LABEL; }
}

function getLabel(messageId) {
  var classificationMessage = generateEmailLabel(messageId);
  return extractLabelFromClassification(classificationMessage);
}

function getThread(messageId) {
  var message = GmailApp.getMessageById(messageId);
  return message.getThread();
}

function addLabelToEmailThread(messageId, labelName) {
  var label = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
  var thread = getThread(messageId);
  thread.addLabel(label);
}