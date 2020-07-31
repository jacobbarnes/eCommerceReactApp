import React from 'react'
import * as bs from 'react-bootstrap'
// import PRODUCTS from './products'
import AppContext from './context'
import ProductCard from './ProductCard'
// import { useRouteMatch } from 'react-router-dom'
// import { Button} from 'react-bootstrap'
// import SiteIcon from './logo.jpg'

function Center(props) {
    const context = React.useContext(AppContext)
    return (
        <bs.Container>
            <bs.Row>
                {Object.values(context).map((product,ind) => (
                    <bs.Col md='3' style={{paddingLeft:'1rem',paddingRight:'1rem'}} key={ind}>
                        <ProductCard product={product}/>
                    </bs.Col>
                ))}
            </bs.Row>
        </bs.Container>


        //sprint 1
        // <bs.Container>
        //     <bs.Row>
        //         <bs.Col style={{textAlign: 'center'}}>
        //             <bs.Image src={SiteIcon} style={{height:'10rem'}} roundedCircle />
        //             <h1>Welcome!</h1>
        //             <Button variant='primary'>Click Me!</Button>
        //         </bs.Col>
        //     </bs.Row>
        //     <bs.Row>
        //         <i className="fas fa-home fa-9x pt-5" style={{display:'block', margin: 'auto'}}></i>
        //     </bs.Row>
        // </bs.Container>
    )
}
export default Center

// const Names = {
//     user1 :"Jacob",
//     user2 :"Lucas",
//     user3 :"Brian",
// }


//example of how to use .map with converting an object to an array first
// function buttonMap(props) {
//     return (
//         <>
//             {Object.values(Names).map((name,idx) => {
//                 return (
//                     <bs.Button
//                         key={idx}
//                         variant="outline-success"
//                         size="lg"
//                     >
//                         {name}
//                     </bs.Button>
//                 )
//             })}
//         </>
//     )
// }
// export default buttonMap
  
