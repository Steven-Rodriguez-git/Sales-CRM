import { Prospect } from "@/app/types/Prospect";
import {
  ProspectValidationStatus,
  VALIDATION_STATUS,
} from "@/app/types/validationStatus";
import { useQuery } from "@tanstack/react-query";
import Timeout from "await-timeout";

async function validateIdentity(user: Prospect) {
  await Timeout.set(3_000);
  return user.document % 2 === 0
    ? VALIDATION_STATUS.SUCCESS
    : VALIDATION_STATUS.FAILED;
}

async function validateBackground(user: Prospect) {
  await Timeout.set(4_000);
  return user.document % 10 < 5
    ? VALIDATION_STATUS.SUCCESS
    : VALIDATION_STATUS.FAILED;
}

async function validateScore(
  identityValidation: VALIDATION_STATUS,
  backgroundValidation: VALIDATION_STATUS
) {
  if (
    identityValidation === VALIDATION_STATUS.FAILED ||
    backgroundValidation === VALIDATION_STATUS.FAILED
  ) {
    return VALIDATION_STATUS.FAILED;
  }
  await Timeout.set(5_000);
  return Math.random() < 0.5
    ? VALIDATION_STATUS.SUCCESS
    : VALIDATION_STATUS.FAILED;
}

function useIdentityValidation(user: Prospect, shouldValidate: boolean) {
  return useQuery({
    queryKey: ["userId", user.document],
    queryFn: () => validateIdentity(user),
    enabled: shouldValidate,
  });
}

function useBackgroundValidation(user: Prospect, shouldValidate: boolean) {
  return useQuery({
    queryKey: ["userIdBackground", user.document],
    queryFn: () => validateBackground(user),
    enabled: shouldValidate,
  });
}

function useScoreValidation(
  {
    user,
    identityValidation,
    backgroundValidation,
  }: {
    user: Prospect;
    identityValidation: VALIDATION_STATUS;
    backgroundValidation: VALIDATION_STATUS;
  },
  shouldValidate: boolean
) {
  return useQuery({
    queryKey: ["userIdScore", user.document],
    queryFn: () => validateScore(identityValidation, backgroundValidation),
    enabled: shouldValidate,
  });
}

export function useProspectValidation(
  user: Prospect,
  shouldValidate: boolean
): ProspectValidationStatus {
  const {
    data: identityValidationResult,
    isLoading: identityValidationLoading,
  } = useIdentityValidation(user, shouldValidate);

  const {
    data: backgroundValidationResult,
    isLoading: backgroundValidationLoading,
  } = useBackgroundValidation(user, shouldValidate);

  const { data: scoreValidationResult, isLoading: scoreValidationLoading } =
    useScoreValidation(
      {
        user,
        backgroundValidation:
          backgroundValidationResult ?? VALIDATION_STATUS.PENDING,
        identityValidation:
          identityValidationResult ?? VALIDATION_STATUS.PENDING,
      },
      shouldValidate &&
        !identityValidationLoading &&
        !backgroundValidationLoading
    );

  if (!shouldValidate) {
    return {
      backgroundValidation: VALIDATION_STATUS.PENDING,
      identityValidation: VALIDATION_STATUS.PENDING,
      scoreValidation: VALIDATION_STATUS.PENDING,
    };
  }

  return {
    identityValidation: identityValidationLoading
      ? VALIDATION_STATUS.PENDING
      : identityValidationResult ?? VALIDATION_STATUS.PENDING,
    backgroundValidation: backgroundValidationLoading
      ? VALIDATION_STATUS.PENDING
      : backgroundValidationResult ?? VALIDATION_STATUS.PENDING,
    scoreValidation: scoreValidationLoading
      ? VALIDATION_STATUS.PENDING
      : scoreValidationResult ?? VALIDATION_STATUS.PENDING,
  };
}
