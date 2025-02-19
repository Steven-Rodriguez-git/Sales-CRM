import styled from "styled-components";
import Logo from "../../components/atoms/icons/Logo";

const HeaderSurface = styled.div`
  align-items: items-center;
}`;

const NameLogo = styled.div`
    display: flex;
    align-items: center;
  margin: 0;
`;
const Text = styled.h1`
  color: #1D4ED8;
  }
`;



export default function Header () {
  return (
    <HeaderSurface>
        <NameLogo>
        <Logo width={32} height={32} fill="#1D4ED8" />
        <Text>SALES</Text>
        </NameLogo>
    </HeaderSurface>
  );
};

