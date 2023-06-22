import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem
  } from 'reactstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state=>state.userLogin)

    const {userInfo} = userLogin

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const logoutHandler = () =>{
        dispatch(logout())
    }

    return (
        <header>
            <Navbar className="navbar-dark" color="dark" light expand="md">
            
            <Container>
                <LinkContainer to='/'>
                    <NavbarBrand>ProShop</NavbarBrand>
                </LinkContainer>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                        <LinkContainer to='/cart'>
                        <NavLink><i className="fas fa-shopping-cart"></i> Cart</NavLink>
                        </LinkContainer>
                        </NavItem>
                        {userInfo ? (
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {userInfo.name}
                            </DropdownToggle>
                            <DropdownMenu right>
                            <LinkContainer to='/profile'>
                                <DropdownItem>
                                    Profile
                                </DropdownItem>
                            </LinkContainer>
                            
                            <DropdownItem onClick={logoutHandler}>
                                Logout
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>):
                        <NavItem>
                        <LinkContainer to='/login'>
                        <NavLink><i className="fas fa-user"></i> Login</NavLink>
                        </LinkContainer>
                        </NavItem>}
                    </Nav>
                    </Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
