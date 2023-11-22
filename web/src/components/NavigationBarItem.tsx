import Button from '@mui/material/Button';

export default function NavigationBarItem ({ title, pageRef} : {title:string,pageRef:string}) {
    return (
        <Button href={pageRef} color='inherit'>{title}</Button>
    )

}