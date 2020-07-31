import React from 'react'
import * as bs from 'react-bootstrap'
import AppContext from './context'
import { Link } from 'react-router-dom'

function Cart(props) {
    const context = React.useContext(AppContext)

    if (!context.products) {
        return <div>Loading...</div>
    }

    if (context.cartTotal === 0) {
        return (
                <bs.Card className="my-4 shadow pb-4 bg-white rounded" style={{ width: '50%', textAlign: "center", marginLeft: "auto",marginRight: "auto"}}>
                    <bs.Card.Body>
                        <bs.Card.Title>Nothing is in your cart!</bs.Card.Title>
                    </bs.Card.Body>
                    <Link to={`/`} className="btn btn-primary" style={{width: "120px", display: "block", marginLeft: "auto",marginRight: "auto"}}>Browse Items</Link>
                </bs.Card>
        )
    }

    let products = context.products
    let cart = Object.entries(context.cart)
    let totalPrice = Number(0)

    function addToTotal(price) {
        totalPrice += Number(price)
    }

    return (
        <>
            <bs.Table responsive>
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Extended</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(([key, qty], ind) => (
                        <tr key={ind}>
                            <td>
                                <img alt={products[key].filename} style={{ height: "100px", widht: "100px" }} src={process.env.PUBLIC_URL + "/media/products/" + products[key].filename + "-1.png"}></img>
                            </td>
                            <td>{products[key].name}</td>
                            <td>${products[key].price}</td>
                            <td>
                                <button onClick={() => { context.removeOneFromCart(key) }}>{"-"}</button>
                            &nbsp;&nbsp;{qty}&nbsp;&nbsp;
                            <button onClick={() => { context.addToCart(key) }}>{"+"}</button>
                            </td>
                            <td>${parseFloat(products[key].price * qty).toFixed(2)}  {addToTotal(products[key].price * qty)} </td>
                            <td>
                                <bs.Button className="bg-danger" onClick={() => { context.removeFromCart(key) }}>Remove</bs.Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong>Total:</strong></td>
                        <td><strong>${parseFloat(totalPrice).toFixed(2)}</strong></td>
                        <td>
                            <bs.Button className="bg-danger" onClick={() => { context.removeAll() }}>Empty Cart</bs.Button>
                        </td>
                    </tr>
                </tbody>
            </bs.Table>
            <Link className='btn btn-success' to='/checkout'>Checkout</Link>
        </>
    )
}
export default Cart


  
