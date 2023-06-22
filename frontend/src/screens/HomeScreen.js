import React,{useEffect} from 'react'
import { Col, Row } from 'reactstrap'
import {useDispatch,useSelector} from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts} from '../actions/productActions'
const HomeScreen = () => {
    const dispatch = useDispatch()


    const productList = useSelector(state=>state.productList)
    const {loading,error,products} = productList

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader/>: error ? <Message color='danger' children={error}/> : (
                <Row>
                {products.map(product=>(
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} key={product._id}/>
                    </Col>
                ))}
            </Row>
            )}
            
        </>
    )
}

export default HomeScreen
