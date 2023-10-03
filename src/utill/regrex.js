export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])[A-Za-z\d!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/]{6,}$/;

export const noSpecialCharsNoWhitespaceStartEndRegex =
  /^(?!\s)(?!.*\s{2})[a-zA-Z0-9\s]*\w$/;
