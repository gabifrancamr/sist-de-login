import React, { useEffect } from 'react'
import Routering from './routes'
import UserServices from '../Services/UserService'
import { useNavigate } from 'react-router-dom'


const userService = new UserServices()

const ProtectedRoutes = ({children}) => {
    const navigate = useNavigate()
    // console.log(children)
    const usuarioAutenticado = userService.usuarioAutenticado()
    console.log(usuarioAutenticado)
    // return usuarioAutenticado ? children : <Routering />

    useEffect(() => {
        if (usuarioAutenticado === false) {
          navigate('/')
        } 
      }, [navigate, usuarioAutenticado])
    
      if (!usuarioAutenticado) return <></>

      return children

}

export default ProtectedRoutes