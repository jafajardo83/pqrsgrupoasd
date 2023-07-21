import NavBarUser from "../components/navBar/NavBarUser";
import { useEffect } from "react";
import Pqrs from "./Pqrs";


function Dashboard (){

    useEffect(()=>{
        let id=sessionStorage.getItem('id')
        //console.log("el id es"+id+" el nombre "+firstName+" el apellido es "+lastName)
        if(id===''||id===null){
            setTimeout(() => window.location.href="/login", 50);

        }
    },[])
    return(
    <>

    <Pqrs/>
    </>
    );
}

export default Dashboard;