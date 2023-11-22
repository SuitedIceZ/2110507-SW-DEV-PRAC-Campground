"use client"
import styles from "./page.module.css"
import { Button } from "@mui/material";
import TextField from "@/components/TextField";
import PasswordTextField from "@/components/PasswordTextField";
import useRegisterForm from "./useRegisterForm";
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const {
        name,
        email,
        tel,
        password,
        handleNameChange,
        handleEmailChange,
        handleTelChange,
        handlePasswordChange,
        handleSubmit,
      } = useRegisterForm();
      
    const router = useRouter();
    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.header1Title}>Campground</p>
                <p className={styles.header2Title}>Booking</p>
            </div>
                <div>
                    <p className={styles.header3Title}>Register</p>
                    <form className={styles.FormContainer} onSubmit={handleSubmit}>
                        <TextField  label="Name" className="field" autoComplete='off' value={name} onChange={handleNameChange}/>
                        <TextField  label="Email" className="field" autoComplete='off' value={email} onChange={handleEmailChange}/>
                        <TextField  label="Tel" className="field" autoComplete='off' value={tel} onChange={handleTelChange}/>
                        {/* <TextField  label="Password" className="field" autoComplete='off' value={password} onChange={handlePasswordChange}/> */}
                        <PasswordTextField label="Password" className="field" autoComplete='off' value={password} onChange={handlePasswordChange} />
                        <div className="flex center">
                            <Button type="submit" variant="outlined" color='inherit'>Register</Button>  
                        </div>
                        <p>Already have an account? <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            onClick={() => {
                                router.push("/login")
                            }}
                            >
                            Login
                            </Link>
                         </p>
                    </form>
                </div>
            </div>
    );
}
