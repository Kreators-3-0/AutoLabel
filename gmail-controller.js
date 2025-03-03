function buildAddOnCard(e) {
  var card = showCardWithAppTitle();

  if (!e || !e.messageMetadata) { return showNoEmailData(card); }

  var messageId = e.messageMetadata.messageId;
  var label = getLabel(messageId);

  return showApplyLabel(card, label, messageId);
}

function applyLabel(e) {
  var messageId = e.parameters.messageId;
  var labelName = e.parameters.label;

  addLabelToEmailThread(messageId, labelName);

  return showApplyLabelSuccess(labelName);
}