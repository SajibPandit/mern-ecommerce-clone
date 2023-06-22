import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { Button, Form, Input, Label,Row,Col,FormGroup } from 'reactstrap'

const LoginScreen = ({location,history}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    
    const submitHandler = (e)=>{
        e.preventDefault()
        //Dispatch Login
        dispatch(login(email,password))
    }
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state=>state.userLogin)

    const {loading,error,userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message color="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </FormGroup>
                <Button className="btn btn-dark"  type="submit">Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>New Coustomer?<Link to={redirect? `/register?redirect=${redirect}`:'/register'}>Regster</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
