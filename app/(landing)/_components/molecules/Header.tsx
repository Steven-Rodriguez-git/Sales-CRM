import styled from "styled-components";
import Logo from "../icons/logo";

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



const Divider = styled.hr`
  width: 100%; 
  border-top: 1px solid #d1d5db;
`;

export default function Header () {
  return (
    <HeaderSurface>
        <NameLogo>
        <Logo width={32} height={32} fill="#1D4ED8" />
        <Text>SALES</Text>
        </NameLogo>
      <Divider/>
    </HeaderSurface>
  );
};

