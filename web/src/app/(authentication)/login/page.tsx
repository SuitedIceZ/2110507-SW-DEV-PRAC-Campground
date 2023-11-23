"use client"
import styles from "./page.module.css"
import globalStyles from "../../Global.module.css"
import { Button } from "@mui/material";
import useLoginForm from "./useLoginForm";
import PasswordTextField from "@/components/PasswordTextField";
import TextField from "@/components/TextField";
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const {
    email,
    password,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  } = useLoginForm();

  const router = useRouter();

    return (
      <div className={styles.pageContainer}>
      <div className={styles.titleContainer}>
          <p className={styles.header1Title}>Campground</p>
          <p className={styles.header2Title}>Booking</p>
      </div>
          <div>
            <p className={styles.header3Title}>Login</p>
              <form className={styles.FormContainer} onSubmit={handleSubmit}>
                <TextField  label="Email" className="field" autoComplete='off' value={email} onChange={handleEmailChange}/>
                <PasswordTextField label="Password" className="field" autoComplete='off' value={password} onChange={handlePasswordChange} />
                        
                <div className="flex center">
                  <Button type='submit' variant="outlined" color='inherit'>Login</Button>
                </div>
                <p>Does not have an account? <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    onClick={(event) => {
                        event.preventDefault()
                        router.push("/register")
                    }}
                    >
                    Register
                    </Link>
                  </p>
              </form>
          </div>
      </div>
    )
  }