"use client"
import Image from "next/image"
import Cloud from "/public/assets/cloud.svg"
import Envelope from "/public/assets/envelope.svg"
import { Ticket } from "./Events"
import { ChangeEvent, useRef, useState, FormEvent } from "react"

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzeryevl5/image/upload";
const UPLOAD_PRESET = "ml_default";

interface Error {
    image: string;
    name: string;
    email: string;
    specialRequest: string;
}

export default function AttendeeDetails({handleNextStep, handlePrevStep, ticket, handleChange, getImage}: {handleNextStep: ()=> void, handlePrevStep: ()=> void, ticket: Ticket, handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=> void, getImage: (image:string)=> void}){
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [ticketError, setTicketError] = useState<Error>({
        image: "",
        name: "",
        email: "",
        specialRequest: "",
    })

    const ValidateForms = ()=> {
        const error:Error = {
            image: "",
            name: "",
            email: "",
            specialRequest: "",
        }

        if(!ticket.image) error.image = "Image is required"

        if(!ticket.name) error.name = "Name is required"

        if(!ticket.email) {
            error.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(ticket.email)) {
            error.email = "Email address is not valid"
        }
        
        if(!ticket.specialRequest) error.specialRequest = "Type in your request or NIL"

        setTicketError(error)

        return Object.values(error).some((msg) => msg !== "");

    }
    const getTicket = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault() 

        const hasError = ValidateForms()

        if (hasError) return

        handleNextStep()
    }
    const handleClick = ()=> {
        if (fileRef.current) fileRef.current.click()
    }
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0];
        if (!file) return

        const imageURL = URL.createObjectURL(file);
        getImage(imageURL);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(CLOUDINARY_URL, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            getImage(data.secure_url);
        } catch (error) {
            console.error("Upload failed", error);
        }
    }

    return (
        <form onSubmit={getTicket} className="p-[24px] max-[451px]:p-[15px] space-y-[32px] border border-[#0E464F] bg-[#08252B] rounded-[32px] w-full">
            <div className="border border-[#07373F] rounded-[24px] w-full bg-[#052228] p-6 space-y-[32px]">
                <label htmlFor="pfp" className="cursor-pointer">Upload Profile Photo*</label>
                <div className="bg-[#00000033] w-full flex justify-center">
                    <label onClick={handleClick} className={`relative h-[240px] w-[240px] flex flex-col gap-4 justify-center items-center rounded-[32px] bg-[#0E464F] cursor-pointer overflow-hidden`}>
                        {
                            ticket.image ? <Image src={ticket.image} alt="Cloud" width={240} height={240} unoptimized /> : 
                            (
                                <>
                                    <Image src={Cloud} alt="Cloud" />
                                    <p className="text-center px-6">Drag & drop or click to upload</p>
                                </>
                            )
                        }
                    </label>
                    <input onClick={(e) => e.stopPropagation()} onChange={handleFileChange} ref={fileRef} type="file" id="pfp" accept="image/*" className="hidden" />
                </div>
            </div>

            <div className="w-full h-1 bg-[#07373F]"></div>

            <div className="flex flex-col gap-2">
                <label htmlFor="name">Enter your name*</label>
                <input type="text" id="name" name="name" value={ticket.name} onChange={handleChange} className={`outline-none bg-transparent w-full rounded-lg border border-[#07373F] p-3`} />
                <span className="text-red-500">{ticketError.name}</span>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email">Enter your email*</label>
                <div className={`bg-transparent w-full rounded-lg border border-[#07373F] flex gap-2 overflow-hidden p-3`}>
                    <Image src={Envelope} alt="email" />
                    <input type="text" id="email" name="email" value={ticket.email} onChange={handleChange} className="outline-none w-full bg-transparent" />
                </div>
                <span className="text-red-500">{ticketError.email}</span>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="specialRequest">Special Request?*</label>
                <textarea id="specialRequest" name="specialRequest" value={ticket.specialRequest} onChange={handleChange} className={`outline-none bg-transparent w-full rounded-lg border border-[#07373F] p-3 h-[127px]`} />
                <span className="text-red-500">{ticketError.specialRequest}</span>
            </div>

            <div className="w-full flex flex-wrap-reverse justify-center gap-8">
                <button onClick={handlePrevStep} className="h-full w-[250px] bg-transparent hover:bg-[#24A0B5] border border-[#24A0B5] rounded-[8px] p-3">Back</button>
                <button className="h-full w-[250px] bg-[#24A0B5] hover:bg-transparent border border-[#24A0B5] rounded-[8px] p-3">Get My Free Ticket</button>
            </div>
        </form>
    )
}