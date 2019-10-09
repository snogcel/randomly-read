export const checkMaxLength = (value, len) =>
  value && value.length <= len
    ? undefined
    : `must be less than ${len} characters`;

export const checkMinLength = (value, len) =>
  value && value.length >= len
    ? undefined
    : `must be more than ${len} characters`;

export const checkValidChars = value =>
  /^[a-zA-Z0-9_-]+$/.test(value) ? undefined : 'contains invalid characters';

export const checkValidAddressChars = value =>
  /^[a-zA-Z0-9_ .#-]+$/.test(value) ? undefined : 'contains invalid characters';

export const checkValidEmailChars = value =>
  /^[a-zA-Z0-9_ .@]+$/.test(value) ? undefined : 'contains invalid characters';

export const checkIfTrimmed = value =>
  value.trim() === value ? undefined : 'cannot start or end with whitespace';

export const validUrl = value => {
  try {
    new URL(value);
    return undefined;
  } catch (error) {
    return 'must be a valid url';
  }
};

const max = len => value => checkMaxLength(value, len);
const min = len => value => checkMinLength(value, len);
const validChars = value => checkValidChars(value);
const validAddressChars = value => checkValidAddressChars(value);
const validEmailChars = value => checkValidEmailChars(value);
const trimmed = value => checkIfTrimmed(value);

export const required = value => (value ? undefined : 'required');
export const postType = value =>
  value === 'link' || value === 'text'
    ? undefined
    : 'must be link or text post';
export const usernameValidator = [required, max(32), validChars, trimmed];
export const passwordValidator = [required, min(8), max(72)];

export const firstNameValidator = [required, max(32), validChars, trimmed];
export const lastNameValidator = [required, max(32), validChars, trimmed];
export const emailValidator = [required, max(128), validEmailChars, trimmed];
export const addressValidator = [required, max(128), validAddressChars, trimmed];
export const cityValidator = [required, max(128), validAddressChars, trimmed];
export const stateProvinceValidator = [required, max(64), validChars, trimmed];
export const postalCodeValidator = [required, max(16), validChars, trimmed];
export const countryValidator = [required, max(32), validAddressChars, trimmed];
export const genderValidator = [required, max(8), validChars, trimmed];
export const ageValidator = [required, max(2), validChars, trimmed];

export const titleValidator = value =>
  required(value) || checkMaxLength(value, 100);
export const textPostValidator = value =>
  required(value) || checkMinLength(value, 4);
export const urlValidator = value => required(value) || validUrl(value);
export const typeValidator = value => required(value) || postType(value);
