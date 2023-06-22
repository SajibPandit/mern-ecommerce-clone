import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { Button, Form, Input, Label,Row,Col,FormGroup } from 'reactstrap'

const RegisterScreen = ({location,history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            //Dispatch Register
            dispatch(register(name,email,password))
        }
        
    }
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state=>state.userRegister)

    const {loading,error,userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message color="danger">{message}</Message>}
            {error && <Message color="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </FormGroup>

                <Button className="btn btn-dark"  type="submit">Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>Have an account?<Link to={redirect? `/login?redirect=${redirect}`:'/login'}>Login</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
