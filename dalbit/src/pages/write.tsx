import { CiSquarePlus } from "react-icons/ci";
import { BsEraser } from "react-icons/bs";
import styled from "styled-components";

export default function Write() {
  return (
    <>
      <ConsumBox>
        <div>2023년 n월 n일</div>
        <div>
          오늘 예산 <input></input>원
        </div>
        <ConsumList>
          <h3>예상 지출 내역</h3>
          <input></input>에서 <input></input>원<BsEraser />
          <IconBox>
            <CiSquarePlus size={30} />
          </IconBox>
        </ConsumList>
      </ConsumBox>
    </>
  );
}
const ConsumBox = styled.div`
  width: 50rem;
  height: 50rem;
  border: 3px solid #ffb45e;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 3rem;
  justify-content: center;
  align-items: center;
`;
const ConsumList = styled.div``;
const IconBox = styled.div``;
