import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { ChangeEvent } from "react";

export default function Signup({}: any) {
  const [passwordWrite, setpasswordWrite] = useState<string>("");
  const [passwordConfirm, setpasswordConfirm] = useState<string>("");
  const [confirmText, setConfirmText] = useState(false);
  const [falsePass, setFalsePass] = useState(false);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setpasswordWrite(e.target.value);
  };
  const onChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    setpasswordConfirm(e.target.value);
  };
  const confirm = () => {
    if(passwordConfirm===""&&passwordWrite===""){
      alert('비밀번호를 입력해주세요')
    }else if (passwordWrite === passwordConfirm) {
      setConfirmText(true);
      setFalsePass(false);
    }else if(passwordWrite !== passwordConfirm){
      setConfirmText(false);
      setFalsePass(true);
    }
  };
  return (
    <>
      <SignupBox>
        <WriteBox>
          <p>Id</p>
          <input type="text"></input>
        </WriteBox>
        <WriteBox>
          <p>Password</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={passwordWrite}
            onChange={onChange}
          ></input>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 확인해주세요"
              value={passwordConfirm}
              onChange={onChange1}
            ></input>
            <ConfrimBtn onClick={confirm}>
              <AiOutlineCheckCircle size={30} />
            </ConfrimBtn>
          </div>
          {confirmText ? <div>비밀번호가 일치합니다.</div> :<div></div>}
          {falsePass?<div>비밀번호가 일치하지 않습니다.</div>:<div></div>}
        </WriteBox>
        <WriteBox>
          <p>Nickname</p>
          <input type="text"></input>
        </WriteBox>
        <SignupBtn>
          <SignupText>Sign Up</SignupText>
        </SignupBtn>
      </SignupBox>
    </>
  );
}
const ConfrimBtn = styled.button`
  background-color: #fff6eb;
  outline: none;
  border: none;
  color: #ffb276;
  &:active {
    color: #ff7f76;
  }
`;
const SignupText = styled.div`
  color: white;
`;
const SignupBtn = styled.button`
  background-color: #ffb176;
  color: white;
  font-size: 20px;
  text-align: center;
  height: 3rem;
  width: 18rem;
  border-radius: 10px;
  border: 1px solid #ffb276;
  margin: 1rem;

  &:active {
    transition: all 0.5s ease-out;
    background-color: #ff7d69;
  }
`;
const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  gap: 5px;
  color: #ffb176;
  & > input {
    width: 15rem;
    height: 2rem;
    font-size: 20px;
    border: none;
    border: 2px solid #ffb176;
    outline: none;
    padding: 10px 5px;
    padding-left: 30px;
    border-radius: 10px;
    margin: 0.5rem;
    &:focus{
    background-color: #ffeada;
    transition: all 0.5s ease-out;
  }
  }
  & > div > input {
    width: 12rem;
    height: 2rem;
    font-size: 15px;
    border: none;
    border: 2px solid #ffb176;
    outline: none;
    padding: 10px 5px;
    padding-left: 30px;
    border-radius: 10px;
    margin: 0.5rem;
    &:focus{
    background-color: #ffeada;
    transition: all 0.5s ease-out;
  }
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > p {
    margin: 0px;
  }
`;
const SignupBox = styled.div`
  border-radius: 20px;
  width: 30rem;
  height: 40rem;
  margin: 3rem auto;
  border: 3px solid #ffb95e;
  box-shadow: 5px 3px 5px #dec4a3;
  background-color: #fff6eb;
  display: flex;
  padding: 1rem;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
`;
