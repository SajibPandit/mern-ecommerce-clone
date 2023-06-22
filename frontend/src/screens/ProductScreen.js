import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,ListGroupItem,Card} from 'reactstrap'
import { FormGroup, Input } from 'reactstrap';
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProductDetails} from '../actions/productActions'

const ProductScreen = ({match,history}) => {
    const [qty,setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match])

    const addToCartHandler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/>:error? <Message color='danger' children={error}/>:(
                <Row>
                <Col md={5}>
                    <img src={product.image} alt={product.name} className='img-fluid'/>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroupItem>
                            <h4>{product.name}</h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='green'/>
                        </ListGroupItem>
                        <ListGroupItem>
                            <strong>Price : ${product.price}</strong>
                        </ListGroupItem>
                        <ListGroupItem>
                            Description : {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price : 
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status : 
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock':'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                <Row>
                                    <Col sm={4}>
                                        Qty : 
                                    </Col>
                                    <Col sm={8}>
                                    <FormGroup>
                                        <Input type="select" value={qty}
                                        onChange={(e)=>setQty(e.target.value)} name="select">
                                            {
                                                [...Array(product.countInStock).keys()].map(x=>(
                                                    <option value={x+1} key={x+1}>{x+1}</option>
                                                ))
                                            }
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            )}
                            <ListGroupItem>
                                <button onClick={addToCartHandler} disabled={product.countInStock === 0} className='btn btn-dark btn-block'>Add To Cart</button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
        </>
    )
}

export default ProductScreen
