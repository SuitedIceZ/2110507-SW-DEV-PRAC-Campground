import TextField from "@/components/TextField"
import globalStyles from "../../../Global.module.css"
import Button from '@mui/material/Button';
import CreateCampgroundForm from "@/components/CreateCampgroundForm";

export default function CreateCampgroundPage() {
  return (
    <main>
      <div>
        {/* <p>Campground (for admin)</p> */}
        <CreateCampgroundForm></CreateCampgroundForm>
      </div>
    </main>
  )
}
