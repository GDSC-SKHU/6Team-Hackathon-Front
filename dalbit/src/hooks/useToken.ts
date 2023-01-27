import { useEffect, useState } from "react";

type account = string | null;
type grant = string | null;

const useToken = () => {
  const [grant, setGrant] = useState<grant>("");
  const [aToken, setAToken] = useState<account>("");

  useEffect(() => {
    setGrant(localStorage.getItem("grantType"));
    setAToken(localStorage.getItem("accessToken"));
  }, []);

  const Tokens = ['Bearer' + " " + aToken];

  return { Tokens };
};

export default useToken;
