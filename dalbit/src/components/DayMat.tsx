import { useCallback, useState } from "react";
import { Calendar } from "react-calendar";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import CalendalModal from "./CalendalModal";

function DayMat() {
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() +1;
  const day = date.getDate();

  const onClickDay = (e:React.MouseEvent<HTMLElement>) => {
    alert("clicked Me!");
  }

  return (
    <>
      <Calendar
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
        onClickDay={onClickDay}
        value={date}
        showNeighboringMonth={false}
      />
      <div>
      <div>
        {month}월 {day}일의 예산은?
      </div>
      {/* 데이터 받아올 부분 */}
      <div>?원 입니다.</div>
      </div>
    </>
  );
}

export default DayMat;
