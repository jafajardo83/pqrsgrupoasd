//import dobleroom from '../../img/doble-room.jpg';
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import CardUser from "./CardUser.js"

function ListUser() {

    /* 1. Definir url del API a la que me voy a conectar */
    const url = "http://localhost:5000/users";
    /*2.Generar fución asincrona*/
    const getData = async () => {
        const response = axios.get(url);
        return response;
    }
    /*3. UseState para guardar la respuesta de la petición*/
    const [list, setList] = useState([]);
    /*5.Crear otro estado para refrescar el listado despues de eliminar*/
    const [upList, setUplist] = useState([false]);

    /*4.Hook useEfect ejecuta funciones cada vez que renderizamos un componente*/
    useEffect(() => {
        getData().then((response) => {
            setList(response.data);
        })
    }, [upList])
    //console.log([list]);
    return (
        <>
            <div className='title-user mt-5 mb-5'>
                <h2>Usuarios</h2>
            </div>
            <div className="">
                        <Link to="/register-user" ><Button className="">Registrar Usuario</Button></Link>
            </div>
            <div className='list-users'>

                {
                list.map((es, index) => (
                    <CardUser
                        key={index}
                        user={es}
                        setUplist={setUplist}
                        upList={upList}
                    />
                ))
                }
            </div>
        </>
    );
}

export default ListUser;