import EditBookingForm from "@/components/EditBookingForm"

export default function EditBookingByCampgroundBookingPage ({params} : { params: {cid:string, bid:string}}) {
  return (
    <main>
      <div>
        {/* <p>Campground {params.cid}, Booking {params.bid}</p> */}
        <EditBookingForm bid={params.bid} cid={params.cid}/>        
      </div>
    </main> 
  )
}
