import Image from "next/image"
import backgroundImage from "/public/assets/ticket_bg.png"
import BarCode from "/public/assets/Bar_Code.png"
import { Ticket } from "./Events"
import html2canvas from "html2canvas"
import { useRef } from "react"


export default function Ready({ticket, handleCardDefault}: {ticket: Ticket, handleCardDefault: ()=> void}){
  const divRef = useRef<HTMLDivElement>(null)

  const downloadImage = async () => {
    if (!divRef.current) return;

    const canvas = await html2canvas(divRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "screenshot.png";
    link.click();
  };

  return (
      <div className="flex flex-col items-center gap-8 ">
          <div className="w-full flex flex-col gap-4 justify-center items-center">
              <h3 className="text-[32px]">Your Ticket is Booked!</h3>
              <p className="text-[#FAFAFA] text-center">Check your email for a copy or you can <span className="font-semibold" onClick={downloadImage}>download</span></p>
          </div>

          <div ref={divRef} className="relative h-[600px] w-[300px]">
            <Image src={backgroundImage} alt="ticket" className="absolute top-0 left-0" />
            <div className="absolute left-0 right-0 mx-auto my-5 p-3 h-[75%] w-[90%] border border-[#24A0B5] rounded-[16px] flex flex-col gap-[20px] items-center">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold font-roadRage">Techember Fest ”25</h2>
                <div className="space-y-1">
                  <p className="text-[10px]">📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p className="text-[10px]">📅 March 15, 2025 | 7:00 PM</p>
                </div>
              </div>
              <div className="border-[4px] border-[#24A0B580] rounded-[12px] h-[140px] w-[140px] overflow-hidden">
                <Image src={ticket.image} alt="Me" width={140} height={140} />
              </div>
              <div className="w-full h-[200px] p-1 border border-[#133D44] rounded-lg bg-[#08343C] flex flex-col">
                <div className="w-full flex">
                  <div className="border-r p-2 border-r-[#12464E] w-[50%] overflow-hidden flex flex-col items-start">
                    <h4 className="text-[10px] opacity-30">Your Name:</h4>
                    <p className="font-bold text-[12px]">{ticket.name}</p>
                  </div>

                  <div className="p-2 w-[50%] overflow-hidden flex flex-col items-start">
                    <h4 className="text-[10px] opacity-30">Your Email:</h4>
                    <p className="font-bold text-[12px]">{ticket.email}</p>
                  </div>
                </div>

                <div className="w-full flex">
                  <div className="border-r border-y p-2 border-y-[#12464E] border-r-[#12464E] w-[50%] flex flex-col items-start">
                    <h4 className="text-[10px] opacity-30">Ticket Type:</h4>
                    <p className="font-bold text-[12px]">{ticket.ticketType}</p>
                  </div>

                  <div className="border-y border-y-[#12464E] p-2 w-[50%] overflow-hidden flex flex-col items-start">
                    <h4 className="text-[10px] opacity-30">Ticket For:</h4>
                    <p className="font-bold text-[12px]">{ticket.numberOfTicket}</p>
                  </div>
                </div>

                <div className="w-full h-full flex flex-col overflow-hidden">
                  <h4 className="text-[10px] opacity-30">Special Request:</h4>
                  <p className="font-bold text-[12px]">{ticket.specialRequest}</p>
                </div>
              </div>
            </div>
            <Image src={BarCode} alt="barcode" className="absolute bottom-6 left-0 right-0 mx-auto" />
          </div>
          <div className="w-full flex flex-wrap justify-center gap-8">
            <button onClick={handleCardDefault} className="h-full w-[200px] bg-transparent hover:bg-[#24A0B5] border border-[#24A0B5] rounded-[8px] p-3">
              Book Another Ticket
            </button>
            <button onClick={downloadImage} className="h-full w-[200px] bg-[#24A0B5] hover:bg-transparent border border-[#24A0B5] rounded-[8px] p-3">
              Download Ticket
            </button>
          </div>
      </div>
  )
}