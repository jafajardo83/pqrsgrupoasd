import { Link } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Container,Row,Form,Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';
import CardPqrs from './CardPqrs';
import NavBarUser from '../navBar/NavBarUser';
function ListPqrs() {

    /*1. Definir url del api a la que me voy a conectar */
    const url="http://localhost:5000/pqrs";

    /*2. Generar función asíncrona para conectarme al API */
    const getData=async()=>{
        const response=axios.get(url);
        return response;
    }

    /*3. UseState para guardar la respuesta de la petición */

    const [list,setList]=useState([]);
    /*5. Crear otro estado para refrescar el listado después de eliminar */
    const [upList,setUplist]=useState([false]);

    /*5. agregamos otra constante al useState para actualizar el estado del modal */
    const [show,setShow]=useState(false);

    const handleClose=()=>{setShow(false);}
    const handleOpen=()=>{setShow(true);}

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
    return(
        <>
        <NavBarUser/>
        <Container fluid>
        <div id="list-pqrs">
        <div className="title-user">
                <h2>Peticiones Quejas Reclamos y Solicitudes</h2>
                <Link to="/register/pqrs" className="menu-item">
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
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Ingrese su nombre"
                        name="nombre" 
                        value={dataModal.nombre}
                        onChange={handleChangeModal}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Ingrese su apellido"
                        name="apellido" 
                        value={dataModal.apellido}
                        onChange={handleChangeModal}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Documento</Form.Label>
                        <Form.Select 
                        name="tipodoc"
                        onChange={handleChangeModal}>
                            <option value={dataModal.tipodoc}>{dataModal.tipodoc}</option>
                            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                            <option value="Cédula de extranjería">Cédula de extranjería</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>No. Documento</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Ingrese su número de documento"
                        name="numdoc" 
                        value={dataModal.numdoc}
                        onChange={handleChangeModal}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Ingrese su foto"
                        name="foto" 
                        value={dataModal.foto}
                        onChange={handleChangeModal}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                <Form.Label>Perfil</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    placeholder="Digite su perfil"
                    name="perfil" 
                    value={dataModal.perfil}
                    onChange={handleChangeModal}/> 
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