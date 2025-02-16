"use client"
import AttendeeDetails from "./AttendeeDetails";
import Steps from "../components/Steps";
import TicketSelection from "./TicketSelection";
import Ready from "./Ready";
import { useState, ChangeEvent } from "react";
import { useStorage } from "../hooks/useStorage";

export interface Ticket {
  image: string
  name: string;
  email: string;
  ticketType: string;
  numberOfTicket: number | string;
  specialRequest: string;
}
export default function Events() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  
  const [progressBarWidth, setProgressBarWidth] = useState<number>(33.3)
  
  const [ticket, setTicket] = useStorage<Ticket>("ticket", {
    image: "",
    name: "",
    email: "",
    ticketType: "",
    numberOfTicket: 1,
    specialRequest: ""
  })

  const handleCardDefault  = ()=> {
    handleFirstStep()
      localStorage.removeItem("ticket")
      setTicket({ 
        image: "",
        name: "",
        email: "",
        ticketType: "",
        numberOfTicket: 1,
        specialRequest: ""
      });
    };

  const [ticketTypeError, setTicketTypeError] = useState("")

  const handleNextStep = ()=> {
    if(ticket.ticketType === "") {
      setTicketTypeError("Choose a ticket")
      return
    }

    setTicketTypeError("")
    setCurrentStep(prev => prev + 1)
    setProgressBarWidth((prev) => Math.min(prev + 33.3, 100));
  }

  const handlePrevStep = ()=> {
    setCurrentStep(prev => prev - 1)
    setProgressBarWidth(prev => prev - 33.3)
  }
  const handleFirstStep = ()=> {
    setCurrentStep(1)
    setProgressBarWidth(33.3)
  }

  const getImage = (image: string)=> {
    setTicket((prev)=> ({...prev, image: image}))
  }

  const getTicketType = (id:string)=> {
    setTicket((prev)=> ({...prev, ticketType: id}))
  }
  const getNumberOfTicket = (id:number)=> {
    setTicket((prev)=> ({...prev, numberOfTicket: id}))
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=> {
    const { name, value } = e.target

    setTicket((prev)=> ({...prev, [name]: value}))
  }

  console.log(ticket)
  return (
    <div className="w-[700px] max-[800px]:w-full bg-[#041E23] space-y-[32px] border border-[#0E464F] p-12 max-[615px]:p-8 max-[451px]:p-5 rounded-[40px]">
      <Steps currentStep={currentStep} progressBarWidth={progressBarWidth} />
      {
        currentStep === 1 ? 
        <TicketSelection handleNextStep={handleNextStep} getTicketType={getTicketType} getNumberOfTicket={getNumberOfTicket} error={ticketTypeError} /> : 
        currentStep === 2 ? 
        <AttendeeDetails handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} ticket={ticket} handleChange={handleChange} getImage={getImage} /> :
        
        <Ready ticket={ticket} handleCardDefault={handleCardDefault} />
      }
    </div>
  );
}
