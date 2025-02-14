export enum VALIDATION_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface ProspectValidationStatus {
  backgroundValidation: VALIDATION_STATUS;
  identityValidation: VALIDATION_STATUS;
  scoreValidation: VALIDATION_STATUS;
}
