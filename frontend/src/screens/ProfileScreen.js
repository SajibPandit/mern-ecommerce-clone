import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {updateUserProfile,getUserDetails} from '../actions/userActions'
import { Button, Form, Input, Label,Row,Col,FormGroup } from 'reactstrap'

const ProfileScreen = ({location,history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state=>state.userDetails)

    const {loading,error,user} = userDetails
    console.log(user)

    const userLogin = useSelector(state=>state.userLogin)

    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)

    const {success} = userUpdateProfile


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history,userInfo,dispatch,user])

    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            //Dispatch Update Profile
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
        
    }

    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message color="danger">{message}</Message>}
            {error && <Message color="danger">{error}</Message>}
            {success && <Message color="danger">Profile Updated</Message>}
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

                <Button className="btn btn-dark"  type="submit">Update</Button>
            </Form>
            </Col>
            <Col md={9}></Col>
        </Row>
    )
}

export default ProfileScreen
