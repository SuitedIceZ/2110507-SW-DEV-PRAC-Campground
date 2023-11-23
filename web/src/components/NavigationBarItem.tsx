import Button from '@mui/material/Button';

export default function NavigationBarItem ({ title, pageRef, isSelected} : {title:string,pageRef:string,isSelected:boolean}) {
    return (
        <Button href={pageRef} color='inherit'>
            <p style={isSelected ? {fontWeight:"700", textTransform:"none"} : {fontWeight:"400", textTransform:"none"}}>{title}</p>
        </Button>
    )

}