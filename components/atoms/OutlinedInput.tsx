import styled from "styled-components";

const InputElement = styled.input`
  border: 0px;
  background: rgba(193, 195, 197, 0.1);
  border-radius: 4px 4px 0px 0px;
  border-bottom: 2px #666666 solid;
  font-size: 1rem;
  padding: 8px 8px 12px 8px;
  outline: none;
  &:focus-visible {
    border-bottom: 2px #333333 solid;
  }
  width: 200px;
`;

const Text = styled.span`
  font-size: 1rem;
  margin-top: -4px;
`;

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface Props {
  handleOnChange: (x: string) => void;
  placeholder: string;
  text: string;
}

export default function OutlinedInput({ handleOnChange, placeholder, text }: Props) {
  return (
    <Container>
      <Text>{text}</Text>
      <InputElement
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder={placeholder}
      />
    </Container>
  );
}
