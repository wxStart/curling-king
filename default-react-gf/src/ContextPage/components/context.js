import React from "react";

const defaultValue = {
  name: "wxx",
  age: 18,
};

const context = React.createContext(defaultValue); // Consumer 不在 Provider中才会使用默认的

export const UserInfoContext = context;
export const UserInfoProvider = context.Provider;
export const UserInfoConsumer = context.Consumer;
