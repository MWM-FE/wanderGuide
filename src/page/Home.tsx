import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Body from "../components/Body";

import { getStoreData, initDB } from "../indexeddb/indexedDB";
import { Item } from "../indexeddb/Indexed";

const Home = () => {
  // indexedDB 비동기여서. indexedDB를 기다리는 분기 추가
  const [isReady, setIsReady] = useState<boolean>(false);
  const [planList, setPlanList] = useState<Item[]>([]);
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    initDB();
    getStoreData("plan").then((res) => {
      setIsReady(true);
      setPlanList(res);
    });
  }, []);
  return (
    <div className="flex w-full h-full bg-[#f5f7fa]  min-h-[800px] min-w-[1500px]">
      {isReady && (
        <>
          <nav className="w-[230px] h-full">
            <Navbar
              list={planList}
              selected={selected}
              setSelected={setSelected}
            />
          </nav>
          <main className="w-[calc(100%-260px)] h-full flex-1">
            <Header selected={selected} />
            <Body />
          </main>
        </>
      )}
    </div>
  );
};

export default Home;
