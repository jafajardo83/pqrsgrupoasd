import { Card, Button } from 'react-bootstrap';

import {Link} from 'react-router-dom';
import './Pqrs.css';

function CardPqrs({ pqrs }) {

    
    return (
        
        
            <Card  style={{ width: '100%' }} key={pqrs.id} className="">
                
                <Card.Title className="">PQRS No. {pqrs.id}</Card.Title>
                
                <Card.Body>    
                    <Card.Text>
                        <p><strong>Fecha:</strong> {pqrs.date}</p>
                        <p><strong>Tipo:</strong> {pqrs.type}</p>
                        <p><strong>Descripción:</strong> {pqrs.description}</p>
                        <p><strong>Area(s):</strong> {pqrs.areas.map(a => a.name).join(' | ')}</p>
                        <p><strong>Funcionario(s):</strong> {pqrs.officer.map(o => o.name).join(' | ')}</p>
                        <p><strong>Estado:</strong> {pqrs.state}</p>
                        
                        
                    </Card.Text>
                    <div className="">
                        <Link to="/ver-pqrs" ><Button variant="primary" className="">Ver PQRS</Button></Link>
                    </div>
                </Card.Body> 
            </Card> 

    );
}

export default CardPqrs;