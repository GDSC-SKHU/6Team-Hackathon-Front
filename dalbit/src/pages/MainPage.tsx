import CalendalModal from "../components/CalendalModal";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { GrMoney } from "react-icons/gr";
import { SlPlus } from "react-icons/sl";
import useToken from "../hooks/useToken";
import GlobalStyle from "./GlobalStyle";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

// interface Plans {
//   localDate: string;
// }

type localDate = string | null;

interface Plans{
  id: number;
  localDate: string;
  limitMoney: number;
  totalSpentMoney: number;
  record:{
    id: number;
    message: string;
  }

  expenditures: Expenditure[];
}


interface Expenditure {
  id: number;
  message: string;
  spentMoney: number;
}

export default function MainPage() {
  const { Tokens } = useToken();
  const [post, setPost] = useState<Plans[]>([]);
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const router = useRouter();

  const [message, setMessage] = useState<string>("");
  const [spentMoney, setSpentMoney] = useState<string>("");
  const [inputBox, setInputBox] = useState(true);

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSetSpentMoney = (e: ChangeEvent<HTMLInputElement>) => {
    setSpentMoney(e.target.value);
  };

  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "/expenditures",
        {
          localDate: moment(date).format("YYYY-MM-DD"),
          message: message,
          spentMoney: Number(spentMoney),
        },
        {
          headers: {
            Authorization: Tokens,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        router.push("/MainPage");
        alert("?????? ??????");
      })
      .catch((err) => {
        console.log(err);
        alert("?????? ??????");
      });
    setMessage("");
    setSpentMoney("");
    setInputBox(true);
  };


  const [consum, setConsum] = useState<number>(0);
  const [ConsumState, setConsumState] = useState<boolean>(false);
  const [consumColor, setConsumColor] = useState<string>("#00bf29");
  const [recordToday, setRecordToday] = useState(false);
  //????????? ????????? ???????????? ?????? ????????? ???????????? ?????? ??????
  const ConsumFace = () => {
    if (consum >= 0) {
      setConsumState(false);
    } else {
      setConsumState(true);
      setConsumColor("#ff4d35");
    }
  };

  const [budget, setBudget] = useState<string>("");
  const [memo, setMemo] = useState("");

  const onChangeBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };
  const onChangeMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };
  //saveDayPlan????????????
  const onBudgetSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(budget);
    axios
      .post(
        "/dayplans",
        {
          localDate: moment(date).format("YYYY-MM-DD"),
          limitMoney: Number(budget),
        },
        {
          headers: {
            Authorization: Tokens,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get ?????? ????????? ??????
  useEffect(() => {
    const getPost = () => {
      axios
        .get(`/dayplans/2023-01-28`, {
          headers: {
            Authorization: Tokens,
          },
        })
        .then((data) => {
          console.log(data.data);
          setPost(data.data);
          console.log(JSON.stringify(data.data));
        })
        .catch((e) => {
          if (Tokens === null) {
            router.push("/login");
            alert("????????? ?????????");
          }
        });
    };
    getPost();
  }, [router]);

  return (
    <>
      <GlobalStyle />
      <BugetBox>
        <p>Today&#39;s budget</p>
        <form onSubmit={onBudgetSubmit}>
          <BudgetMoney
            type="text"
            value={budget}
            onChange={onChangeBudget}
          ></BudgetMoney>
          <BudgetSub>
            <Image src="/??????.png" alt="??????" width={40} height={40}></Image>
          </BudgetSub>
        </form>
      </BugetBox>
      <BugetBox>
        <p>Today&#39;s Changes</p>
        <div>
          {/* {post.map((item)=>{
            return(
              <div key={item.id}>
                <div>{item.limitMoney}???!</div>
              </div>
            );
          })}; */}
        </div>
      </BugetBox>
      <StyledP className="text-center">
        <span className="bold"></span> {date.toDateString()}
      </StyledP>
      <StyledContainerDiv>
        <StyledCalendarDiv className="app">
          <div className="calendar-container">
            <StyledCalendar
              formatDay={(locale, date) =>
                date.toLocaleString("en", { day: "numeric" })
              }
              locale="ko"
              prevLabel={<TbArrowNarrowLeft />}
              nextLabel={<TbArrowNarrowRight />}
              next2Label={null}
              prev2Label={null}
              onChange={setDate}
              minDetail="month"
              onClickDay={onClickToggleModal}
              value={date}
              showNeighboringMonth={false}
            />
            {/* isOpenModal??? ?????? ?????? ???????????? ?????? ???, Modal ???????????? ???????????? ????????? */}
            {isOpenModal && (
              <CalendalModal onClickToggleModal={onClickToggleModal}>
                <StyledDiv>
                  {month}??? {day}??? ??????
                  <p>{budget}</p>
                </StyledDiv>
                <Consumlist>
                  <GrMoney />
                  Consum_List
                  <GrMoney />
                </Consumlist>
                <form onSubmit={onSubmit}>
                  <ConcumSrcBox>
                    <ConcumSrc
                      value={message}
                      onChange={onChangeMessage}
                      placeholder="?????????"
                    />
                    <ConcumSrc
                      value={spentMoney}
                      onChange={onSetSpentMoney}
                      placeholder="????????????"
                    />
                    <ConsumSrcBtn>
                      <AiOutlineCheckSquare size={30} />
                    </ConsumSrcBtn>
                  </ConcumSrcBox>
                </form>
                <PlusBtn>
                  <SlPlus size={25} />
                </PlusBtn>
                {/* ??? ????????? CheckBox ??? ????????? ?????????????????? ?????? */}
              </CalendalModal>
            )}
          </div>
        </StyledCalendarDiv>
      </StyledContainerDiv>
      <div>
        {ConsumState ? (
          <RabbitSadState>
            <Image src="/sad.png" alt="????????????" width={105} height={90} />
            <div>
              <Image src="/???.png" alt="???" width={35} height={35}></Image>
              <p>?????? lose ??????!</p>
              <Image src="/???.png" alt="???" width={35} height={35}></Image>
            </div>
          </RabbitSadState>
        ) : (
          <RabbitHappyState>
            <Image src="/happy1.svg" alt="????????????" width={100} height={90} />
            <div>
              <Image src="/??????.png" alt="??????" width={35} height={35}></Image>
              <p>?????? get ??????!</p>
              <Image src="/??????.png" alt="??????" width={35} height={35}></Image>
            </div>
          </RabbitHappyState>
        )}
      </div>
      <RecordRabbit>
        <RecordRabbitMmini>
          <p
            onClick={() => {
              setRecordToday((prev) => !prev);
            }}
          >
            ????????? ?????? ????????????
          </p>
        </RecordRabbitMmini>
        {recordToday && (
          <RBox>
            <RecordBox value={memo} onChange={onChangeMemo}></RecordBox>
            <RecordBtn />
          </RBox>
        )}
      </RecordRabbit>
    </>
  );
}

// ?????? 2??????
const StyledContainerDiv = styled.div`
  display: flex;
`;

const StyledCalendarDiv = styled.div`
  margin: 0 auto;
  width: 36rem;
`;

const StyledP = styled.p`
  text-align: center;
  width: 14rem;
  transition: all 0.2s;
  padding: 5px;
  border-radius: 10px;
  margin: 1rem auto;
  &:hover {
    background-color: #ffcf97;
  }
`;

//todo Calendar ???????????? ????????????
const StyledCalendar = styled(Calendar)`
  position: relative;
  height: 65vh;
  padding: 2rem;

  // React Calendar??? ?????? ??????
  &.react-calendar {
    width: 68rem;
    max-width: 100%;
    background-color: #ffefdd;
    color: #222;
    border: none;
    border-radius: 20px;
    box-shadow: 5px 6px 10px rgba(243, 197, 99, 0.4);
    line-height: 1.125em;
  }

  // Calendar ??????, ??? ?????? ??????
  .react-calendar__navigation {
    display: flex;
    height: 50px;
    margin-bottom: 1.5em;
    font-size: 1rem;

    & button {
      width: 300px;
      background: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      font-weight: bolder;
      transition: all 0.2s;
      color: #111111;
    }
    & button:hover {
      background: #cadde0;
      font-size: 20px;
      color: #007e20;
      font-weight: bolder;
      transition: all 0.5s;
      cursor: pointer;
    }
  }

  // ?????? ?????? ??????
  abbr[title] {
    text-decoration: none;
    color: #f7d66d;
  }

  // ????????? ???????????? ??????
  .react-calendar__month-view__weekdays__weekday:nth-child(6) > abbr[title],
  .react-calendar__month-view__weekdays__weekday:nth-child(7) > abbr[title] {
    color: red;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 0.75em;
  }

  // calendar ?????? ?????? wrapper
  .react-calendar__viewContainer {
    padding-bottom: 20px;
  }

  // date tile ?????? ??????
  .react-calendar__tile {
    max-width: 100%;
    padding: 30px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    &--now {
      background: #faf2e9;
      color: #ee7834;
      &:enabled:hover,
      &:enabled:focus {
        background: #f8c499;
      }
    }
  }
`;
const PlusBtn = styled.button`
  background-color: #fff0df;
  border: none;
  outline: none;
  margin: 1rem;
  color: #ee7834;
  transition: all 0.5s ease-out;
  &:hover {
    color: #ee3a34;
    transform: translateY(-0.3rem);
  }
`;
const ConsumSrcBtn = styled.button`
  background-color: #fff0df;
  border: none;
  outline: none;
  color: #ee7834;
`;
const ConcumSrcBox = styled.div`
  display: flex;
  gap: 5px;
  margin: 1rem;
`;
const ConcumSrc = styled.input`
  width: 13rem;
  height: 3rem;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 10px;
  &:hover {
    background-color: #ffded3;
  }
`;
const Consumlist = styled.div`
  display: flex;
  color: #ee7834;
  font-weight: bolder;
  font-size: 1.3rem;
  font-family: "Courier New", Courier, monospace;
  margin: 1rem;
  gap: 10px;
`;
const StyledDiv = styled.div`
  font-size: 24px;
  color: #ee7834;
  border-bottom: 3px solid #ee7834;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const RecordBtn = styled.button`
  outline: none;
  border: none;
  background-color: white;
  color: #ff8c35;
`;
const RBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
`;
const RecordBox = styled.textarea`
  width: 580px;
  height: max-content;
  background-color: #fff0df;
  box-shadow: 5px 6px 10px rgba(243, 197, 99, 0.4);
  border-radius: 20px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  padding: 2rem;
  font-size: 1.2rem;
  overflow: scroll;
  &:focus {
    background-color: #fff8f0;
    transition: all 0.3s;
  }
`;
const RecordRabbitMmini = styled.div`
  width: 580px;
  height: 4rem;
  border-radius: 20px;
  background-color: #fff0df;
  box-shadow: 5px 6px 10px rgba(243, 197, 99, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RecordRabbit = styled.div`
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ee7834;
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
  width: 580px;
  height: 10rem;
  border-radius: 20px;
  background-color: #fff0df;
  box-shadow: 5px 6px 10px rgba(243, 197, 99, 0.4);
  gap: 5px;
  margin: 1rem auto;
  color: #ff8c35;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background-color: white;
    transition: all 0.5s ease-out;
    border: 8px solid #fff0df;
  }
`;
const RabbitHappyState = styled.div`
  height: 10rem;
  border-radius: 20px;
  background-color: #fff0df;
  box-shadow: 5px 6px 10px rgba(243, 197, 99, 0.4);
  margin: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff8c35;
  width: 580px;
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
  margin: 2rem;
  & > div {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  & > p {
  }
`;
