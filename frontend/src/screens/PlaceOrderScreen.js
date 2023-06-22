import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, Col, ListGroup, ListGroupItem, Row} from 'reactstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import {createOrder} from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)


    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }

    
    //Calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) =>acc+item.price*item.qty,0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

    cart.taxPrice = addDecimals(0.15*cart.itemsPrice)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector((state)=>state.orderCreate)
    const {order,success,error} = orderCreate

    
    const placeorderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
    }

    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
        }
    },[history,success])

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message>:(
                                <ListGroup>
                                    {cart.cartItems.map((item,index)=>(
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <img src={item.image} alt={item.name} className='img-fluid'/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>Order Summery</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax (15%)</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message color='danger'>{error}</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                            <Button className='btn btn-block btn-dark'
                             onClick={placeorderHandler} disabled={cart.cartItems.length === 0}>Place Order</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
