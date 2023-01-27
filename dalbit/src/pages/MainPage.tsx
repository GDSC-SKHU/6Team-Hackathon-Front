import styled from "styled-components";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useState } from "react";
import { BsCalendar2Plus } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

export default function MainPage() {
  const [ConsumState, setConsumState] = useState(false);
  const [consum, setConsum] = useState(0);
  const [recordToday, setRecordToday] = useState(false);

  //날짜 임의 변수
  const [date, setDate] = useState(new Date());

  const [budget, setBudget] = useState<string>("");
  const [memo, setMemo] = useState("");
  const onChangeBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };
  const onChangeMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };
  //saveDayPlan가져오기
  const onBudgetSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    ConsumFace();
    console.log(budget);
    axios
      .post("/dayplans", {
        localDate: moment(date).format("YYYY-MM-DD"),
        limitMoney: Number(budget),
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //토끼의 상태를 표시하기 위해 데이터 가져올때 넣을 함수
  const ConsumFace = () => {
    if (consum >= 0) {
      setConsumState(false);
    } else if (consum < 0) {
      setConsumState(true);
    }
  };
  return (
    <>
      <BugetBox>
        <p>Today&#39;s budget</p>
        <form onSubmit={onBudgetSubmit}>
          <BudgetMoney
            type="text"
            value={budget}
            onChange={onChangeBudget}
          ></BudgetMoney>
          <BudgetSub>
            <Image src="/당근.png" alt="당근" width={40} height={40}></Image>
          </BudgetSub>
        </form>
      </BugetBox>
      <BugetBox>
        <p>Today&#39;s Changes</p>
        <div>
          <p>{consum}</p>
        </div>
      </BugetBox>
      <IconBox>
        <BsCalendar2Plus size={100} />
      </IconBox>
      <div>
        <RabbitSadState>
          <Image src="/sad.png" alt="마이너스" width={105} height={90} />
          <div>
            <Image src="/똥.png" alt="똥" width={35} height={35}></Image>

            <p>토끼 lose 당근!</p>
            <Image src="/똥.png" alt="똥" width={35} height={35}></Image>
          </div>
        </RabbitSadState>
        <RabbitHappyState>
          <Image src="/happy.png" alt="마이너스" width={100} height={90} />
          <div>
            <Image src="/당근.png" alt="당근" width={35} height={35}></Image>
            <p>토끼 get 당근!</p>
            <Image src="/당근.png" alt="당근" width={35} height={35}></Image>
          </div>
        </RabbitHappyState>
        {/* {ConsumState ? (
          <div>
            <Image src="sad.png" alt="마이너스" width={40} height={40}></Image>
          </div>
        ) : (
          <div></div>
        )} */}
      </div>
      <RecordRabbit>
        <p>오늘의 소비를 기록하시겠어요?</p>
        <div>
          <p
            onClick={() => {
              setRecordToday((prev) => !prev);
            }}
          >
            Yes
          </p>
          &nbsp;/&nbsp;
          <p
            onClick={() => {
              setRecordToday((prev) => !prev);
            }}
          >
            No
          </p>
        </div>
        {recordToday && (
          <RBox>
            <RecordBox value={memo} onChange={onChangeMemo}>
              {" "}
            </RecordBox>
            <RecordBtn>
              <AiOutlineCheckSquare size={40} />
            </RecordBtn>
          </RBox>
        )}
      </RecordRabbit>
    </>
  );
}
const RecordBtn = styled.button`
  outline: none;
  border: none;
  background-color: white;
  color: #ff8c35;
`;
const RBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const RecordBox = styled.textarea`
  width: 30rem;
  height: max-content;
  background-color: #ffc59edc;
  box-shadow: 5px 3px 5px #dec4a3;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  padding: 1rem;
  font-size: 1.2rem;
  overflow: scroll;
`;
const RecordRabbit = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff8c35;
  & > div {
    display: flex;
  }
  & > div > p {
    &:hover {
      color: #00bf29;
    }
  }
`;
const RabbitSadState = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  width: 25rem;
  gap: 5px;
  margin: 1rem auto;
  color: #ff8c35;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const RabbitHappyState = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff8c35;
  width: 25rem;
  gap: 5px;
  margin: 1rem auto;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const BudgetSub = styled.button`
  background-color: white;
  outline: none;
  border: none;
`;
const IconBox = styled.button`
  display: flex;
  margin: auto;
  outline: none;
  border: none;
  background-color: white;
  color: #ff8c35;
  justify-content: center;
  transition: all 0.5s ease-out;
  &:hover,
  :active {
    color: #00a22b;
    transform: translateY(-0.5rem);
  }
`;
const BudgetMoney = styled.input`
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: #00a22b;
  text-align: center;
  width: 10rem;
  border-bottom: 3px solid rgb(255, 175, 95);
  transition: all 0.5s ease-out;
  &:focus {
    border-bottom: 3px solid #00a22b;
  }
`;
const BugetBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-family: "Courier New", Courier, monospace;
  margin: 3rem;
  & > div {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  & > p {
  }
`;
