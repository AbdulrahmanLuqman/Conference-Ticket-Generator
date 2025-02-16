export default function Title(){
    return (
        <div className="w-full flex flex-col items-center gap-2 p-[24px] max-[580px]:p-[10px] rounded-[24px] border border-t-transparent border-b-[#07373F] border-x-[#07373F]">
            <h2 className="text-[62px] text-center max-[552px]:text-[35px] max-[489px]:text-[30px] max-[451px]:text-[25px] font-roadRage">Techember Fest &quot; 25</h2>
            <p className="text-center w-[340px] max-[489px]:w-full">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
            <p className="w-full flex justify-center flex-wrap gap-4 max-[520px]:gap-1 items-center">
                <span>📍 [Event Location]</span>
                <span className="max-[540px]:hidden block">| |</span>
                <span>March 15, 2025 | 7:00 PM</span>
            </p>
        </div>
    )
}