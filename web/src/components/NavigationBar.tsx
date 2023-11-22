import NavigationBarItem from './NavigationBarItem';
import Button from '@mui/material/Button';
import styles from './NavigationBar.module.css'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import globalStyles from '../app/Global.module.css'
export default async function NavigationBar() {
    // TODO : add authorization
    
    return (
        <div className={styles.NavigationBar}>
            <div className={styles.NavigationBarSub}>
                <NavigationBarItem title='Campground' pageRef='/campgrounds'/>
                <NavigationBarItem title='Booking' pageRef='/bookings'/>
            </div>

             <div className={styles.NavigationBarSub}>
                <div className={globalStyles.RowContainer}>   
                    <PermIdentityIcon/>
                    <p>Username</p>
                </div>
                <Button variant="outlined" color='inherit'>
                    <div className={styles.SmallRowContainer}> 
                        <p>Logout</p> 
                        <LogoutIcon/>
                    </div> 
                </Button>
             </div>
        </div>
    )
}