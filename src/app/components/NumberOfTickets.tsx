"use client"

export default function NumberOfTickets({getNumberOfTicket}: {getNumberOfTicket: (id:number)=> void}){
    
    return (
        <div>
            <label htmlFor="selectTicket">Number of Tickets</label>
            <select id="selectTicket" onChange={(e) => getNumberOfTicket(Number(e.target.value))} className="w-full bg-transparent border border-[#07373F] py-2 px-4 rounded-[12px] outline-none">
            {Array.from({ length: 10 }, (_, index) => {
              const id = index + 1
              return (
                <option key={id} value={id} className="bg-[#07373F] text-white py-2 px-4 cursor-pointer">
                  {id}
                </option>
              );
            })}
            </select>
        </div>
    )
}