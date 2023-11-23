'use client'
import NavigationBarItem from './NavigationBarItem';
import Button from '@mui/material/Button';
import styles from './NavigationBar.module.css'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import globalStyles from '../app/Global.module.css'
import { useAuth } from "@/contexts/authContext/authContext";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

enum SelectingPage {
    Campground,
    MyBooking,
    AllBooking,
}



export default function NavigationBar() {
    const { name, role, logout } = useAuth()
    const [selectedPage, setSelectedPage] = useState<SelectingPage>(SelectingPage.Campground)
    const router = useRouter()

    useEffect(()=>{
        const pathList = window.location.pathname.split('/').reverse();
        if(pathList[0] == 'bookings'){
            setSelectedPage(SelectingPage.MyBooking)
        }
        else if(pathList[0] == 'all'){
            setSelectedPage(SelectingPage.AllBooking)
        }
        
    },[])
    return (
        <div className={styles.NavigationBar}>
            <div className={styles.NavigationBarSub}>
                <NavigationBarItem title='Campground' pageRef='/campgrounds' isSelected={selectedPage==SelectingPage.Campground}/>
                {
                    role == 'admin' ? 
                    <NavigationBarItem title='All Booking' pageRef='/bookings' isSelected={selectedPage==SelectingPage.AllBooking}/>
                    : 
                    <NavigationBarItem title='Booking' pageRef='/bookings' isSelected={selectedPage==SelectingPage.MyBooking}/>
                }
            </div>

             <div className={styles.NavigationBarSub}>
                <div className={globalStyles.RowContainer} style={{marginTop:'6px'}}>   
                    <PermIdentityIcon/>
                    <p style={{fontSize:'14px'}}>{name} {role=='admin'?" (Admin)" : ""}</p>
                </div>
                <Button variant="outlined" color='inherit' onClick={logout}>
                    <div className={styles.SmallRowContainer}> 
                        <p>Logout</p> 
                        <LogoutIcon/>
                    </div> 
                </Button>
             </div>
        </div>
    )
}