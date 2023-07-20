import axios from "axios";
import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
//import { useHistory } from "react-router";
import Swal from 'sweetalert2'
import NavBarUser from "../navBar/NavBarUser";
import './Pqrs.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function FormPqrs(){

    useEffect(()=>{
        let id=sessionStorage.getItem('id')
        let firstName=sessionStorage.getItem('firstName')
        let lastName=sessionStorage.getItem('lastName')
        //console.log("el id es"+id+" el nombre "+firstName+" el apellido es "+lastName)
        if(id===''||id===null){
            setTimeout(() => window.location.href="/login", 50);

        }
    },[])
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    /*5. Constante history para retornar al listado*/
    //const history=useHistory();
    
    /*1.Inicializamos los inputs en el estado, para poder recibir los valores que se digiten 
    en él y controlarlos */

    const [areas,setInputAreas]=useState([])
    const [inputArea,setInputArea]=useState({area:""})
    const [officers,setInputOfficers]=useState([])
    const [inputOfficer,setInputOfficer]=useState({officer:""})
    

    function changeHandle(e){
        e.preventDefault();
        setInputArea({
            ...inputArea,
            [e.target.name]:e.target.value  
        })        
    }
    
    function changeFHandle(e){
        e.preventDefault();
        setInputOfficer({
            ...inputOfficer,
            [e.target.name]:e.target.value  
        })
    }
    
    let{area}=inputArea
    let{officer}=inputOfficer

    function changHandle(){
        setInputAreas([...areas,{area}])        
    }
    //console.log(areas)
    
    function changFHandle(){
        setInputOfficers([...officers,{officer}])
    }
    //console.log(officers)


    const [data,setData]=useState({id:generateUUID(),type:"",description:"",date:new Date(),state:"Pendiente",userId:sessionStorage.getItem('id')});
    /*2. Se usa la función handleChange para que cada vez que haya un cambio en el input
    guarde el name y el value del mismo */
        const handleChange=({target})=>{
        //Cada vez que haya un cambio se va a guardar el valor en el estado data
        setData({
            ...data,
            [target.name]:target.value,
            ...data.area,
            areas,
            ...data.officer,
            officers
        })
    }
    
    
    
    
    /*4. Crear petición asíncrona*/
    const url="http://localhost:5000/pqrs";  
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
                console.log(response);
                if (response.status === 201) {
                    
                    Swal.fire(
                        'PQRS registrado!',
                        `<strong> ${response.data.type} No. ${response.data.id}</strong> ha sido guardado exitosamente!`,
                        'success'
                    )
                    navigate('/pqrs')
                    
                }else {
                    Swal.fire(
                        'Error!',
                        'Hubo un problema al registrar el PQRS!',
                        'error'
                    )
                }
            }

            setValidated(true);
            
        }
        

        
    return(
        <>
        <NavBarUser/>
        <Container>
        <div id="form-pqrs">
        <h1 className="text-center mt-3">Datos PQRS</h1>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3">
            <Form.Label>Tipo de PQRS <span className="req">*</span></Form.Label>
            <Form.Select 
            name="type"
            required
            onChange={handleChange}>
                <option value="">Seleccione un Tipo de PQRS</option>
                <option value="Petición">Petición</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Solicitud">Solicitud</option>
                <option value="Otro">Otro</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor selecciona un tipo de PQRS
            </Form.Control.Feedback>
            </Form.Group>

            <Row>
            <Col>
            <Form.Group className="mb-3">
            
            <Form.Label>Área(s) <span className="req">*</span></Form.Label>
            <div className="d-flex flex-row">
            <Form.Control.Feedback type="invalid">
              Selecciona al menos un área para dirigir la solicitud
            </Form.Control.Feedback>
            <Form.Select 
            name="area"
            required
            onChange={changeHandle} >
                <option value="">Seleccione un área para dirigir su solicitud</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Soporte Técnico">Soporte Técnico</option>
                <option value="Financiero">Financiero</option>
            </Form.Select>
            <button className="button-gray" type="button" onClick={changHandle}>Agregar</button>
            </div>
            <Form.Control.Feedback type="invalid">
              Selecciona al menos un área para dirigir la solicitud
            </Form.Control.Feedback>
            
            
            <div>
            
                <table className="table-pqrs">
                    <tr>
                        <th>Áreas seleccionadas</th>
                    </tr>
                    {
                        areas.map(
                            (info,ind)=>{
                                return(
                                    <tr>
                                        <td>{info.area}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </table>
            </div>
            
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3">
            <Form.Label>Funcionario(s) <span className="req">*</span></Form.Label>
            <div className="d-flex flex-row">
            <Form.Select 
            name="officer"
            required
            onChange={changeFHandle}>
                <option value="">Seleccione un funcionario para dirigir su solicitid</option>
                <option value="Sandra Rodriguez">Sandra Rodriguez</option>
                <option value="Isaac Fisgativa">Isaac Fisgativa</option>
                <option value="Manuel Pelaez">Manuel Pelaez</option>
                <option value="Tatiana Cabrera">Tatiana Cabrera</option>
            </Form.Select>
            <button className="button-gray" type="button" onClick={changFHandle}>Agregar</button>
            </div>
            <div>
            <table className="table-pqrs">
                <tr>
                    <th>Funcionarios seleccionados</th>
                </tr>
                {
                    officers.map(
                        (info,ind)=>{
                            return(
                                <tr>
                                    <td>{info.officer}</td>
                                </tr>
                            )
                        }
                    )
                }
            </table>
            </div>
            <Form.Control.Feedback type="invalid">
              Por favor selecciona al menos un funcionario para dirigir la solicitud
            </Form.Control.Feedback>
            </Form.Group>
            </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Descripción <span className="req">*</span></Form.Label>
                <Form.Control 
                as="textarea" 
                required
                rows={3}
                placeholder="Describa los detalles de su solicitud"
                name="description" 
                value={data.description}
                onChange={handleChange}/> 
            <Form.Control.Feedback type="invalid">
              Por favor ingrese una descripción
            </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
                <button className="button-blue" type="submit">Radicar PQRS</button>
            </div>
            
        </Form>
        </div>
        </Container>
        
        </>
    );
}
export default FormPqrs;