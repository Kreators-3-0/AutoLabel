// gmail-backend.gs
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

function bulkAddLabelToEmailThread(threads) {
  threads.forEach(function(thread) {
    var count = thread.getMessageCount();
    var messageId = thread.getMessages()[count - 1].getId();
    var labelName = getLabel(messageId);

    var labelObj = GmailApp.getUserLabelByName(labelName);
    if (!labelObj) {
      labelObj = GmailApp.createLabel(labelName);
    }

    thread.addLabel(labelObj);
  });
}


//
function deleteLabelsFromThread(e) {
  var messageId = e.parameters.messageId;
  var thread = getThread(messageId);

  var labels = thread.getLabels();

  labels.forEach(function(label) {
    thread.removeLabel(label);
  })
}