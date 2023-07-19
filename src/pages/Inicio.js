import NavBar from "../components/navBar/NavBar";
import './Inicio.css';
import Peticion from '../util/home/peticiones.png'
import Queja from '../util/home/queja.png'
import Reclamo from '../util/home/reclamo.png'
import Solicitud from '../util/home/solicitud.png'
function Inicio() {
    return (
        <>

            <NavBar />
            <div className="container-fluid">
                <section id='info-pqrs'>
                    <div className='info-title'>
                        <h1>Te escuchamos</h1>
                        <p>Permítenos conocer todas tus Peticiones, Quejas, Reclamos y Sugerencias sobre nuestros servicios.</p>
                    </div>
                    <div className="info-text">
                        <h2>Tipos de ​P​QRS</h2>
                        <p>Por favor lee atentamente las descripciones de los tipos de PQRS y cuéntanos tu experiencia</p>
                        <section id="boxes-pqrs">
                            <div className="box-pqrs">
                                <div className="box-pqrs-img">
                                    <img src={Peticion} alt="Peticiones" />
                                </div>
                                <div className="box-pqrs-title">
                                    <h2>Petición</h2>
                                </div>
                                <div className="box-pqrs-text">
                                    <p>Radicación de requerimientos sobre un producto o la prestación de un servicio.</p>
                                </div>
                                <div className="box-buttons">
                                <button className="button-blue">
                                <i className="fa-solid fa-magnifying-glass"></i> Consultar
                                </button>
                                <button className="button-gray">
                                <i className="fa-solid fa-plus"></i> Registrar 
                                </button>
                                </div>
                            </div>

                            <div className="box-pqrs">
                                <div className="box-pqrs-img">
                                    <img src={Queja} alt="Queja" />
                                </div>
                                <div className="box-pqrs-title">
                                    <h2>Queja</h2>
                                </div>
                                <div className="box-pqrs-text">
                                    <p>Manifestación de inconformidad hacía la conducta en la atención por parte de un colaborador.</p>
                                </div>
                                <div className="box-buttons">
                                <button className="button-blue">
                                <i className="fa-solid fa-magnifying-glass"></i> Consultar
                                </button>
                                <button className="button-gray">
                                <i className="fa-solid fa-plus"></i> Registrar 
                                </button>
                                </div>
                            </div>
                            <div className="box-pqrs">
                                <div className="box-pqrs-img">
                                    <img src={Reclamo} alt="Reclamo" />
                                </div>
                                <div className="box-pqrs-title">
                                    <h2>Reclamo</h2>
                                </div>
                                <div className="box-pqrs-text">
                                    <p>Expresión de inconformidad frente a un producto o la prestación de un servicio.
                                    </p>
                                </div>
                                <div className="box-buttons">
                                <button className="button-blue">
                                <i className="fa-solid fa-magnifying-glass"></i> Consultar
                                </button>
                                <button className="button-gray">
                                <i className="fa-solid fa-plus"></i> Registrar 
                                </button>
                                </div>
                            </div>
                            <div className="box-pqrs">
                                <div className="box-pqrs-img">
                                    <img src={Solicitud} alt="Solicitud" />
                                </div>
                                <div className="box-pqrs-title">
                                    <h2>Sugerencias</h2>
                                </div>
                                <div className="box-pqrs-text">
                                    <p>Propuesta o recomendación del cliente para mejorar el servicio de la empresa.</p>
                                </div>
                                <div className="box-buttons">
                                    <button className="button-blue">
                                    <i className="fa-solid fa-magnifying-glass"></i> Consultar
                                    </button>
                                    <button className="button-gray">
                                    <i className="fa-solid fa-plus"></i> Registrar 
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                </section>

            </div>
        </>
    );
}

export default Inicio;