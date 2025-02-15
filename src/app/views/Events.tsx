"use client"
import AttendeeDetails from "./AttendeeDetails";
import Steps from "../components/Steps";
import TicketSelection from "./TicketSelection";
import Ready from "./Ready";
import { useState, useEffect, ChangeEvent } from "react";
import { setItem, getItem } from "../util/localStorage";

export interface Card {
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
  
  const [card, setCard] = useState<Card>(
    ()=> {
      const items = getItem("ticket")
      return (items as Card) || {
        image: "",
        name: "",
        email: "",
        ticketType: "",
        numberOfTicket: 1,
        specialRequest: ""
      }
    }
  )
  useEffect(() =>{
    setItem("ticket", card)
  }, [card])

  const [ticketTypeError, setTicketTypeError] = useState("")

  const handleNextStep = ()=> {
    if(card.ticketType === "") {
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
    setCard((prev)=> ({...prev, image: image}))
  }

  const getTicketType = (id:string)=> {
    setCard((prev)=> ({...prev, ticketType: id}))
  }
  const getNumberOfTicket = (id:number)=> {
    setCard((prev)=> ({...prev, numberOfTicket: id}))
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=> {
    const { name, value } = e.target

    setCard((prev)=> ({...prev, [name]: value}))
  }
  return (
    <div className="w-[700px] max-[800px]:w-full bg-[#041E23] space-y-[32px] border border-[#0E464F] p-12 max-[615px]:p-8 max-[451px]:p-5 rounded-[40px]">
      <Steps currentStep={currentStep} progressBar={progressBarWidth} />
      {
        currentStep === 1 ? 
        <TicketSelection handleNextStep={handleNextStep} getTicketType={getTicketType} getNumberOfTicket={getNumberOfTicket} error={ticketTypeError} /> : 
        currentStep === 2 ? 
        <AttendeeDetails handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} card={card} handleChange={handleChange} getImage={getImage} /> :
        
        <Ready handleFirstStep={handleFirstStep} card={card} />
      }
    </div>
  );
}
