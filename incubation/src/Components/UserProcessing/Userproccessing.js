import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function Userproccessing() {
    return (
        <div>

            <h1 style={{ marginTop: '3%' }} align='center' >Thanks for your application</h1>
            <div className='d-flex justify-content-center mt-3'>
                <Spinner animation="border" variant="warning" />
            </div>

            <h1 style={{ marginTop: '3%', color: 'orange' }} align='center' >Your request is being  Proccessed</h1>

        </div>
    )
}

export default Userproccessing