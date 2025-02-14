import NumberOfTickets from "../components/NumberOfTickets";
import Title from "../components/Title";
import TicketType from "../components/TicketType";
import { FC } from "react";

interface Props {
  handleNextStep: ()=> void;
  getTicketType: (id:string)=> void
  getNumberOfTicket: (id:number)=> void
}
const TicketSelection:FC<Props> = ({handleNextStep, getTicketType, getNumberOfTicket}: Props) => {
  return (
    <div className="p-[24px] max-[451px]:p-[15px] space-y-[32px] border border-[#0E464F] bg-[#08252B] rounded-[32px] w-full">
      <Title />
      <div className="w-full h-1 bg-[#07373F]"></div>
      <TicketType getTicketType={getTicketType} />
      <NumberOfTickets getNumberOfTicket={getNumberOfTicket} />
      <div className="w-full h-[48px] flex flex-wrap justify-center gap-8 border border-[#0E464F] bg-[#041E23] rounded-[24px]">
        <button className="h-full w-[150px] bg-transparent hover:bg-[#24A0B5] border border-[#24A0B5] rounded-[8px] px-3">
          Cancel
        </button>
        <button onClick={handleNextStep} className="h-full w-[150px] bg-[#24A0B5] hover:bg-transparent border border-[#24A0B5] rounded-[8px]">
          Next
        </button>
      </div>
    </div>
  );
}
export default TicketSelection
