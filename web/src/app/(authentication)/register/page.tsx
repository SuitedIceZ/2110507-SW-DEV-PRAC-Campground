import styles from "./page.module.css"
import { Button } from "@mui/material";

export default function RegisterPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.header1Title}>Campground</p>
                <p className={styles.header2Title}>Booking</p>
            </div>
                <div>
                    <p>Register</p>
                    <form></form>
                    <Button variant="outlined" color='inherit'>Register</Button>
                </div>
            </div>
    );
}
