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
  background: #58e236;
  width: 100px;
  height: 3px;
`;
const StyledGrassBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
`;
