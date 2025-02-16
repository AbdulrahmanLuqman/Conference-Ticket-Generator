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
            price: "$150",
            left: "20 left!"
        },
        {
            access: "VVIP ACCESS",
            price: "$250",
            left: "20 left!"
        }
    ]

    return (
        <div className="space-y-2">
            <h4>Select Ticket Type:</h4>
            <div className="flex flex-wrap justify-center gap-4 p-4 border border-[#07373F] rounded-[24px] bg-[#052228]">
                {
                    TICKET_TYPE.map((ticket, index) => <button onClick={()=> getTicketType(ticket.access)} key={index} className="w-[158px] max-[521px]:w-full p-3 rounded-xl flex gap-3 flex-col justify-between items-start border border-[#197686] hover:bg-[#197686] focus:bg-[#197686]">
                        <h3 className="text-[24px] font-semibold">{ticket.price}</h3>
                        <span className="flex items-start flex-col">
                            <span>{ticket.access}</span>
                            <span className="text-sm">{ticket.left}/52</span>
                        </span>
                    </button>)
                }
            </div>
        </div>
    )
}