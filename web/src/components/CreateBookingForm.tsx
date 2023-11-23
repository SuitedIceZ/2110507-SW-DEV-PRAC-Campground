"use client"
import Button from '@mui/material/Button';
import globalStyles from "../app/Global.module.css"
import { revalidatePath } from "next/cache";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, {createContext, useContext, useEffect, useState, FormEvent} from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/contexts/snackbarContext';

export default function CreateBookingForm({cid}:{cid:string}) {
    const router = useRouter();
    const { displaySnackbar } = useSnackbar();

    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)
    const [checkoutDate, setCheckoutDate] = useState<Dayjs|null>(null)  

    const [campName, setCampName] = useState('') 
    const [campPictureURL, setCampPictureURL] = useState('') 

    const fetchCampgroundData = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log("token : ", token);
            const res = await fetch(process.env['NEXT_PUBLIC_GATEWAY_URL'] + '/api/v1/campgrounds/' + cid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await res.json();
            if(data.success) {
                console.log("camp data : ", data);
                setCampPictureURL(data.data.picture)
                setCampName(data.data.name)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    fetchCampgroundData();

    const CreateBooking = async (event: FormEvent) => {
        event.preventDefault(); 
        try {
        const req = {
            bookingDate: bookingDate,
            checkoutDate: checkoutDate,
        };
        console.log(req);
        const token = localStorage.getItem('token')
        const res = await fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + '/api/v1/campgrounds/'+ cid +'/bookings', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(req)
        });

        const data = await res.json();

        if (!data.success) {
            displaySnackbar(data.message,'error')
            console.log(data.message);
        } else {
            router.push('/campgrounds');
        }
        } catch (error) {
            
            console.log(error);
        }
    }

    const handleBookingDateChange = (value: Dayjs) => {
        setBookingDate(value)
    }
    const handleCheckoutDateChange = (value: Dayjs) => {
        setCheckoutDate(value)
    }
    return(
        <div>
            <div className={globalStyles.CampBookingContainer}>
                <form className={globalStyles.FormContainer} onSubmit={CreateBooking}> 
                    <h5>{campName}</h5>
                    <p style={{color: '#B9C2D9'}}>You can only book up to 3 nights.</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="BookingDate"
                        value={bookingDate}
                        onChange={(value)=>{handleBookingDateChange(value!)}}
                        slotProps={{
                            textField: {
                            variant: 'filled',
                            sx: {
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                '& ::-ms-reveal': { display: 'none',  },
                                '& ::-ms-clear': { display: 'none', },
                            },
                            },
                        }} />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="CheckoutDate"
                        value={checkoutDate}
                        onChange={(value)=>{handleCheckoutDateChange(value!)}}
                        slotProps={{
                            textField: {
                            variant: 'filled',
                            sx: {
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                '& ::-ms-reveal': { display: 'none',  },
                                '& ::-ms-clear': { display: 'none', },
                            },
                            },
                        }} />
                        </LocalizationProvider>

                    <Button type="submit" variant="outlined" color='inherit' >
                    <p>Booking</p> 
                    </Button> 
                </form>

                <Image 
                    className={globalStyles.ImageBorder}
                    src={campPictureURL}
                    width={800} height={500} alt={campPictureURL} >
                </Image>
            </div>
        </div>
    )
}