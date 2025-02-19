import styled from "styled-components";

type ValidateButtonProps = {
    text: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  disabled = false,
}: ValidateButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
}


const StyledButton = styled.button`
  padding: 14px 16px;
  border-radius: 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled }) => (disabled ? "#ccc" : "#3c6af0")};
  color: white;
  font-weight: 530;
  font-size: 1rem;
  box-shadow: 0px 3px 6px rgba(16, 16, 16, 0.2);
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#2b59e5")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0px 5px 10px rgba(16, 16, 16, 0.25)"};
  }

  &:active {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0px 2px 6px rgba(16, 16, 16, 0.3)"};
  }
`;
