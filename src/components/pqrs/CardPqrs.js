import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Pqrs.css';

function CardPqrs({ pqrs,setUplist,upList,handleClose,handleOpen,setDataModal }) {

     
    function formatDate(date) {
        const options = { day: 'numeric', year: 'numeric', month: 'short' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);

        // Split the formatted date into day, month, and year parts
        const [day, month, year] = formattedDate.split(' ');

        // Return the formatted date with uppercase month abbreviation and desired format
        return `${day} ${month} ${year}`;
    }

    const handleEdit=()=>{
        handleOpen();
        setDataModal(pqrs);
    }

     /*1. Crear petición asíncrona*/
     const url2="http://localhost:5000/pqrs"; 

     /*2. Función para borrar un registro a partir del evento botón eliminar*/
        const handleDelete=async()=>{
         
         Swal.fire({
             title: 'Está seguro que desea eliminar este registro?',
             text: "No puedes revertir está acción!",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             cancelButtonText:"Cancelar",
             confirmButtonText: 'Sí, Bórralo!'
           }).then((result) => {
 
             if (result.isConfirmed) {
                 /*Eliminando de la BD */
                 axios.delete(`${url2}/${pqrs.id}`).then((response)=>{
                 console.log(response);
                 
                 /*Eliminando del estado */
                   if (response.status === 200) {
                     Swal.fire(
                         'Eliminado!',
                         `El PQRS ha sido eliminado exitosamente!`,
                         'success'
                     )
                     setUplist(!upList);
                 }else {
                     Swal.fire(
                         'Error!',
                         'Hubo un problema al eliminar el PQRS!',
                         'error'
                     )
                 }
        });
             }
         
           })
         
         
     }
    return (
        
        
            <Card  style={{ width: '100%' }} key={pqrs.id} className="card-pqrs">
                
                <Card.Title className="card-pars-title">PQRS No. <br/>{pqrs.id}</Card.Title>
                
                <Card.Body>    
                    <Card.Text>
                        <p><strong>Fecha:</strong> {formatDate(pqrs.date)}</p>
                        <p><strong>Tipo:</strong> {pqrs.type}</p>
                        <p><strong>Descripción:</strong> {pqrs.description}</p>
                        <p><strong>Area(s):</strong> {pqrs.areas.map(a => a.area).join(' | ')}</p>
                        <p><strong>Funcionario(s):</strong> {pqrs.officers.map(o => o.officer).join(' | ')}</p>
                        <p><strong>Estado:</strong> {pqrs.state}</p>
                    </Card.Text>
                    <div className="text-center">
                        <button className="button-blue" onClick={handleEdit}><i className="fa-solid fa-pencil"></i> Editar</button>
                       
                        <button className="button-gray" onClick={handleDelete}> <i className="fa-solid fa-trash"></i> Eliminar</button>
                     
                    </div>
                </Card.Body> 
            </Card> 

    );
}

export default CardPqrs;