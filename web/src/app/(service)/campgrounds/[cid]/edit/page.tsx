

export default function EditCampgroundPage ({params} : { params: {cid:string}}) {
  return (
    <main>
      <div>
        <p>Campground {params.cid} (for admin)</p>
        <div>
          <p>Edit a Campground id {params.cid}</p>
          <form></form>
        </div>
      </div>
    </main> 
  )
}
