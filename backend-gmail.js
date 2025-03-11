// gmail-backend.gs

/**
 * Generates an email label by analyzing the email body.
 *
 * @param {string} messageId - The ID of the email message.
 * @returns {string} The generated email label, or an error label if the message ID is invalid.
 */
function generateEmailLabel(messageId) {
  if (!messageId) {
    Logger.log(ERROR_NO_MESSAGE_ID);
    return ERROR_LABEL;
  }

  var emailBody = getEmailBodyByMessageId(messageId);
  return getEmailLabelFromAPI(emailBody);
}

/**
 * Retrieves the email body using the message ID.
 *
 * @param {string} messageId - The ID of the email message.
 * @returns {string} The body of the email as a string.
 */
function getEmailBodyByMessageId(messageId) {
  return GmailApp.getMessageById(messageId).getBody();
}

/**
 * Extracts a label from a classification message.
 *
 * @param {string} classificationMessage - The classification message containing the label from the API response.
 * @returns {string} The extracted label, or an error label if no valid label is found.
 */
function extractLabelFromClassification(classificationMessage) {
  if (!classificationMessage) { return ERROR_LABEL; }

  var labelMatch = classificationMessage.match(/label:\s*(.*)/i);

  if (labelMatch && labelMatch[1]) { return labelMatch[1].trim(); } 
  else { return ERROR_LABEL; }
}

/**
 * Retrieves the label for a given email message ID.
 *
 * @param {string} messageId - The ID of the email message.
 * @returns {string} The extracted label, or an error label if classification fails.
 */
function getLabelByMessageId(messageId) {
  var classificationMessage = generateEmailLabel(messageId);
  return extractLabelFromClassification(classificationMessage);
}

/**
 * Retrieves the email thread associated with a given message ID.
 *
 * @param {string} messageId - The ID of the email message.
 * @returns {GoogleAppsScript.Gmail.GmailThread} The email thread containing the message.
 */
function getThreadByMessageId(messageId) {
  var message = GmailApp.getMessageById(messageId);
  return message.getThread();
}

/**
 * Adds a label to an email thread based on the message ID.
 *
 * @param {string} messageId - The ID of the email message.
 * @param {string} labelName - The name of the label to be applied.
 */
function addLabelToEmailThreadByMessageId(messageId, labelName) {
  var label = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
  var thread = getThreadByMessageId(messageId);
  thread.addLabel(label);
}

/**
 * Adds labels to multiple email threads based on their latest message.
 *
 * @param {GoogleAppsScript.Gmail.GmailThread[]} threads - Array of Gmail threads.
 */
function bulkAddLabelsToEmailThreads(threads) {
  threads.forEach(thread => {
    var messages = thread.getMessages();
    var lastMessage = messages.slice(-1)[0];
    var labelName = getLabelByMessageId(lastMessage.getId());

    var labelObj = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);

    thread.addLabel(labelObj);
  });
}

/**
 * Deletes all labels from an email thread based on the message ID.
 *
 * @param {GoogleAppsScript.Addons.EventObject} e - The event object containing the message ID.
 */
function deleteAllLabelsFromThread(e) {
  var messageId = e.parameters.messageId;
  var thread = getThreadByMessageId(messageId);
  var labels = thread.getLabels();

  labels.forEach(label => {
    thread.removeLabel(label);
  })
}