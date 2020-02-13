import axios from 'axios'

export default class restClientObj {
    static instanceAxios = axios.create({
        baseURL:'http://localhost:1234'
    })

    static setInterceptor = callback => {
        restClientObj.instanceAxios.interceptors.response.use(
            function (response) {
                console.log("response", response)
                return response
            },
            function (error) {
                console.log("error", error)
                if (!error.response) {
                    callback()
                }
                if (error.response.status === 403) {
                    callback()
                } else {
                    // if(!error.response.data.message.mensaje)
                    //   throw Error(error.response.data.message.mensaje)
                    // else
                    if (error.response.data) {
                        if (error.response.data.mensaje) throw Error(error.response.data.mensaje)

                        throw Error(error.response.data.message)
                    }
                }
            },
        )
    }

    static setTokenToAxio = token => {
        console.log("token recibido", token)
        restClientObj.instanceAxios.defaults.headers.common.Authorization = token
    }
    static cleartokenAxio = () => {
        delete restClientObj.instanceAxios.defaults.headers.common.Authorization
    }

    static getPrueba = () => {
        // this.cleartokenAxio()
        return restClientObj.instanceAxios
            .get('/prueba/')
    }
}