const APP_TITLE = "AI Email Labeler";
const APPLY_LABEL = "Apply Label";
const PROPOSED_LABEL = "Proposed Label: ";

function getLabelSuccessText(labelName){
  return "The label '" + labelName + "' has been successfully applied!\n" +
  "It may take a minute until the new label is shown on Gmail."
}