export enum VALIDATION_STATUS {
  SUCCESS = "Sucess",
  PENDING = "Pending",
  FAILED = "Failed",
}

export interface ProspectValidationStatus {
  identityValidation: VALIDATION_STATUS;
  backgroundValidation: VALIDATION_STATUS;
  scoreValidation: VALIDATION_STATUS;
}
