import React from 'react'
import * as bs from 'react-bootstrap'

function Help(props) {
    return(
        <bs.Container fluid className='p-4' style={{textAlign: 'center'}}>
            <bs.Row noGutters>
                <bs.Col>
                    <h1>Help</h1>
                </bs.Col>
            </bs.Row>
            <bs.Row noGutters>
                <bs.Col>
                    For customer support, please call 111-222-3333
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <i className="far fa-address-book fa-9x pt-5" style={{display:'block', margin: 'auto'}}></i>
            </bs.Row>
        </bs.Container>

    )
}
export default Help