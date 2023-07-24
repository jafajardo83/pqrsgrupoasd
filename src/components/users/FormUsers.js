import axios from "axios";
import { useState } from "react";
import { Container, Form,Row,Col } from "react-bootstrap";
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
    const url="https://api-pqrs-tjzq.onrender.com/users";  
    const [validated, setValidated] = useState(false);
    const navigate=useNavigate();
    /*3. funci{on para procesar el envío del formulario*/
        const handleSubmit=async(e)=>{
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            else{
                e.preventDefault();
                const response=await axios.post(url,data);//await espera hasta que se ejcute la petición
                //console.log(response);
                if (response.status === 201) {
                    
                    Swal.fire(
                        'Guardado!',
                        `El usuario <strong> ${response.data.firstName} ${response.data.lastName}</strong> ha sido guardado exitosamente!<br>
                        Ahora podrás iniciar sesión`,
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
            setValidated(true);
        }
    return(
        
        <>
        <NavBar/>
        <Container>
        <div id="form-user">
        <h1 className="text-center mt-3">Datos Usuario</h1>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row>
            <Form.Group className="mb-3">
                <Form.Label>No. Documento <span className="req">*</span></Form.Label>
                <Form.Control 
                type="number" 
                required
                placeholder="Ingrese su número de documento"
                name="id" 
                value={data.id}
                onChange={handleChange}/> 
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa el número de documento.
                </Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row> 
            <Col xs="12" lg="6">
            <Form.Group className="mb-3" Col-xs="12" Col-lg="6">
                <Form.Label>Nombre <span className="req">*</span></Form.Label>
                <Form.Control 
                type="text" 
                required
                placeholder="Ingrese su nombre"
                name="firstName" 
                value={data.firstName}
                onChange={handleChange}/> 
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa el nombre.
                </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col xs="12" lg="6">
            <Form.Group className="mb-3">
                <Form.Label>Apellido <span className="req">*</span></Form.Label>
                <Form.Control 
                type="text" 
                required
                placeholder="Ingrese su apellido"
                name="lastName" 
                value={data.lastName}
                onChange={handleChange}/> 
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa el apellido.
                </Form.Control.Feedback>
            </Form.Group>
            
            </Col>
            </Row>
            <Row>
            <Col xs='12' lg='6'>
            <Form.Group className="mb-3">
                <Form.Label>Email <span className="req">*</span></Form.Label>
                <Form.Control 
                type="email"
                required 
                placeholder="Ingrese su email"
                name="email" 
                value={data.email}
                onChange={handleChange}/> 
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa el email
                </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col xs="12" lg="6">
            <Form.Group className="mb-3">
                <Form.Label>Password <span className="req">*</span></Form.Label>
                <Form.Control 
                type="password" 
                required
                placeholder="Ingrese su password"
                name="password" 
                value={data.password}
                onChange={handleChange}/> 
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa un password para tu cuenta
                </Form.Control.Feedback>
            </Form.Group>
            </Col>
            </Row>
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
