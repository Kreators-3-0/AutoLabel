// api.gs

/**
 * Sends an email body to an external API for classification and retrieves the corresponding label.
 *
 * Note: The responseTextClassification needs to be further processed.
 * 
 * @param {string} emailBody - The content of the email to be analyzed.
 * @returns {string} The classification text response returned by the API, or an error label if the request fails.
 */
function getEmailLabelFromAPI(emailBody) {
  var payload = { content: emailBody };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(EMAIL_LABEL_API_URL, options);
  var responseContent = response.getContentText();

  if (response.getResponseCode() !== 200) {
    Logger.log("Error: " + responseContent);
    return ERROR_LABEL;
  }

  var responseText = JSON.parse(responseContent);
  var responseTextClassification = responseText.classification;

  return responseTextClassification;
}
