// api.gs
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
  return responseText.classification;
}