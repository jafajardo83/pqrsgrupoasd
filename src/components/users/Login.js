import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form} from "react-bootstrap";
//import { useHistory } from "react-router";
import Swal from 'sweetalert2'
import NavBar from "../navBar/NavBar";
import './User.css';
import { useNavigate } from "react-router-dom";
import logo from "../../util/logo.svg";


function Login() {

    useEffect(()=>{
        sessionStorage.clear()
    },[]);
    /*5. Constante history para retornar al listado*/
    
    
    /*1.Inicializamos los inputs en el estado, para poder recibir los valores que se digiten 
    en él y controlarlos */
    const [data,setData]=useState({email:"",password:""});
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
    const url="http://localhost:5000/users?email="+data.email;  
    const [validated, setValidated] = useState(false);
    const navigate=useNavigate();
    /*3. funci{on para procesar el envío del formulario*/
        const handleSubmit=async(e)=>{
            const form = e.currentTarget;
            if (form.checkValidity() == false) {
                e.preventDefault();
                e.stopPropagation();
            }
            else{
                e.preventDefault();
                const response=await axios.get(url,data);//await espera hasta que se ejcute la petición
                console.log(response);
                if(Object.keys==0){
                    Swal.fire(
                        'Error!',
                        `El usuario no se encuentra registrado`,
                        'erros'
                    )
                }
                else{
                    console.log(response.data[0].password)
                    if(response.data[0].password==data.password){
                        Swal.fire(
                            'Bienvenido!',
                            `<strong> ${response.data[0].firstName} ${response.data[0].lastName}</strong>`,
                            'success'
                        )
                        sessionStorage.setItem('id',response.data[0].id)
                        sessionStorage.setItem('firstName',response.data[0].firstName)
                        sessionStorage.setItem('lastName',response.data[0].lastName)
                       navigate('/dashboard'); 
                    }
                    else{
                        Swal.fire(
                            'Error!',
                            'Sus credenciales de acceso no son válidas!',
                            'error'
                        )
                    }
                }
                
            }
            setValidated(true);
        }
    return (
        <>
        <NavBar/>
        <Container>
        <div id="form-login">
            <div className="head-login">
            <img src={logo} alt="login Sistema PQRS" className="img-login"/>
            </div>
        
            
            <div className="body-login">
            
                <h1 className="text-center title-login">Inicio de Sesión</h1>
           
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    
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
                    <div className="text-center">
                    <button className="button-blue">Ingresar</button>
                    <span className="recuperar-pass"><br/>Recuperar contraseña</span>
                    </div>
                </Form>
        </div>
        </div>
        </Container>
        </>

    );
}

export default Login;