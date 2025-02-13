"use client";

import {
  ProspectValidationStatus,
  VALIDATION_STATUS,
} from "@/app/types/validationStatus";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import PendingIcon from "../icons/PendingIcon";
import CheckMarkIcon from "../icons/CheckMarkIcon";
import ErrorIcon from "../icons/ErrorIcon";
import { Prospect } from "@/app/types/Prospect";


import ReactTooltip, { Tooltip } from "react-tooltip";

export type CardProps = Prospect &
  ProspectValidationStatus & {
    isAlreadyValidated: boolean;
    onButtonClick: (x: void) => void;
  };

const CardSurface = styled.div`
  padding: 32px;
  border-radius: 16px;
  background: white;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const InfoContainer = styled.div`
  flex: 1 0 auto;
`;

const PipelinesContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1,2 rem;
  line-height: 1.5rem;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 12px;
  color: #4b5563;
`;

const ValidateButton = styled.button`
  padding: 14px 16px;
  border-radius: 10px;
  cursor: pointer;
  background: #3c6af0;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0px 2px 4px rgba(16, 16, 16, 0.2);
  border: none;
  transition: all 0.2s ease;

  &:hover {
    background: #2b59e5;
    box-shadow: 0px 4px 8px rgba(16, 16, 16, 0.25);
  }

  &:active {
    box-shadow: 0px 2px 6px rgba(16, 16, 16, 0.3);
  }
`;

const StyledErrorIcon = styled(ErrorIcon)`
  outline: none;
`;

const StyledPendingIcon = styled(PendingIcon)`
  outline: none;
`;

const StyledCheckMarkIcon = styled(CheckMarkIcon)`
  outline: none;
`;

const PendingElement = ({ tooltipId }: { tooltipId: string }) => (
  <StyledPendingIcon
    fill="#666666"
    data-tooltip-id={tooltipId}
    style={{ outline: "none !important" }}
  />
);

const CheckMarkElement = ({ tooltipId }: { tooltipId: string }) => (
  <StyledCheckMarkIcon
    fill="#01af02"
    data-tooltip-id={tooltipId}
    style={{ outline: "none !important" }}
  />
);

const ErrorElement = ({ tooltipId }: { tooltipId: string }) => (
  <StyledErrorIcon fill="#DB0000" data-tooltip-id={tooltipId} className="" />
);

function getComponentFromStatus(status: VALIDATION_STATUS, tooltipId: string) {
  switch (status) {
    case VALIDATION_STATUS.PENDING:
      return <PendingElement tooltipId={tooltipId} />;
    case VALIDATION_STATUS.SUCCESS:
      return <CheckMarkElement tooltipId={tooltipId} />;
    case VALIDATION_STATUS.FAILED:
      return <ErrorElement tooltipId={tooltipId} />;
  }
}

export default function Card({
  name,
  email,
  document,
  phone,
  backgroundValidation,
  identityValidation,
  scoreValidation,
  isAlreadyValidated,
  onButtonClick,
}: CardProps) {
  const BackgroundValidationComponent = useMemo(
    () =>
      getComponentFromStatus(
        backgroundValidation,
        `background-tooltip-${backgroundValidation}`
      ),
    [backgroundValidation]
  );
  const IdentityValidationComponent = useMemo(
    () =>
      getComponentFromStatus(
        identityValidation,
        `identity-tooltip-${identityValidation}`
      ),
    [identityValidation]
  );
  const ScoreValidationComponent = useMemo(
    () =>
      getComponentFromStatus(
        scoreValidation,
        `score-tooltip-${scoreValidation}`
      ),
    [scoreValidation]
  );

  const BackgroundTooltipComponent = useCallback(
    function renderTooltip() {
      return (
        <Tooltip
          id={`background-tooltip-${backgroundValidation}`}
          content={`Background validation: ${backgroundValidation}`}
        />
      );
    },
    [backgroundValidation]
  );

  const IdentityTooltipComponent = useCallback(
    function renderTooltip() {
      return (
        <Tooltip
          id={`identity-tooltip-${identityValidation}`}
          content={`Identity validation: ${identityValidation}`}
        />
      );
    },
    [identityValidation]
  );

  const ScoreTooltipComponent = useCallback(
    function renderTooltip() {
      return (
        <Tooltip
          id={`score-tooltip-${scoreValidation}`}
          content={`Score validation: ${scoreValidation}`}
        />
      );
    },
    [scoreValidation]
  );

  return (
    <CardSurface>
      <InfoContainer>
        <Title>{name}</Title>
        <Text>{email}</Text>
        <Text>{document}</Text>
        <Text>{phone}</Text>
      </InfoContainer>
      <PipelinesContainer>
        {isAlreadyValidated && (
          <>
            {BackgroundValidationComponent}
            {IdentityValidationComponent}
            {ScoreValidationComponent}
          </>
        )}
        {!isAlreadyValidated && (
          <ValidateButton onClick={() => onButtonClick()}>
            Validate lead
          </ValidateButton>
        )}
      </PipelinesContainer>
      <BackgroundTooltipComponent />
      <IdentityTooltipComponent />
      <ScoreTooltipComponent />
    </CardSurface>
  );
}
