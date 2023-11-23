"use client"
import TextField from "./TextField";
import Button from '@mui/material/Button';
import globalStyles from "../app/Global.module.css"
import { revalidatePath } from "next/cache";
import React, {createContext, useContext, useEffect, useState, FormEvent} from 'react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/contexts/snackbarContext';

export default function EditCampgroundForm({cid}:{cid:string}) {
    const router = useRouter();
    const { displaySnackbar } = useSnackbar();

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [postalcode, setPostalcode] = useState('')
    const [tel, setTel] = useState('')
    const [picture, setPicture] = useState('')

    useEffect(() => {
        const fetchCampgroundData = async () => {
            try {
                const res = await fetch(process.env['NEXT_PUBLIC_GATEWAY_URL'] + '/api/v1/campgrounds/' + cid, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await res.json();
                if(data.success) {
                    setName(data.data.name)
                    setAddress(data.data.address)
                    setDistrict(data.data.district)
                    setProvince(data.data.province)
                    setPostalcode(data.data.postalcode)
                    setTel(data.data.tel)
                    setPicture(data.data.picture)
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchCampgroundData();
    }, [])  
    const editCampground = async (event: FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior

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
        const token = localStorage.getItem('token')
        const res = await fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + '/api/v1/campgrounds/' + cid, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(req)
        });

        const data = await res.json();

        if (!data.success) {
            console.log(data.message);
            if(postalcode.length > 5){
                displaySnackbar("Postalcode cannot be more than 5 digits","error")
            }
            else{
                displaySnackbar("Name already exist","error")
            }
        } else {
            router.push('/campgrounds');
        }
        } catch (error) {
        console.log(error);
        }
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }
    const handleDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistrict(event.target.value)
    }
    const handleProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProvince(event.target.value)
    }
    const handlePostalcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostalcode(event.target.value)
    }
    const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTel(event.target.value)
    }
    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPicture(event.target.value)
    }


    return(
        <div>
            <form className={globalStyles.FormContainer} onSubmit={editCampground}> 
                <h5>Edit Campground</h5>
                <TextField  label="Name"  autoComplete='off' name='name' id='name' value={name} onChange={handleNameChange}/>
                <TextField  label="Address"  autoComplete='off' name='address' id="address" value={address} onChange={handleAddressChange}/>
                <TextField  label="Distinct"  autoComplete='off' name='district' id="district" value={district} onChange={handleDistrictChange}/>
                <TextField  label="Province"  autoComplete='off' name='province' id="province" value={province} onChange={handleProvinceChange}/>
                <TextField  label="Postal Code"  autoComplete='off' name='postalcode' id="postalcode" value={postalcode} onChange={handlePostalcodeChange}/>
                <TextField  label="Tel (optional)"  autoComplete='off' name='tel' id="tel" value={tel} onChange={handleTelChange}/>
                <TextField  label="picture URL"  autoComplete='off' name='picture' id="picture" value={picture} onChange={handlePictureChange}/>
                <Button type="submit" variant="outlined" color='inherit' >
                <p>Save</p> 
                </Button> 
            </form>
        </div>
    )
}