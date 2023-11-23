import Button from '@mui/material/Button';
import { Prompt } from 'next/font/google'

const inter = Prompt({weight: '400', subsets: ['thai']})

export default function NavigationBarItem ({ title, pageRef, isSelected} : {title:string,pageRef:string,isSelected:boolean}) {
    return (
        <Button className={inter.className} href={pageRef} color='inherit'>
            <p className={inter.className} style={isSelected ? {fontWeight:"700", textTransform:"none"} : {fontWeight:"200", textTransform:"none"}}>{title}</p>
        </Button>
    )

}