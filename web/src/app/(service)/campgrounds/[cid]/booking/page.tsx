import CreateBookingForm from '@/components/CreateBookingForm'

export default function BookingByCampgroundPage ({params} : { params: {cid:string}}) {
  return (
    <main>
      <div>
          <CreateBookingForm  cid={params.cid}/>    
      </div>
    </main> 
  )
}
