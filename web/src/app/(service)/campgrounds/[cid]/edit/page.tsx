import EditCampgroundForm from '../../../../../components/EditCampgroundForm'

export default function EditCampgroundPage ({params} : { params: {cid:string}}) {
  return (
    <main>
      <div>
        {/* <p>Campground {params.cid} (for admin)</p> */}
        <EditCampgroundForm cid={params.cid}></EditCampgroundForm>
      </div>
    </main> 
  )
}
