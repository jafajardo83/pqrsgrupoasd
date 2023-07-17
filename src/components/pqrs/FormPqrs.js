import axios from "axios";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
//import { useHistory } from "react-router";
import Swal from 'sweetalert2'

function FormPqrs(){

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
    function changeHandle(e){
        e.preventDefault();
        setInputArea({
            ...inputArea,
            [e.target.name]:e.target.value
            
        })
        
    }
    
    let{area}=inputArea

    function changHandle(){
        setInputAreas([...areas,{area}])
        
        
    }
    console.log(areas)

    const [data,setData]=useState({id:generateUUID(),type:"",description:"",date:new Date(),state:"Pendiente",userId:""});
    /*2. Se usa la función handleChange para que cada vez que haya un cambio en el input
    guarde el name y el value del mismo */
           
    
        const handleChange=({target})=>{
        //Cada vez que haya un cambio se va a guardar el valor en el estado data
        setData({
            ...data,
            [target.name]:target.value,
            ...data.areas,
            areas
            
            
        })
    }
   

    /*4. Crear petición asíncrona*/
    const url="http://localhost:5000/pqrs";  

    /*3. funci{on para procesar el envío del formulario*/
        const handleSubmit=async(e)=>{
            e.preventDefault();
            const response=await axios.post(url,data);//await espera hasta que se ejcute la petición
            console.log(response);
            if (response.status === 201) {
                
                Swal.fire(
                    'PQRS registrado!',
                    `<strong> ${response.data.type} No. ${response.data.id}</strong> ha sido guardado exitosamente!`,
                    'success'
                )
                //history.push("/");
                
            }else {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al registrar el PQRS!',
                    'error'
                )
            }
        }
        

        
    return(
        <div>
        <Container>
        <h1 className="text-center mt-3">Datos PQRS</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Tipo de PQRS</Form.Label>
            <Form.Select 
            name="type"
            onChange={handleChange}>
                <option>Seleccione un Tipo de PQRS</option>
                <option value="Petición">Petición</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Solicitud">Solicitud</option>
                <option value="Otro">Otro</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Areas</Form.Label>
            <Form.Select 
            name="area"
            onChange={changeHandle}>
                <option>Seleccione un área para dirigir su solicitid</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Soporte Técnico">Soporte Técnico</option>
                <option value="Financiero">Financiero</option>
            </Form.Select>
            {<button className="btn btn-primary" type="button" onClick={changHandle}>agregar Área</button>}
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Funcionario(s)</Form.Label>
            <Form.Select 
            name="officer"
            onChange={handleChange}>
                <option>Seleccione un funcionario para dirigir su solicitid</option>
                <option value="Sandra Rodriguez">Sandra Rodriguez</option>
                <option value="Isaac Fisgativa">Isaac Fisgativa</option>
                <option value="Manuel Pelaez">Manuel Pelaez</option>
                <option value="Tatiana Cabrera">Tatiana Cabrera</option>
            </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3}
                placeholder="Describa los detalles de su solicitud"
                name="description" 
                value={data.description}
                onChange={handleChange}/> 
            </Form.Group>
            
            <button className="btn btn-primary" type="submit">Radicar PQRS</button>
        </Form>
        </Container>
        </div>
    );
}
export default FormPqrs;