import Image from "next/image";
import styled from "styled-components";

export default function PageLogo() {
  return (
    <>
      <StyledImgBox>
        <Image
          src="/img/dalbitlogo.png"
          alt="달빗로고"
          width={100}
          height={100}
        ></Image>
      </StyledImgBox>
      <StyledGrassBox>
        <StyledGrass>
          Dalbit
        </StyledGrass>
      </StyledGrassBox>
    </>
  );
}

const StyledImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const StyledGrass = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  font-family: 'Courier New', Courier, monospace;
  color: #ffa564;
  font-weight: bolder;
  font-size: larger;
`;
const StyledGrassBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
`;
