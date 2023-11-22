"use client"
import React, { FormEvent } from 'react';
import TextField from "./TextField";
import Button from '@mui/material/Button';
import globalStyles from "../app/Global.module.css"
import { revalidatePath } from "next/cache";
import { useRouter } from 'next/navigation'

export default function CreateCampgroundForm() {
    const router = useRouter();
    const addCampground = async (event: FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const addCampgroundForm = event.target as HTMLFormElement;
        const formData = new FormData(addCampgroundForm);

        const name = formData.get("name") as string;
        const address = formData.get("address") as string;
        const district = formData.get("district") as string;
        const province = formData.get("province") as string;
        const postalcode = formData.get("postalcode") as string;
        const tel = formData.get("tel") as string;
        const picture = formData.get("picture") as string;


        try {
        const req = {
            name: name,
            address: address,
            district: district,
            province: province,
            postalcode: postalcode,
            tel: tel,
            picture: picture
            // ... (repeat for other form fields)
        };

        console.log(req);
        //TODO : auth token
        const token = ""
        const res = await fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + '/api/v1/campgrounds', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(req)
        });

        const data = await res.json();

        if (!data.success) {
            console.log(data.message);
        } else {
            router.push('/campgrounds');
        }
        } catch (error) {
        console.log(error);
        }
    }
    return(
        <div>
            <p>Create new Campground</p>
            <form className={globalStyles.FormContainer} onSubmit={addCampground}> 
                <TextField  label="Name" className="field" autoComplete='off' name='name' id='name'/>
                <TextField  label="Address" className="field" autoComplete='off' name='address' id="address"/>
                <TextField  label="Distinct" className="field" autoComplete='off' name='district' id="district"/>
                <TextField  label="Province" className="field" autoComplete='off' name='province' id="province"/>
                <TextField  label="Postal Code" className="field" autoComplete='off' name='postalcode' id="postalcode"/>
                <TextField  label="Tel (optional)" className="field" autoComplete='off' name='tel' id="tel"/>
                <TextField  label="picture URL" className="field" autoComplete='off' name='picture' id="picture"/>
                <Button type="submit" variant="outlined" color='inherit' >
                <p>Create</p> 
                </Button> 
            </form>
        </div>
    )
}