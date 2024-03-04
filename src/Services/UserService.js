import axios from 'axios';

export default class UserServices {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API_LOGIN + '/api'
        })
    }

    async login (dados) {
        const {data} = await this.axios.post('/login', dados)

        if (data) {
            localStorage.setItem("nome", data.user.nome)
            localStorage.setItem("email", data.user.email)
            localStorage.setItem("tokenInfo", data.token.token)
            return true
        }
        return
    }

    usuarioAutenticado () {
        return localStorage.getItem("tokenInfo") == undefined ? false : true
    }

    async logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("nome")
        localStorage.removeItem("email")
    }

    async cadastrar(dados) {
        return await this.axios.post('/user', dados)
    }

    async getPacienteData() {
        const token = localStorage.getItem("token");
    
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    
        
        const response = await this.axios.get('/paciente', config);
        return response.data;
    }
}