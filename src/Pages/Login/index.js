import React, { useState } from 'react'
import { Container, Form, SubContainerSign } from './styles'
import Input from '../../Components/Input'
import Botao from '../../Components/Botao'
import { NavLink, useNavigate } from 'react-router-dom'
import { validarEmail, validarSenha } from '../../Utils/validadores'
import UserServices from '../../Services/UserService'

const userService = new UserServices()

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const response = await userService.login(form)
            console.log(response)
            if(response === true) {
                alert('Usuário logado com sucesso')
                navigate('/home')
            }
            setLoading(false)
        } catch( err) {
            alert('Algo deu errado com o Login' + err)
        } finally {
            setLoading(false)
        }
        
    }

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value}) 
    }

    const validandoInput = () => {
        return validarEmail(form.email) && validarSenha(form.password)
    }

    console.log(validandoInput())

    return ( 
        <Container >
            <Form>
                <h1>Faça o seu Login 👋</h1>
                <Input 
                    name="email"
                    placeholder="Digite o seu e-mail"
                    onChange={handleChange}
                    type="email"
                />
                <Input 
                    name="password"
                    placeholder="Digite sua senha"
                    onChange={handleChange}
                    type="password"
                />
                <Botao 
                    type='submit'
                    text='Entrar!' 
                    onClick={handleSubmit}
                    disabled={loading === true || !validandoInput()}
                />
                <SubContainerSign>
                    <p>Não possui conta?</p>
                     <NavLink to="cadastrar">Cadastrar</NavLink>
                    
                </SubContainerSign>
            </Form>
        </Container>
     )
}

export default Login