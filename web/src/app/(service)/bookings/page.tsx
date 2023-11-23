"use client"
import BookingList from '@/components/BookingList';
import { Suspense } from 'react'
import { CircularProgress } from '@mui/material';
import { useAuth } from '@/contexts/authContext/authContext';
export default function ViewBookingListPage() {
  const { role } = useAuth()

  return (
    <main>
      <div>
        {
          role == 'admin' ? 
          <h3>All booking</h3> :
          <h3>My booking</h3>
        }
        <Suspense fallback={<p>now loading <CircularProgress/></p>}>
          <BookingList></BookingList>
        </Suspense>
      </div>
    </main>
  )
}
