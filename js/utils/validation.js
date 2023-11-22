function isEmailValid(email) {
  const emailPattern = /\S+@\S+\.\S+/;
  return emailPattern.test(email);
}

function isLengthValid(string, length) {
  const stringLength = string.trim().length;
  return stringLength >= length;
}

export function validateInput(inputElement) {
  switch (inputElement.name) {
    case "name":
      return isLengthValid(inputElement.value, 1);
    case "email":
      return isEmailValid(inputElement.value);
    case "subject":
      return isLengthValid(inputElement.value, 10);
    case "message":
      return isLengthValid(inputElement.value, 25);
    default:
      return false;
  }
}
