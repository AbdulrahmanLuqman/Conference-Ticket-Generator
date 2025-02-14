"use client"
import Image from "next/image"
import Cloud from "/public/assets/cloud.svg"
import Envelope from "/public/assets/envelope.svg"
import { Card } from "./Events"
import { ChangeEvent, useRef, useState } from "react"

// const CLOUDINARY_API = 

export default function AttendeeDetails({handleNextStep, handlePrevStep, card, handleChange}: {handleNextStep: ()=> void, handlePrevStep: ()=> void, card: Card, handleChange: ()=> void}){
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [picture, setPicture] = useState<string | null>(null)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [requestError, setRequestError] = useState(false)
    const getTicket = (e: any)=> {
        e.preventDefault()

        if(card.name.trim() === ""){
            setNameError(true)
        } else if(card.email.trim() === "") {
            setEmailError(true)
        } else if(card.specialRequest.trim() === ""){
            setRequestError(true)
        }

        else {
            setNameError(false)
            setEmailError(false)
            setRequestError(false)
            handleNextStep()
        }
        
    }
    console.log(card)
    const handleClick = ()=> {
        if (fileRef.current) fileRef.current.click()
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0]

        if (file) {
            const imageURL = URL.createObjectURL(file)
            setPicture(imageURL)
        }
    }
    return (
        <form onSubmit={getTicket} className="p-[24px] max-[451px]:p-[15px] space-y-[32px] border border-[#0E464F] bg-[#08252B] rounded-[32px] w-full">
            <div className="border border-[#07373F] rounded-[24px] w-full bg-[#052228] p-6 space-y-[32px]">
                <label htmlFor="pfp" className="cursor-pointer">Upload Profile Photo*</label>
                <div className="bg-[#00000033] w-full flex justify-center">
                    <label onClick={handleClick} htmlFor="pfp" className="h-[240px] w-[240px] flex flex-col gap-4 justify-center items-center rounded-[32px] bg-[#0E464F] p-6 cursor-pointer">
                        {
                            picture ? <Image src={picture} alt="Cloud" width={240} height={240} /> : <Image src={Cloud} alt="Cloud" />
                        }
                        
                        <p className="text-center">Drag & drop or click to upload</p>
                    </label>
                    <input onChange={handleFileChange} ref={fileRef} type="file" id="pfp" accept="image/*" className="hidden" />
                </div>
            </div>

            <div className="w-full h-1 bg-[#07373F]"></div>

            <div className="flex flex-col gap-2">
                <label htmlFor="name">Enter your name*</label>
                <input type="text" id="name" name="name" value={card.name} onChange={handleChange} className={`outline-none bg-transparent w-full rounded-lg border border-[#07373F] p-3 ${nameError && "border-red-600"}`} />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email">Enter your email*</label>
                <div className={`bg-transparent w-full rounded-lg border border-[#07373F] flex gap-2 overflow-hidden p-3 ${emailError && "border-red-600"}`}>
                    <Image src={Envelope} alt="email" />
                    <input type="text" id="email" name="email" value={card.email} onChange={handleChange} className="outline-none w-full bg-transparent" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="specialRequest">About The Project*</label>
                <textarea id="specialRequest" name="specialRequest" value={card.specialRequest} onChange={handleChange} className={`outline-none bg-transparent w-full rounded-lg border border-[#07373F] p-3 h-[127px] ${requestError && "border-red-600"}`} />
            </div>

            <div className="w-full h-[48px] flex flex-wrap justify-center gap-8">
                <button onClick={handlePrevStep} className="h-full w-[250px] bg-transparent hover:bg-[#24A0B5] border border-[#24A0B5] rounded-[8px] px-3">Back</button>
                <button className="h-full w-[250px] bg-[#24A0B5] hover:bg-transparent border border-[#24A0B5] rounded-[8px]">Get My Free Ticket</button>
            </div>
        </form>
    )
}