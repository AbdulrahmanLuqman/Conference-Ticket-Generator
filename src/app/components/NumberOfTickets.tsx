"use client"

export default function NumberOfTickets({getNumberOfTicket}: {getNumberOfTicket: (id:number)=> void}){
    return (
        <div>
            <label htmlFor="selectTicket">Number of Tickets</label>
            <select id="selectTicket" className="w-full bg-transparent border border-[#07373F] py-2 px-4 rounded-[12px] outline-none">
                {
                    Array.from({length: 9}, (_, id)=> <option onClick={()=> getNumberOfTicket(id)} key={id} value={id}>{id+1}</option>)
                }
            </select>
        </div>
    )
}