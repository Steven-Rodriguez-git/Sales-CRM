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
  padding: 24px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  margin: 8px 0px;
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
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 12px;
`;

const Text = styled.p`
  font-size: 0.875rem;
  line-height: 1rem;
  margin-bottom: 8px;
  margin-top: 0;
`;

const ValidateButton = styled.button`
  padding: 16px 12px;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  background: #03045e;
  box-shadow: 0px 1px 1px 1px rgba(16, 16, 16, 0.2);
  border: 0.5px;
  color: white;
  &:active {
    box-shadow: 0px 1px 1px 2px rgba(16, 16, 16, 0.2);
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
    fill="#6A9955"
    data-tooltip-id={tooltipId}
    style={{ outline: "none !important" }}
  />
);

const ErrorElement = ({ tooltipId }: { tooltipId: string }) => (
  <StyledErrorIcon fill="#B80F0A" data-tooltip-id={tooltipId} className="" />
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
