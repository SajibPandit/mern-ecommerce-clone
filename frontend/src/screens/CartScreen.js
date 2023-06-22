import React,{ useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {Row,Col,ListGroup,Card, ListGroupItem,FormGroup,Input, Button} from 'reactstrap'
import {addToCart,removeFromCart} from '../actions/cartActions'

const CartScreen = ({match,location,history}) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state=> state.cart)
    console.log(cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])

    const removeFromCartHandler = (id)=>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler =()=>{
        history.push('/login?redirect=shipping')
    }
   
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems && cartItems.length === 0 ? <Message>Your Cart is Currently Empty <Link to='/'>Go Back</Link></Message> :(
                    <ListGroup>
                        {cartItems.map(item=>(
                            <ListGroupItem key={item.product}>
                                <Row>
                                <Col md={2}>
                                    <img src={item.image} className="img-fluid rounded" alt={item.name}/>
                                </Col>
                                <Col md={4}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                <FormGroup>
                                        <Input type="select" value={item.qty}
                                        onChange={(e)=> dispatch(addToCart(item.product,Number(e.target.value)))} name="select">
                                            {
                                                [...Array(item.countInStock).keys()].map(x=>(
                                                    <option value={x+1} key={x+1}>{x+1}</option>
                                                ))
                                            }
                                        </Input>
                                </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <Button onClick={()=>removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                                </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((acc,item)=> acc+item.qty , 0)}) items</h2>
                            <Row>
                                <Col>
                                    Total Price :
                                </Col>
                                <Col>${cartItems.reduce((acc,item)=> acc+item.qty*item.price,0).toFixed(2)}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button className="btn btn-block btn-dark" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
