// gmail-controller.gs

/**
 * Builds the main Gmail add-on card for individual email screen.
 * 
 * @param {GoogleAppsScript.Addons.EventObject} e - The event object containing metadata. 
 * @returns {GoogleAppsScript.Card.Card} The constructed card for the individual email screen.
 */
function buildIndividualEmailCard(e) {
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


