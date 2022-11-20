import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {registration, login} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { useNavigate } from "react-router-dom"

const Auth = observer(() => {
    const  {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin= location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const  [password,setPassword] = useState('')
    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password);

            } else { data = await registration(email, password);
            }
            user.setUser(data)//data or user in ()
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
        


    }
    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight-54}}
        >
           <Card style={{width: 600}} className="p-5">
                  <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                  <Form className="d-flex flex-column">
                        <Form.Control
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-3"
                            placeholder="Ведите вашу почту">
                        </Form.Control>
                      <Form.Control
                          className="mt-3"
                          placeholder="Ведите ваш пароль"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                      type="password">
                      </Form.Control>

                      <Form className="d-flex justify-content-between mt-3 px-3 ">
                          {isLogin?
                              <div>
                                  Нет аккаунта?<NavLink to={REGISTRATION_ROUTE}> Зарегистрируйся! </NavLink>
                              </div>
                              :
                              <div>
                                  Есть аккаунт?<NavLink to={LOGIN_ROUTE}> Войдите! </NavLink>
                              </div>


                          }
                          <Button className="mt-3 " variant={"outline-success"}
                          onClick={click}>
                              {isLogin? 'Войти' : 'Регистрация'}
                          </Button>
                      </Form>

                  </Form>
              </Card>


        </Container>
    );
});

export default Auth;