

export default function EditBookingByCampgroundBookingPage ({params} : { params: {cid:string, bid:string}}) {
  return (
    <main>
      <div>
        <p>Campground {params.cid}, Booking {params.bid}</p>
        <div>
          <p>Edit a booking for Booking id {params.bid} in Campground id {params.cid}</p>
          <form></form>
        </div>
      </div>
    </main> 
  )
}
