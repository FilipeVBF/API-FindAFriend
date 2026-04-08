export class MissingRequiredFieldError extends Error {
  constructor() {
    super("Missing required fields.");
  }
}
