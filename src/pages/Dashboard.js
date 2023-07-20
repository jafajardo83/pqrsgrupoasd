import NavBarUser from "../components/navBar/NavBarUser";
import { useEffect } from "react";


function Dashboard (){

    useEffect(()=>{
        let id=sessionStorage.getItem('id')
        let firstName=sessionStorage.getItem('firstName')
        let lastName=sessionStorage.getItem('lastName')
        //console.log("el id es"+id+" el nombre "+firstName+" el apellido es "+lastName)
        if(id===''||id===null){
            setTimeout(() => window.location.href="/login", 50);

        }
    },[])
    return(
    <>
    <NavBarUser/>
    </>
    );
}

export default Dashboard;