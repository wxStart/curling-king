import React, { Suspense } from "react";
console.log("Suspense: ", Suspense);

const OtherComponent = React.lazy(() => import("./OtherComponent"));

const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

export default function LazyPage() {
  const [tab, setTab] = React.useState("OtherComponent");

  function handleTabSelect(tab) {

    // setTab(tab);

    //  可以通过改变网络的速度，来使加载速度变慢就可以看到使用 React.startTransition 的差异

    React.startTransition(() => {
      setTab(tab);
    });
  }

  return (
    <div>
      <div>
        <button onClick={() => handleTabSelect("OtherComponent")}>
          OtherComponent
        </button>
        <button onClick={() => handleTabSelect("AnotherComponent")}>
          AnotherComponent
        </button>
      </div>
      <Suspense fallback={<div style={{ color: "red" }}>Loading...</div>}>
        {tab === "OtherComponent" ? <OtherComponent /> : <AnotherComponent />}
      </Suspense>
    </div>
  );
}
