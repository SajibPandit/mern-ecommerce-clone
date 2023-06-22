import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Form, Input, Label,FormGroup } from 'reactstrap'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <CheckoutSteps step1 step2/>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label>Address</Label>
                    <Input type="text" placeholder="Enter Your Address" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                </FormGroup>

                <FormGroup>
                    <Label>City</Label>
                    <Input type="text" placeholder="Enter Your City" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </FormGroup>


                <FormGroup>
                    <Label>Postal Code</Label>
                    <Input type="text" placeholder="Enter Your Postal Code" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <Label>Country</Label>
                    <Input type="text" placeholder="Enter Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                </FormGroup>
                <Button className='btn btn-dark' type='submit'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
