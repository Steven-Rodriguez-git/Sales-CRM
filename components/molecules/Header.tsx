import styled from "styled-components";
import Logo from "../../components/atoms/icons/Logo";

const HeaderSurface = styled.div`
  display: flex;
  align-items: center;
`;

const NameLogo = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const Text = styled.h1`
  color: #1d4ed8;
`;

type HeaderProps = {
  text: string;
};

export default function Header({ text }: HeaderProps) {
  return (
    <HeaderSurface>
      <NameLogo>
        <Logo width={32} height={32} fill="#1d4ed8" />
        <Text>{text}</Text>
      </NameLogo>
    </HeaderSurface>
  );
}

