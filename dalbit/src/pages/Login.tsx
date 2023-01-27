import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import {
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

export default function Login() {
  const router = useRouter();

  const [memberId, setMemberId] = useState<string>("");
  const [memberPw, setMemberPw] = useState<string>("");
  const [passwordType, setPasswordType] = useState<boolean>(false);
  const [lookPassword, setLookPassword] = useState("password");

  const PasswordType = () => {
    passwordType ? setLookPassword("password") : setLookPassword("text");
  };

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberPw(e.target.value);
  };

  const onClickLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/login", {
        memberId: memberId,
        memberPw: memberPw,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        router.push("/index");
      })
      .catch((err) => {
        console.log(err);
        alert("아이디나 비밀번호가 잘못되었습니다.");
      });
  };

  return (
    <>
      <StyledLoginBox>
        <form onSubmit={onClickLogin}>
          <StyledInputBox>
            <StyledEachInput>
              <FiUser size={28} />
              <StyledUserInput
                placeholder="아이디 입력"
                onChange={onChangeId}
                maxLength={15}
                required
              />
            </StyledEachInput>
            <StyledEachInput>
              <AiOutlineLock size={28} />
              <StyledUserInput
                placeholder="비밀번호"
                onChange={onChangePw}
                type={lookPassword}
                minLength={8}
                required
              />
              <div
                onClick={() => {
                  setPasswordType((prev) => !prev);
                  PasswordType();
                }}
              >
                {passwordType ? (
                  <AiOutlineEye size={25} />
                ) : (
                  <AiOutlineEyeInvisible size={25} />
                )}
              </div>
            </StyledEachInput>
          </StyledInputBox>
          <StyledLoginBtnBox>
            <StyledLoginBtn type="submit">로그인</StyledLoginBtn>
          </StyledLoginBtnBox>
          <StyledLink href="/signup">
          <StyledLinkP>아이디가 없으신가요?</StyledLinkP>
          </StyledLink>
        </form>
      </StyledLoginBox>
    </>
  );
}

const StyledLoginBox = styled.div`
  width: 34rem;
  height: 36rem;
  margin: 4rem auto;
  background-color: #fff1e6;
  box-shadow: 3px 3px 5px #ebd8bf;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
`;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledEachInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ffb176;
  background-color: #fff;
  border-radius: 5px;
  color: #ffb176;
  width: 20rem;
  height: 3rem;
  margin: 1rem;
  padding: 0.5rem 1.5rem;
`;

const StyledUserInput = styled.input`
  width: 15rem;
  height: 1.5rem;
  padding-left: 1rem;
  border: none;
  &:focus {
    border: none;
    outline: none;
    background-color: #fff;
    border-bottom: 2px solid #ffb176;
  }
`;

const StyledLoginBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLoginBtn = styled.button`
  background-color: #ffb176;
  color: white;
  font-size: 24px;
  text-align: center;
  height: 4rem;
  width: 12rem;
  border-radius: 15px;
  border: 5px solid #ffc97e;
  margin-top: 3rem;
  transition: all 0.3s;
  &:hover {
    /* transform: translateY(-3px); */
    transform: scale(0.9);
    cursor: pointer;
    border: 5px solid #ffc9a0;
    background: #ffc9a0;
  }
`;

const StyledLinkP = styled.p`
  width: 50%;
  margin: 0 auto;
  opacity: 0.4;
  text-align: center;
  margin-top: 1rem;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
    transform: translateY(-3px);
  }
  &::after{
    content: "";
    position: absolute;
    bottom: -10px;
    left: 30px;
    width: 70%;
    height: 1px;
    background: #000;
  }
  &:hover::after{
    opacity: 0.3;
    transform: scale(1);
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
