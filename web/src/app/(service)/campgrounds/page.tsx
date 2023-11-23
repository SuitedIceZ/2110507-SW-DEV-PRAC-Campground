'use client'
import CampgroundList from '@/components/CampgroundList'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'
import { FormEvent } from 'react'
import Button from '@mui/material/Button'

export default function ViewCampgroundListPage() {
  const router = useRouter();
  const { role } = useAuth();
  return (
    <main>
      <div>
        <div style={{display: 'flex',flexDirection:'row',gap: '20px'}}>
          <h3>Campground</h3>
          {
            role == 'admin' ? 
              <Button type="submit" variant="contained" color='inherit' style={{width:'120px',color:'black',backgroundColor:'white'}} 
                onClick={(event:FormEvent)=>{
                  event.preventDefault();
                  router.push(`/campgrounds/create`)
                }}>
                <p>Create</p> 
              </Button> :
              <></>
          }
          </div>
        <div>
          <CampgroundList></CampgroundList>
        </div>
      </div>
    </main>
  )
}
