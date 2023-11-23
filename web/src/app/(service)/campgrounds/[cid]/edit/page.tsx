import EditCampgroundForm from '../../../../../components/EditCampgroundForm'

export default function EditCampgroundPage ({params} : { params: {cid:string}}) {
  return (
    <main>
      <div>
        <EditCampgroundForm cid={params.cid}></EditCampgroundForm>
      </div>
    </main> 
  )
}
