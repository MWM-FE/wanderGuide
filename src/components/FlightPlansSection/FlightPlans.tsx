import { useSideModal } from "../../context/SideModalContext";
import FlightList from "./FlightList";

const FlightPlans = () => {
  const { isOpen, openModal, closeModal } = useSideModal();
  const showFlightPlan = () => {
    if (!isOpen) {
      openModal("비행 일정", <FlightList />, true);
    } else {
      closeModal();
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="h-[53px] flex items-center justify-between pb-5">
        <span className="text-[22px] font-semibold ">비행 일정</span>
        <button>
          <img
            className="w-[24px] h-[24px]"
            src="/images/write.svg"
            alt="write"
          />
        </button>
      </div>
      <div
        className="bg-white w-full h-[564px] rounded-3xl p-5 cursor-pointer"
        onClick={() => showFlightPlan()}
      >
        <FlightList />
      </div>
    </div>
  );
};

export default FlightPlans;