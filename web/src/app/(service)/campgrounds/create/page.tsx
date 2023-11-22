import TextField from "@/components/TextField"
import globalStyles from "../../../Global.module.css"

export default function CreateCampgroundPage() {
  return (
    <main>
      <div>
        {/* <p>Campground (for admin)</p> */}
        <div>
          <p>Create new Campground</p>
          <form className={globalStyles.FormContainer}> 
            <TextField  label="Name" className="field" autoComplete='off'/>
            <TextField  label="Address" className="field" autoComplete='off'/>
            <TextField  label="Distinct" className="field" autoComplete='off'/>
            <TextField  label="Province" className="field" autoComplete='off'/>
            <TextField  label="Postal Code" className="field" autoComplete='off'/>
            <TextField  label="Tel (optional)" className="field" autoComplete='off'/>
            <TextField  label="picture URL" className="field" autoComplete='off'/>
          </form>
        </div>
      </div>
    </main>
  )
}
