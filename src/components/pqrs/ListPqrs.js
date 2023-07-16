import axios from 'axios';
import {useEffect, useState} from 'react';
import {Container,Row} from 'react-bootstrap';
import CardEstudiantes from './CardEstudiantes';
function ListPqrs() {

    /*1. Definir url del api a la que me voy a conectar */
    const url="https://hoteliakuepa.herokuapp.com/reservas";

    /*2. Generar función asíncrona para conectarme al API */
    const getData=async()=>{
        const response=axios.get(url);
        return response;
    }

    /*3. UseState para guardar la respuesta de la petición */

    const [list,setList]=useState([]);
    /*5. Crear otro estado para refrescar el listado después de eliminar */
    const [upList,setUplist]=useState([false]);
    /*4. hook useEfect ejecuta funciones cada vez que  renderizamos un componente*/
    useEffect(()=>{
        getData().then((response)=>{
            setList(response.data);
        })
    },[upList])
    console.log(list);
    return(
        <Container>
            <Row>
                {
                    list.map((es,index)=>(
                        <CardEstudiantes
                        key={index}
                        estudiante={es}
                        setUplist={setUplist}
                        upList={upList}
                        />
                    ))   
                }
                
            </Row>
        </Container>
    );
}

export default ListPqrs;