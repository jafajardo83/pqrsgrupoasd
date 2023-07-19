import { Card, Button } from 'react-bootstrap';

import {Link} from 'react-router-dom';
import './User.css';

function CardUser({ user }) {

    return (
        
        
            <Card  style={{ width: '20rem' }} key={user.id} className="card-user">
                
                <Card.Title className="">Usuario No. {user.id}</Card.Title>
                
                <Card.Body>    
                    <Card.Text>
                        <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </Card.Text>
                    <div className="">
                        <Link to="/ver-pqrs" ><Button variant="primary" className="">Ver PQRS</Button></Link>
                    </div>
                </Card.Body> 
            </Card> 

    );
}

export default CardUser;