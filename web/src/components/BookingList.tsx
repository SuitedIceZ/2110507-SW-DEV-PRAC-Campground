"use client"
import React, { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Divider, Button } from '@mui/material';
import { useAuth } from '@/contexts/authContext';

interface Booking {
  _id: string;
  bookingDate: string;
  checkoutDate: string;
  user: {
    _id: string;
    name: string;
    email: string;
    tel: string;
  };
  campground: {
    _id: string;
    name: string;
    address: string;
    tel: string;
    id: string;
  };
  createdAt: string;
  __v: number;
}

interface BookingListProps {
  bookingList: Booking[];
}

const BookingList: React.FC = () => {
  const router = useRouter();
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const { role } = useAuth();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token : ', token);
        const res = await fetch(process.env['NEXT_PUBLIC_GATEWAY_URL'] + '/api/v1/bookings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          console.log('booking data : ', data);
          setBookingList(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookingData();
  }, []);

    function DeleteBooking({bid}:{bid:string}){
        const DeleteBookingData = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log("token : ", token);
                const res = await fetch(process.env['NEXT_PUBLIC_GATEWAY_URL'] + '/api/v1/bookings/' + bid, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const data = await res.json();
                if(data.success) {
                    console.log("delete success"); 
                    window.location.reload();
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        DeleteBookingData();
    }
  

  const BookingItem: React.FC<{ booking: Booking }> = ({ booking }) => {
    return (
      <div style={{ gap: '20px', width: '70vw' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px 0px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginLeft: '20px' }}>
            <h5>{booking.campground.name}</h5>
            {
                    role == 'admin' ? 
                    <>
                        <p style={{ color: '#B9C2D9' }}>Booked by: {(booking.user.name)}</p>
                    </> :
                    <></>
            }
            <div>
                <p style={{ color: '#B9C2D9' }}>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p style={{ color: '#B9C2D9' }}>Checkout Date: {new Date(booking.checkoutDate).toLocaleDateString()}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
                  <Button type="submit" variant="outlined" color="inherit" style={{ width: '120px' }}
                    onClick={(event:FormEvent)=>{
                        event.preventDefault();
                        router.push(`/campgrounds/${booking.campground.id}/booking/${booking._id}/edit`)
                    }}>
                    <p>Edit</p>
                  </Button>
                  <Button type="submit" variant="outlined" color="inherit" style={{ width: '120px' }}
                    onClick={() => {
                        DeleteBooking({bid: booking._id})
                    }} >
                    <p>Delete</p>
                  </Button>
                  
            </div>
          </div>
        </div>
        <Divider sx={{ bgcolor: 'white' }} />
      </div>
    );
  };
  const BookingList: React.FC<BookingListProps> = ({ bookingList }) => {
    return (
      <div>
        {bookingList.map((booking) => (
          <BookingItem key={booking._id} booking={booking} />
        ))}
      </div>
    );
  };
  return <BookingList bookingList={bookingList} />;
};

export default BookingList;
