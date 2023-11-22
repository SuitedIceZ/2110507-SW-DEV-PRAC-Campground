'use client'
import AdminCampgroundList from '@/components/AdminCampgroundList'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import Button from '@mui/material/Button'
export default function ViewCampgroundListPage() {
  const router = useRouter();
  return (
    <main>
      <div>
        <div style={{display: 'flex',flexDirection:'row',gap: '20px'}}>
          <h3>Campground</h3>
          <Button type="submit" variant="contained" color='inherit' style={{width:'120px',color:'black',backgroundColor:'white'}} 
            onClick={(event:FormEvent)=>{
              event.preventDefault();
              router.push(`/campgrounds/create`)
            }}>
            <p>Create</p> 
          </Button>
          </div>
        <div>
          <AdminCampgroundList></AdminCampgroundList>
        </div>
      </div>
    </main>
  )
}
