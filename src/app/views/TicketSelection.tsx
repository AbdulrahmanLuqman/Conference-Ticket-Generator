import NumberOfTickets from "../components/NumberOfTickets";
import Title from "../components/Title";
import TicketType from "../components/TicketType";
import { FC } from "react";

interface Props {
  handleNextStep: ()=> void;
  getTicketType: (id:string)=> void
  getNumberOfTicket: (id:number)=> void
  error: string
}
const TicketSelection:FC<Props> = ({handleNextStep, getTicketType, getNumberOfTicket, error}: Props) => {
  return (
    <div className="p-[24px] max-[451px]:p-[15px] space-y-[32px] border border-[#0E464F] bg-[#08252B] rounded-[32px] w-full h-fit">
      <Title />
      <div className="w-full h-1 bg-[#07373F]"></div>
      <TicketType getTicketType={getTicketType} />
      <span className="text-red-500">{error}</span>
      
      <NumberOfTickets getNumberOfTicket={getNumberOfTicket} />
      <div className="w-full flex flex-wrap-reverse justify-center gap-8">
        <button className="h-full w-[150px] max-[488px]:w-full bg-transparent hover:bg-[#24A0B5] border border-[#24A0B5] rounded-[8px] p-3">
          Cancel
        </button>
        <button onClick={handleNextStep} className="h-full w-[150px] max-[488px]:w-full bg-[#24A0B5] hover:bg-transparent border border-[#24A0B5] rounded-[8px] p-3">
          Next
        </button>
      </div>
    </div>
  );
}
export default TicketSelection
