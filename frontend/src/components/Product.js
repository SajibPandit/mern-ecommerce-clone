import React from 'react'
import { Card, CardBody, CardHeader, CardImg, CardText, CardTitle } from 'reactstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
const Product = ({product}) => {
    return (
        <Card className="my-3 rounded">
            <CardHeader>
            <Link to={`/product/${product._id}`}>
                <CardImg className="img-fluid" src={product.image}/>
            </Link>
            </CardHeader>
            <CardBody>
                <Link to={`/product/${product._id}`}>
                   <CardTitle>
                       <strong>{product.name}</strong>
                   </CardTitle>
                </Link>
                <CardText>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color='red'/>
                </CardText>
                <CardText>
                    <h3>${product.price}</h3>
                </CardText>
            </CardBody>
        </Card>
    )
}

export default Product
