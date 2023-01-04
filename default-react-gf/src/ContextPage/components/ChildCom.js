import React from "react";
import { UserInfoConsumer } from "./context";

export default function ChildCom() {
  return (
    <UserInfoConsumer>
      {(userinfo) => {
        console.log('userinfo: ', userinfo);
        return <div>name:{ userinfo.name }</div>;
      }}
    </UserInfoConsumer>
  );
}
