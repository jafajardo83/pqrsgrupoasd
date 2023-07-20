import axios from "axios";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
//import { useHistory } from "react-router";
import Swal from 'sweetalert2'
import NavBar from "../navBar/NavBar";
import './User.css';
import { useNavigate } from "react-router-dom";

function FormUsers(){

    /*5. Constante history para retornar al listado*/
    
    
    /*1.Inicializamos los inputs en el estado, para poder recibir los valores que se digiten 
    en él y controlarlos */
    const [data,setData]=useState({id:"",firstName:"",lastName:"",email:"",password:""});
    /*2. Se usa la función handleChange para que cada vez que haya un cambio en el input
    guarde el name y el value del mismo */
    const handleChange=({target})=>{
        //Cada vez que haya un cambio se va a guardar el valor en el estado data
        setData({
            ...data,
            [target.name]:target.value
        })
    }

    /*4. Crear petición asíncrona*/
    const url="http://localhost:5000/users";  
    const navigate=useNavigate();
    /*3. funci{on para procesar el envío del formulario*/
        const handleSubmit=async(e)=>{
            e.preventDefault();
            const response=await axios.post(url,data);//await espera hasta que se ejcute la petición
            console.log(response);
            if (response.status === 201) {
                
                Swal.fire(
                    'Guardado!',
                    `El usuario <strong> ${response.data.firstName} ${response.data.lastName}</strong> ha sido guardado exitosamente!`,
                    'success'
                )
                navigate('/login');
            
                
            }else {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al registrar el usuario!',
                    'error'
                )
            }
        }
    return(
        
        <>
        <NavBar/>
        <Container>
        <div id="form-user">
        <h1 className="text-center mt-3">Datos Usuario</h1>
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>No. Documento <span className="req">*</span></Form.Label>
                <Form.Control 
                type="number" 
                placeholder="Ingrese su número de documento"
                name="id" 
                value={data.id}
                
                onChange={handleChange}/> 
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Nombre <span className="req">*</span></Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Ingrese su nombre"
                name="firstName" 
                value={data.firstName}
                onChange={handleChange}/> 
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Apellido <span className="req">*</span></Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Ingrese su apellido"
                name="lastName" 
                value={data.lastName}
                onChange={handleChange}/> 
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Email <span className="req">*</span></Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Ingrese su email"
                name="email" 
                value={data.email}
                onChange={handleChange}/> 
            </Form.Group>
           
            <Form.Group className="mb-3">
                <Form.Label>Password <span className="req">*</span></Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Ingrese su password"
                name="password" 
                value={data.password}
                onChange={handleChange}/> 
            </Form.Group>
            <div className="text-center">
            <button className="button-blue">Guardar</button>
            </div>
        </Form>
        </div>
        </Container>
        </>
    );
}
export default FormUsers;