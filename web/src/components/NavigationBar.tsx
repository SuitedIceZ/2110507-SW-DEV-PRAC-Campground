'use client'
import NavigationBarItem from './NavigationBarItem';
import Button from '@mui/material/Button';
import styles from './NavigationBar.module.css'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import globalStyles from '../app/Global.module.css'
import { useAuth } from "@/contexts/authContext";

export default function NavigationBar() {
    // TODO : add authorization
    const { name, role, logout } = useAuth()

    return (
        <div className={styles.NavigationBar}>
            <div className={styles.NavigationBarSub}>
                <NavigationBarItem title='Campground' pageRef='/campgrounds'/>
                {
                    role == 'admin' ? 
                    <>
                    <NavigationBarItem title='My Booking' pageRef='/bookings'/>
                    <NavigationBarItem title='All Booking' pageRef='/bookings/all'/>
                    </> 
                    : 
                    <NavigationBarItem title='Booking' pageRef='/bookings'/>
                }
                {/* <NavigationBarItem title='Booking' pageRef='/bookings'/> */}
            </div>

             <div className={styles.NavigationBarSub}>
                <div className={globalStyles.RowContainer}>   
                    <PermIdentityIcon/>
                    <p>{name} {role=='admin'?" (Admin)" : ""}</p>
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