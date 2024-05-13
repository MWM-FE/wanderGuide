import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Body from "../components/Body";
import { TabProvider } from "../context/TabContext";
import { getStoreData, initDB } from "../indexeddb/indexedDB";
import { useRecoilState } from "recoil";
import { destinationList } from "../store/destinationAtoms";

const Home = () => {
  // indexedDB 비동기여서. indexedDB를 기다리는 분기 추가
  const [isReady, setIsReady] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [planList, setPlanList] = useRecoilState(destinationList);

  useEffect(() => {
    initDB();
    getStoreData().then((res) => {
      setIsReady(true);
      setPlanList(res);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
            {/* indexedDB의 id가 1부터 시작이어서 */}
            <Header selected={selected + 1} />
            <TabProvider>
              <Body />
            </TabProvider>
          </main>
        </>
      )}
    </div>
  );
};

export default Home;