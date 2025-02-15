
export default function Steps({currentStep, progressBarWidth}: {currentStep: number, progressBarWidth: number}){
    const steps:string[] = ["Ticket Selection", "Attendance Details", "Ready"]
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-2 items-center flex-wrap">
                <h2 className="text-[32px] max-[307px]:text-[25px]">{steps[currentStep - 1]}</h2>
                <span className="text-[16px] text-[#FAFAFA] w-fit">Step {currentStep}/3</span>
            </div>
            <div className="w-full bg-[#0E464F] h-1 rounded">
                <div style={{ width: `${progressBarWidth}%` }} className={`rounded bg-[#24A0B5] h-full`}></div>
            </div>
        </div>
    )
}