import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const NavBar = observer(() => {
    const {user} =useContext(Context)
    const history = useNavigate()
    const logOut= () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Купидевайс</Navbar.Brand>
                {user.isAuth ?
                        <Nav className="ml-auto" style={{color: "white"}}>
                            <Button variant={"outline-light"}
                                onClick={() => history(ADMIN_ROUTE)}  >
                                Аdmin </Button>
                            <Button variant={"outline-light"}
                                onClick={() => logOut()} className="mx-2"  >
                                выйти </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: "white"}}>
                            <Button variant={"outline-light"}
                                    onClick={() => history(LOGIN_ROUTE) }>
                                Авторизация </Button>
                        </Nav>
                        }
                    </Container>
        </Navbar>
        );
    });



export default NavBar;



