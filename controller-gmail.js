// gmail-controller.gs
function buildAddOnCard(e) {
  var card = showCardWithAppTitle();
  if (!e || !e.messageMetadata) {
    return showNoEmailData(card);
  }

  var messageId = e.messageMetadata.messageId;
  var label = getLabel(messageId);

  card = showApplyLabel(card, label, messageId);

  card = showDeleteLabelsButton(card, messageId);

  return card.build();
}

function applyLabel(e) {
  var messageId = e.parameters.messageId;
  var labelName = e.parameters.label;
  addLabelToEmailThread(messageId, labelName);

  return showApplyLabelSuccess(labelName);
}

function buildHomePage(e) {
  var card = showCardWithAppTitle();

  return showBulkLabel(card);
}

function bulkLabelEmails(e) {
  var threads = GmailApp.search("in:inbox", 0, 3);
  bulkAddLabelToEmailThread(threads);
  return showApplyBulkLabelSuccess(threads.length);
}
