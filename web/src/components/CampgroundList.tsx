"use client"
import Button from '@mui/material/Button';
import globalStyles from "../app/Global.module.css"
import { revalidatePath } from "next/cache";
import React, {createContext, useContext, useEffect, useState, FormEvent} from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Divider } from '@mui/material';
import { useAuth } from '@/contexts/authContext/authContext';
interface Campground {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    picture: string;
    __v: number;
    id: string;
}
  
  interface CampgroundListProps {
    campgroundList: Campground[];
  }

const CampgroundList: React.FC = () => {
    const router = useRouter();

    const [campgroundList, setCampgroundList] = useState<Campground[]>([]);

    const { role, id } = useAuth();

    useEffect(() => {
        const fetchCampgroundData = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log("token : ", token);
                const res = await fetch(process.env['NEXT_PUBLIC_GATEWAY_URL'] + '/api/v1/campgrounds', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const data = await res.json();
                if(data.success) {
                    console.log("camp data : ", data);  
                    setCampgroundList(data.data)
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchCampgroundData();
    }, []) 

    function DeleteCampground({cid}:{cid:string}){
        const DeleteCampData = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log("token : ", token);
                const res = await fetch(process.env['NEXT_PUBLIC_GATEWAY_URL'] + '/api/v1/campgrounds/' + cid, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const data = await res.json();
                if(data.success) {
                    console.log("delete success"); 
                    setCampgroundList(campgroundList.filter(campground => campground.id !== cid));
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        DeleteCampData();
    }

    

    const CampgroundItem: React.FC<{ campground: Campground }> = ({ campground }) => {
        return (
            <div style={{gap: '20px', width: '70vw'}} >
                <div style={{display: 'flex',flexDirection:'row',justifyContent:'space-between', margin: '20px 0px'}}>
                    <div style={{display: 'flex',flexDirection:'column', gap: '12px', marginLeft: '20px'}} >
                        <h5>{campground.name}</h5>
                        <div>
                            <p style={{color: '#B9C2D9'}}>Address: {campground.address}</p>
                            <p style={{color: '#B9C2D9'}}>District: {campground.district} | Province: {campground.province} | Postal Code: {campground.postalcode}</p>
                            <p style={{color: '#B9C2D9'}}>Tel: {campground.tel}</p>
                        </div>
                        <div style={{display: 'flex',flexDirection:'row', gap: '20px'}}>
                            <Button type="submit" variant="outlined" color='inherit' style={{width:'120px'}} 
                                onClick={(event:FormEvent)=>{
                                    event.preventDefault();
                                    router.push(`/campgrounds/${campground.id}/booking`)
                                }}>
                                <p>Booking</p> 
                            </Button> 
                            {
                                role == 'admin' ? 
                                <>
                                    <Button type="submit" variant="outlined" color='inherit' style={{width:'120px'}} 
                                    onClick={(event:FormEvent)=>{
                                        event.preventDefault();
                                        router.push(`/campgrounds/${campground.id}/edit`)
                                    }}>
                                    <p>Edit</p> 
                                    </Button> 
                                    <Button type="submit" variant="outlined" color='inherit' style={{width:'120px'}} 
                                        onClick={()=>{DeleteCampground({cid: campground.id})}}>
                                        <p>Delete</p> 
                                    </Button> 
                                </> :
                                <></>
                            }
                        </div>
                    </div>
                    <img src={campground.picture} alt={campground.name} style={{width:'300px', height:'150px'}}/>
                </div>
                <Divider sx={{ bgcolor: 'white' }}/>
            </div>
        );
      };
    
      const CampgroundList: React.FC<CampgroundListProps> = ({ campgroundList }) => {
        return (
          <div>
            {campgroundList.map((campground) => (
              <CampgroundItem key={campground._id} campground={campground} />
            ))}
          </div>
        );
      };
      return <CampgroundList campgroundList={campgroundList} />;
}
export default CampgroundList;