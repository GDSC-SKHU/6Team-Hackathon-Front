import CalendalModal from "../components/CalendalModal";
import { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import useToken from "../hooks/useToken";
import DayMat from "../components/DayMat";
import GlobalStyle from "./GlobalStyle";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
import { useRouter } from "next/router";

export default function MainPage() {
  const { Tokens } = useToken();
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const router = useRouter();

  const [message, setMessage] = useState<string>("");
  const [spent_money, setSpent_Money] = useState<string>("");

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSetSpentMoney = (e: ChangeEvent<HTMLInputElement>) => {
    setSpent_Money(e.target.value);
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
          spentMoney: Number(spent_money),
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
        alert("작성 완료");
      })
      .catch((err) => {
        console.log(err);
        alert("문제 발생");
      });
    setMessage("");
    setSpent_Money("");
  };

  return (
    <>
      <StyledContainerDiv>
        <GlobalStyle />
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
            {/* isOpenModal이 참인 경우 오른쪽을 반환 즉, Modal 컴포넌트 콜백함수 부르기 */}
            {isOpenModal && (
              <CalendalModal onClickToggleModal={onClickToggleModal}>
                <StyledDiv>
                  {month}월 {day}일 예산은?
                </StyledDiv>
                <div>limit_money</div>
                <form onSubmit={onSubmit}>
                <div>
                  <input onChange={onChangeMessage} placeholder="사용처" />
                  <input onChange={onSetSpentMoney} placeholder="사용금액" />
                </div>
                <button>제출</button>
                </form>
                {/* 이 부분은 CheckBox 백 데이터 받아와야되는 부분 */}
              </CalendalModal>
            )}
          </div>
          <StyledP className="text-center">
            <span className="bold">선택된 날짜: </span> {date.toDateString()}
          </StyledP>
        </StyledCalendarDiv>
      </StyledContainerDiv>
    </>
  );
}

// 화면 2분할
const StyledContainerDiv = styled.div`
  display: flex;
`;

const StyledCalendarDiv = styled.div`
  margin: 0 auto;
  width: 36rem;
`;

const StyledP = styled.p`
  text-align: center;
`;

//todo Calendar 컴포넌트 스타일링
const StyledCalendar = styled(Calendar)`
  position: relative;
  height: 75vh;

  // React Calendar의 몸통 부분
  &.react-calendar {
    width: 1000px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border: none;
    border-radius: 10px;
    box-shadow: 0 12px 24px rgba(243, 197, 99, 0.4);
    line-height: 1.125em;
  }

  // Calendar 년도, 월 선택 부분
  .react-calendar__navigation {
    display: flex;
    height: 50px;
    margin-bottom: 1.5em;

    & button {
      width: 300px;
      background: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: lighter;
      transition: all 0.2s;
      color: #111111;
    }
    & button:hover {
      background: #cadde0;
      font-size: 16px;
      color: white;
      transition: all 0.5s;
      cursor: pointer;
    }
  }

  // 요일 밑줄 제거
  abbr[title] {
    text-decoration: none;
    color: #f7d66d;
  }

  // 주말은 색다르게 표시
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

  // calendar 날짜 선택 wrapper
  .react-calendar__viewContainer {
    padding-bottom: 20px;
  }

  // date tile 각각 설정
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

const StyledDiv = styled.div`
  margin-top: 20px;
  font-size: 24px;
`;
