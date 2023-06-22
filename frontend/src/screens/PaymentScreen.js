import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Form, Input, Label,FormGroup} from 'reactstrap'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    

    const dispatch = useDispatch()

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <h1>Payment Method</h1>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <legend>Set Method</legend>
                    <FormGroup check>
                    <Label check>
                        <Input type='radio' id="PayPal" name='paymentMethod' value='PayPal' checked onChange={e=>setPaymentMethod(e.target.value)} />
                        PayPal or Credit Card
                    </Label>
                </FormGroup>
                {/* <FormGroup check>
                    <Label check>
                        <Input type='radio' id="Stripe" name='paymentMethod' value='Stripe' onChange={e=>setPaymentMethod(e.target.value)} />
                        Stripe
                    </Label>
                </FormGroup> */}
                </FormGroup>
                
               
                <Button className='btn btn-dark' type='submit'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
