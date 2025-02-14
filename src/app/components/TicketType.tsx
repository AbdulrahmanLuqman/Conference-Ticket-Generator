"use client"
export default function TicketType({getTicketType}: {getTicketType: (id: string)=> void}){

    const TICKET_TYPE = [
        {
            access: "REGULAR ACCESS",
            price: "Free",
            left: "20 left!"
        },
        {
            access: "VIP ACCESS",
            price: "Free",
            left: "20 left!"
        },
        {
            access: "VVIP ACCESS",
            price: "Free",
            left: "20 left!"
        }
    ]

    return (
        <div className="space-y-2">
            <h4>Select Ticket Type:</h4>
            <div className="flex flex-wrap gap-4 p-4 border border-[#07373F] rounded-[24px] bg-[#052228]">
                {
                    TICKET_TYPE.map((ticket, index) => <button onClick={()=> getTicketType(ticket.access)} key={index} className="w-[242px] p-2 rounded-xl flex justify-between items-start border border-[#197686] hover:bg-[#197686]">
                        <span className="flex flex-col items-start">
                            <span>{ticket.access}</span>
                            <span className="text-[14px]">{ticket.left}</span>
                        </span>
                        <span className="border border-[#2BA4B9] rounded-lg bg-[#0E464F] p-2 w-[80px] flex justify-end font-semibold">{ticket.price}</span>
                    </button>)
                }
            </div>
        </div>
    )
}