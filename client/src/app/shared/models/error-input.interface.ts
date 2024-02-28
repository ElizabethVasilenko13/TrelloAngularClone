export const DEFAULT_ERROR_MESSAGES: Record<string, string> = {
  required: `The {{controlName}} is required.`,
  minlength: `The {{controlName}} is too short. Min length - {{requiredLength}}`,
  maxlength: `The {{controlName}} is too long. Max length - {{requiredLength}}`,
  email: `The {{controlName}} is invalid`,
  password: `Your password isn't strong enough (at least 1 capital letter, at least 1 digit and at least 1 special symbol)`,
  name: `Your name is invalid allowed only letters or spaces`,
  pattern: `The {{controlName}} is invalid`
};
