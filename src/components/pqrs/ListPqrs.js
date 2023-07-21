import { Link } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Container,Row,Form,Modal,Col} from 'react-bootstrap';
import Swal from 'sweetalert2';
import CardPqrs from './CardPqrs';
import NavBarUser from '../navBar/NavBarUser';
function ListPqrs() {

    
    /*1. Definir url del api para traer PQRS del usuario autenticado */
    const url="http://localhost:5000/pqrs?userId="+sessionStorage.getItem('id');

    /*2. Generar función asíncrona para conectar al endpoint */
    const getData=async()=>{
        const response=axios.get(url);
        return response;
    }

    /*3. UseState para guardar la respuesta de la petición */
    const [list,setList]=useState([]);

    /*4. Crear estado para refrescar el listado después de eliminar */
    const [upList,setUplist]=useState([false]);

    /*5. agregamos otra constante al useState para actualizar el estado del modal */
    const [show,setShow]=useState(false);

    //Métodos de apertura y cierre del modal
    const handleClose=()=>{setShow(false);}
    const handleOpen=()=>{setShow(true);}

    const [areas,setInputAreas]=useState([])
    const [inputArea,setInputArea]=useState({area:""})
    const [officers,setInputOfficers]=useState([])
    const [inputOfficer,setInputOfficer]=useState({officer:""})
    

   
    
    let{area}=inputArea
    let{officer}=inputOfficer

    function changHandle(){
        setInputAreas([...areas,{area}])        
    }
    //console.log(areas)
    
    function changFHandle(){
        setInputOfficers([...officers,{officer}])
    }
    /*6. Estado para obtener los datos de cada registro a editar*/
    const [dataModal, setDataModal] = useState({})
    

    const handleChangeModal=({target})=>{
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await axios.put(`${url}/${dataModal.id}`,dataModal);
        console.log(response);  
        if(response.status===200){
            Swal.fire(
                'Cambio Guardado!',
                `El PQRS <strong> ${response.data.id}</strong> ha sido actualizado exitosamente!`,
                'success'
            )
            handleClose();
            setUplist(!upList);
        }
        else{
            Swal.fire(
                'Error!',
                'Hubo un problema al actualizar el PQRS!',
                'error'
            )
        }
    }
    /*4. hook useEfect ejecuta funciones cada vez que  renderizamos un componente*/
    useEffect(()=>{
        getData().then((response)=>{
            setList(response.data);
        })
    },[upList])
    //console.log(list);
    console.log(dataModal.areas)
    return(
        <>
        <NavBarUser/>
        <Container fluid>
        <div id="list-pqrs">
        <div className="title-user">
                <h2>Peticiones Quejas Reclamos y Solicitudes</h2>
                <Link to="/register-pqrs" className="menu-item">
                    <button className="button-blue">
                        <i className="fa-solid fa-user"></i> Registrar PQRS
                    </button>
                </Link>  
            </div>
            <div className="list-pqrs">
                
                {
                    list.map((es,index)=>(
                        <CardPqrs
                        key={index}
                        pqrs={es}
                        setUplist={setUplist}
                        upList={upList}
                        handleClose={handleClose}
                        handleOpen={handleOpen}
                        setDataModal={setDataModal}
                        />
                    ))   
                }
                
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar PQRS</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                <Modal.Body>
                <Form.Group className="mb-3">
            <Form.Label>Tipo de PQRS <span className="req">*</span></Form.Label>
            <Form.Select 
            name="type"
            required
            onChange={handleChangeModal}>
                <option value={dataModal.type}>{dataModal.type}</option>
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
            <Col xs='12' lg='6'>
            <Form.Group className="mb-3">
            
            <Form.Label>Área(s) <span className="req">*</span></Form.Label>
            <div className="d-flex flex-row">
            <Form.Control.Feedback type="invalid">
              Selecciona al menos un área para dirigir la solicitud
            </Form.Control.Feedback>
            <Form.Select 
            name="area"
            required
            onChange={handleChangeModal} >
               {/* <option value={dataModal.areas}>{dataModal.areas}</option>                <option value="Tecnología">Tecnología</option> */}
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
                    <thead>
                    <tr>
                        <th>Áreas seleccionadas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    show==true?
                       dataModal.areas.map(
                            (info,ind)=>{
                                return(
                                    <tr>
                                        <td key={ind}>{info.area} <i className="fa-solid fa-trash"></i></td>
                                    </tr>
                                )
                            }
                        )
                        :
                        <p1>No hay áreas agregadas a la solicitud</p1>
                    }
                    </tbody>
                </table>
            </div>
            
            </Form.Group>
            </Col>
            <Col xs='12' lg='6'>
            <Form.Group className="mb-3">
            <Form.Label>Funcionario(s) <span className="req">*</span></Form.Label>
            <div className="d-flex flex-row">
            <Form.Select 
            name="officer"
            required
            onChange={changHandle}>
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
                <thead>
                <tr>
                    <th>Funcionarios seleccionados</th>
                </tr>
                </thead>
                <tbody>
                {
                show==true?
                    dataModal.officers.map(
                        (info,ind)=>{
                            return(
                                <tr>
                                    <td key={ind}>{info.officer} <i className="fa-solid fa-trash"></i></td>
                                </tr>
                            )
                        }
                    )
                        :
                        <p1>No hay funcionarios agregados a esta solicitud</p1>
                }
                </tbody>
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
                value={dataModal.description}
                onChange={handleChangeModal}/> 
            <Form.Control.Feedback type="invalid">
              Por favor ingrese una descripción
            </Form.Control.Feedback>
            </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                       Guardar Cambios
                    </button>
                </Modal.Footer>
                </Form>
            </Modal>
            </div>
        </Container>
        </>
    );
}

export default ListPqrs;