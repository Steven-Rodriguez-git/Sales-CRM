"use client";

import {
  ProspectValidationStatus,
  VALIDATION_STATUS,
} from "@/types/validationStatus";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import PendingIcon from "@/components/atoms/icons/PendingIcon";
import CheckMarkIcon from "@/components/atoms/icons/CheckMarkIcon";
import ErrorIcon from "@/components/atoms/icons/ErrorIcon";
import { Prospect } from "@/types/Prospect";

import { Tooltip } from "react-tooltip";
import Button from "../atoms/Button";

export type CardProps = Prospect &
  ProspectValidationStatus & {
    isAlreadyValidated: boolean;
    onButtonClick: (x: void) => void;
  };

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
          <Button
          text="Validate Lead"
            onClick={() => onButtonClick()}
            disabled={isAlreadyValidated}
          />
        )}
      </PipelinesContainer>
      <BackgroundTooltipComponent />
      <IdentityTooltipComponent />
      <ScoreTooltipComponent />
    </CardSurface>
  );
}

const CardSurface = styled.div`
  padding: 32px;
  border-radius: 16px;
  background: white;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px; 
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.35);
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
  font-size: 1.2 rem;
  line-height: 1.5rem;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 12px;
  color: #4b5563;
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