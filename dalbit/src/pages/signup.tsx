import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ChangeEvent } from "react";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setrepeatedPassword] = useState<string>("");
  const [confirmText, setConfirmText] = useState(false);
  const [falsePass, setFalsePass] = useState(false);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    setrepeatedPassword(e.target.value);
  };

  const confirm = () => {
    if (repeatedPassword === "" && password === "") {
      alert("비밀번호를 입력해주세요");
    } else if (password === repeatedPassword) {
      setConfirmText(true);
      setFalsePass(false);
    } else if (password !== repeatedPassword) {
      setConfirmText(false);
      setFalsePass(true);
    }
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/join", {
        username: username,
        nickname: nickname,
        password: password,
        repeatedPassword: repeatedPassword,
      })
      .then((res) => {
        console.log(res.data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <SignupBox onSubmit={onSubmit}>
        <WriteBox>
          <p>Id</p>
          <input type="text" onChange={onChangeUserName}/>
        </WriteBox>
        <WriteBox>
          <p>Password</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={onChange}
          ></input>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 확인해주세요"
              value={repeatedPassword}
              onChange={onChange1}
            ></input>
            <ConfrimBtn type="button" onClick={confirm}>
              <AiOutlineCheckCircle size={30} />
            </ConfrimBtn>
          </div>
          {confirmText ? <div>비밀번호가 일치합니다.</div> : <div></div>}
          {falsePass ? <div>비밀번호가 일치하지 않습니다.</div> : <div></div>}
        </WriteBox>
        <WriteBox>
          <p>Nickname</p>
          <input type="text" onChange={onChangeNickName}/>
        </WriteBox>
        <SignupBtn>
          <SignupTextBtn type="submit">회원가입</SignupTextBtn>
        </SignupBtn>
      </SignupBox>
    </>
  );
}
const ConfrimBtn = styled.button`
  background-color: #fff1e6;
  outline: none;
  border: none;
  color: #ffb276;
  &:active, :hover {
    transition: all 0.5s ease-out;
    color: #ff6357;
    cursor: pointer;
  }
`;
const SignupTextBtn = styled.button`
  color: white;
`;
const SignupBtn = styled.button`
  background-color: #ffb176;
  color: white;
  font-size: 20px;
  text-align: center;
  height: 3rem;
  width: 17rem;
  border-radius: 10px;
  border: 1px solid #ffb276;
  margin: 1rem;

  &:active, :hover {
    transition: all 0.5s ease-out;
    background-color: #ff7d69;
    width: 15rem;
    cursor: pointer;
  }
  
`;
const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  gap: 5px;
  color: #ffb176;
  & > input {
    width: 17rem;
    height: 3rem;
    font-size: 15px;
    border: none;
    border: 2px solid #ffb176;
    outline: none;
    padding: 10px 5px;
    padding-left: 10px;
    border-radius: 10px;
    margin: 0.5rem;
    &:focus {
      background-color: #fff4ec;
      transition: all 0.5s ease-out;
    }
  }
  & > div > input {
    width: 15rem;
    height: 3rem;
    font-size: 15px;
    border: none;
    border: 2px solid #ffb176;
    outline: none;
    padding: 10px 5px;
    padding-left: 10px;
    border-radius: 10px;
    margin: 0.5rem;
    &:focus {
      background-color: #fff4ec;
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
const SignupBox = styled.form`
  border-radius: 20px;
  width: 30rem;
  height: 36rem;
  margin: 3rem auto;
  box-shadow: 5px 3px 5px #dec4a3;
  background-color: #fff1e6;
  display: flex;
  padding: 1rem;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  padding-top: 3rem;
  padding-bottom: 3rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
`;
