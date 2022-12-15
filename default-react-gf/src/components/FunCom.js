import React, { useEffect, useState } from "react";

export default function FunCom(prop) {
  const [date, setDate] = useState(1);
  console.log("date: ", typeof date);

  // 给个空数组相当于 componentDidMount
  useEffect(() => {
    console.log("2222");
  }, []);

  // 依赖参数，参数变化 函数才会执行
  useEffect(() => {
    console.log("444");
  }, [date]);

  // 无依赖相当于  componentDidUpdate
  useEffect(() => {
    console.log("5555");
  });

  // 无依赖相 有返回函数相当于   componentDidMount[或者是 componentDidUpdate]/componentWillUnmount 的结合体
  useEffect(() => {
    console.log("1111");
    const timer = setInterval(() => {
      console.log("333");
    }, 1000);
    // return 是相当于 componentWillUnmount
    return () => {
      console.log("=>: ");
      clearInterval(timer);
    };
  });

  const changDate = () => {
    setDate(date + 1);
    console.log(date);
  };

  return (
    <>
      <button
        onClick={() => {
          changDate();
        }}
      >
        {date}
      </button>
    </>
  );
}
