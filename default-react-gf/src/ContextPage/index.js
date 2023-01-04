import React, { useState, useEffect } from "react";
import { UserInfoProvider } from "./components/context";
import ChildCom from "./components/ChildCom";
import ChildComC from "./components/ChildComC";

function Index() {
  const defaultVlaue = {
    name: "abc",
  };
  const [userinfo, setUserInfo] = useState(defaultVlaue);

  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setUserInfo((c) => ({
        name: c.name + 1,
      }));
      if (count > 5) {
        console.log("=>: ", 111);
        clearInterval(timer);
      }
    }, 1000);
  }, []);

  return (
    <>
      <UserInfoProvider value={userinfo}>
        <ChildCom></ChildCom>
        <ChildComC></ChildComC>
      </UserInfoProvider>
    </>
  );
}

export default Index;
