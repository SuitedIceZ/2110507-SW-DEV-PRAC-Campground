import CreateBookingForm from '@/components/CreateBookingForm'

export default function BookingByCampgroundPage ({params} : { params: {cid:string}}) {
  return (
    <main>
      <div>
        {/* <p>Campground {params.cid}</p> */}
          <CreateBookingForm  cid={params.cid}/>    
      </div>
    </main> 
  )
}
