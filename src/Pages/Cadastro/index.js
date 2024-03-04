import { useState } from "react";
import Input from "../../Components/Input";
import { Container, Form, SubContainerSign } from "./styles";
import Botao from "../../Components/Botao";
import { NavLink, useNavigate } from "react-router-dom";
import { validarConfirmarSenha, validarEmail, validarNome, validarSenha, validarTelefone } from "../../Utils/validadores";
import UserServices from "../../Services/UserService";

export default function Cadastro () {
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const {data} = await UserServices.cadastrar({
                nome: form.nome,
                telefone: form.telefone,
                email: form.email,
                password: form.password,
            })

            if(data) {
                const responseLogin = await UserServices.login({
                    email: form.email,
                    password: form.password
                })

                if(responseLogin === true) {
                    alert('Usuário Cadastrado com suceesso')
                    navigate('/home')
                }
            } 
            setLoading(false)
        } catch (error) {
            alert('Algo deu errado com o Cadastro' + (error))
        }
    }

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
      }

      const validadorInput = () => {
        return validarEmail(form.email) 
        && validarSenha(form.password)
        && validarTelefone(form.telefone)
        && validarConfirmarSenha(form.password, form.confirmarPassword)
        && validarNome(form.nome)
      }

    return (
        <Container>
            <Form>
                <h1>Faça o seu Cadastro 👋</h1>

                <Input
          name='nome'
          placeholder='Digite o seu nome'
          onChange={handleChange}
          type='text'
        />
        <Input
          name='telefone'
          placeholder='Digite o seu telefone'
          onChange={handleChange}
          type='number'
        />
        <Input
          name='email'
          placeholder='Digite o seu e-mail'
          onChange={handleChange}
          type='email'
        />
        <Input
          name='password'
          placeholder='Digite a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Input
          name='confirmarPassword'
          placeholder='Confirme a sua senha'
          onChange={handleChange}
          type='password'
        />

        <Botao
          type='submit'
          text='Efetuar Cadastro!'
          onClick={handleSubmit}
          disabled={loading === true || !validadorInput()}
        />

        <SubContainerSign>
          <p>Já possui conta?</p>
          <NavLink to="/">Login</NavLink>
        </SubContainerSign>
            </Form>
        </Container>
      )
    }
  