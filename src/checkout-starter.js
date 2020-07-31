import React from 'react'
import * as bs from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field} from 'formik'
import axios from 'axios'
import AppContext from './context'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_JKO29OAJRkZnSariPRtfhUdv00Xi7WciDa")


function Checkout(props) {
    // we'll add Stripe's Elements component here later
    return (
        <Elements stripe={stripePromise}>
            <CheckoutController />
        </Elements>
    )
}
export default Checkout


const CheckoutController = props => {
    const context = React.useContext(AppContext)
    const total = 50.00 // context.getCartTotal()
    const stripe = useStripe()
    const elements = useElements()
    let history = useHistory()

    if (!context.products){
        return <div>Loading ...</div>
    }

    return (
        <>
        <Formik
            initialValues={{
                name: 'Conrad Fox',
                address1: '1234',
                address2: '5678',
                city: 'Provo',
                state: 'UT',
                zipcode: '84602',
            }}
            validateOnChange={false}
            validateOnBlur={true}
            validate={values => {
                const errors = {}
                console.log('validating', values)

                if (values.name === ""){errors.name = "Name is required"}
                if (values.address1 === ""){errors.name = "Address is required"}
                if (values.city === ""){errors.city = "City is required"}
                if (values.state === ""){errors.state = "State is required"}
                if (values.zipcode === ""){errors.zipcode = "Zipcode is required"}
                if (values.zipcode.length !== 5){errors.zipcode = "Invalid zipcode"}
                return errors
            }}
            onSubmit={async (values, actions) => {
                console.log('submit', values)
                
               
                const payment_intent = await axios.post('https://jacobbarnessprint5.herokuapp.com/api/sale/', {
                    name: values.name,
                    address1: values.address1,
                    address2: values.address2,
                    city: values.city,
                    state: values.state,
                    zipcode: values.zipcode,
                    total: context.getCartTotal(),
                    items: context.cart,
                    payment_intent: {},
                })
                console.log(payment_intent.data)
                
                const result = await stripe.confirmCardPayment(payment_intent.data.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: values.name,
                        },
                    }
                });

                console.log(result)

                if (result.error) {
                    alert(result.error.message)
                    console.log(result.error.message);
                  } else {
                    // The payment has been processed!
                    if (result.paymentIntent.status === 'succeeded') {
                      context.removeAll()
                      history.push("/receipt")
                    }
                  }
            }}
        >{form => (
            <PaymentForm form={form} total={total}/>
        )}</Formik>
        </>
    )
}


/**
 * The form layout/html.
 * This component needs finishing.
 */
const PaymentForm = props => {
    const context = React.useContext(AppContext)

    return (
        <Form>
            <bs.Container className="mx-0">
                <bs.Row>
                    <bs.Col>
                        <bs.Card className="p-3 mt-4">
                            <bs.Card.Title>Shipping Information</bs.Card.Title>
                            <bs.Card.Body>
                                <Input title="Name:" name="name" type="text" disabled={props.form.isSubmitting}/>
                                <Input title="Address 1:" name="address1" type="text" disabled={props.form.isSubmitting}/>
                                <Input title="Address 2:" name="address2" type="text" disabled={props.form.isSubmitting}/>
                                <Input title="City:" name="city" type="text" disabled={props.form.isSubmitting}/>
                                <Input title="State:" name="state" type="text" disabled={props.form.isSubmitting}/>
                                <Input title="Zipcode:" name="zipcode" type="text" disabled={props.form.isSubmitting}/>
                            </bs.Card.Body>
                        </bs.Card>
                    </bs.Col>
                    <bs.Col>
                        <bs.Card className="p-3 mt-4">
                            <bs.Card.Title>Purchase Information</bs.Card.Title>
                            <CardElement />
                            <bs.Card.Body>
                                <div>Your card will be charged <strong>${context.getCartTotal()}</strong></div><br />
                                <bs.Button type="submit" className="btn btn-success" disabled={props.form.isSubmitting}>
                                    {props.form.isSubmitting &&
                                        <bs.Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="mr-2"
                                        />
                                    }
                                    Purchase
                                </bs.Button>
                            </bs.Card.Body>
                        </bs.Card>
                    </bs.Col>
                </bs.Row>
            </bs.Container>
        </Form>
    )
}

    
        



/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label><strong>{props.title}</strong></bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                {...rProps.field}
                disabled={props.disabled}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)