import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PayPalButton } from "react-paypal-button-v2"
import { Card, Col, ListGroup, ListGroupItem, Row} from 'reactstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getOrderDetails,payOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET} from '../constants/orderConstants'

const OrderScreen = ({match}) => {
    const orderId = match.params.id

    const [sdkReady,setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state)=>state.orderDetails)
    const {order,loading,error} = orderDetails

    const orderPay = useSelector((state)=>state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay

    if(!loading){
        const addDecimals = num =>{
            return (Math.round(num*100)/100).toFixed(2)
        }
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc,item)=>acc + item.price*item.qty,0)
        )
    }

    useEffect(()=>{
        const addPaypalScript = async ()=>{
            const {data:clientId} = await axios.get('/api/config/paypal')
            console.log(clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        } 

        if(!order||successPay){
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }

    },[dispatch,orderId,successPay,order])

    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult)
        
    }

    return loading ? <Loader/> : error ? <Message color="danger">{error}</Message> : <>
        <h1>Order {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p><strong>Name: {order.user.name}</strong></p>
                            <p><strong>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></strong></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message color="success">Delivered at ${order.deliveredAt}</Message> : <Message color="danger">Not Delivered</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message color="success">Paid on ${order.paidAt}</Message> : <Message color="danger">Not Paid</Message>}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message color="warning">Order is Empty</Message>:(
                                <ListGroup>
                                    {order.orderItems.map((item,index)=>(
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax (15%)</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid  && <ListGroupItem>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? <Loader/>: 
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                }
                            </ListGroupItem>}
                            
                        </ListGroup>
                    </Card>
                </Col>
        </Row>
    </>
    
}

export default OrderScreen
