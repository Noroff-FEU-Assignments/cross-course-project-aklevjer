function isEmailValid(email) {
  const emailPattern = /\S+@\S+\.\S+/;
  return emailPattern.test(email);
}

function isExpiryDateValid(expiryDate) {
  const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return expiryDatePattern.test(expiryDate);
}

function isCreditCardNumberValid(creditCardNumber) {
  const creditCardPattern = /^(?:\d{4} ?){3}\d{4}$/;
  return creditCardPattern.test(creditCardNumber);
}

function isLengthValid(string, length) {
  const strLength = string.trim().length;
  return strLength >= length;
}

function containsOnlyNumbers(string) {
  const numberPattern = /^\d+$/;
  return numberPattern.test(string);
}

export function validateInput(inputElement) {
  switch (inputElement.name) {
    case "name":
    case "firstname":
    case "lastname":
    case "city":
      return isLengthValid(inputElement.value, 2);
    case "cvv":
      return isLengthValid(inputElement.value, 3) && containsOnlyNumbers(inputElement.value);
    case "postcode":
      return isLengthValid(inputElement.value, 4) && containsOnlyNumbers(inputElement.value);
    case "country":
      return isLengthValid(inputElement.value, 4);
    case "streetaddress":
      return isLengthValid(inputElement.value, 5);
    case "subject":
      return isLengthValid(inputElement.value, 10);
    case "message":
      return isLengthValid(inputElement.value, 25);
    case "email":
      return isEmailValid(inputElement.value);
    case "creditcardnumber":
      return isCreditCardNumberValid(inputElement.value);
    case "expdate":
      return isExpiryDateValid(inputElement.value);
    default:
      return false;
  }
}
