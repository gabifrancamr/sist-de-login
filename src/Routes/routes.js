import React from 'react'
import Login from '../Pages/Login/index'
import Cadastro from '../Pages/Cadastro/'
import ProtectedRoutes from './ProtectedRoutes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Routering = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastrar" element={<Cadastro />} />
                <Route path="/home" element={
                   <ProtectedRoutes>
                     <h1>Tela Home</h1>
                   </ProtectedRoutes>
                } />
            </Routes>
        </Router>
    )
}

export default Routering