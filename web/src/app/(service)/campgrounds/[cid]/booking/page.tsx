

export default function BookingByCampgroundPage ({params} : { params: {cid:string}}) {
  return (
    <main>
      <div>
        <p>Campground {params.cid}</p>
        <div>
          <p>Create new booking for Campground id {params.cid}</p>
          <form></form>
        </div>
      </div>
    </main> 
  )
}
