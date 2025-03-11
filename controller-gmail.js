// gmail-controller.gs

/**
 * Builds the main Gmail add-on card for individual email screen.
 * 
 * @param {GoogleAppsScript.Addons.EventObject} e - The event object containing metadata. 
 * @returns {GoogleAppsScript.Card.Card} The constructed card for the individual email screen.
 */
function buildAddOnCard(e) {
  var card = new Card();
  card = showCardWithAppTitle(card);

  if (!e || !e.messageMetadata) {
    return showNoEmailDataMessage(card).build();
  }

  var messageId = e.messageMetadata.messageId;
  var label = getLabelByMessageId(messageId);

  card = showApplyLabelButton(card, label, messageId);
  card = showDeleteLabelsButton(card, messageId);

  return card.build();
}

/**
 * Builds the main Gmail add-on card for the home screen.
 * 
 * @param {GoogleAppsScript.Addons.EventObject} e - The event object containing metadata. 
 * @returns {GoogleAppsScript.Card.Card} The constructed card for the home page.
 */
function buildHomePage(e) {
  var card = new Card();
  card = showCardWithAppTitle(card);
  card = showBulkLabelButton(card);

  return card.build();
}

/**
 * Apply a label to an email thread.
 * 
 * @param {GoogleAppsScript.Addons.EventObject} e - The event object containing metadata. 
 * @returns {GoogleAppsScript.Card.Card} The constructed card for showing a success message for applying a label to a thread.
 */
function labelEmail(e) {
  var messageId = e.parameters.messageId;
  var labelName = e.parameters.label;
  addLabelToEmailThreadByMessageId(messageId, labelName);

  return showApplyLabelSuccessMessage(labelName).build();
}

/**
 * Bulk apply labels to email threads.
 * 
 * @param {GoogleAppsScript.Addons.EventObject} e - The event object containing metadata. 
 * @returns {GoogleAppsScript.Card.Card} The constructed card for showing a success message for applying labels to threads.
 */
function bulkLabelEmails(e) {
  var threads = GmailApp.search("in:inbox", 0, 3);
  bulkAddLabelsToEmailThreads(threads);
  return showApplyBulkLabelSuccessMessage(threads.length).build();
}
