import { User } from "../offline_api/models/User"
import { UserRepository } from "../offline_api/repository/UserRepository"
import axios from 'axios';

const SERVER_URL = 'http://'/*192.168.0.102*/+'192.168.1.177:3000/api/Users/signin'

export default class FilandaSignin {
    static currentUser = null

    static async signinWithUsernameAndPassword(username, password){
        try{
            const user = {username: username, password: password}
            const response = await axios.post(SERVER_URL, user)
            const data = await response.data
            if(await response.status == 200){
                this.currentUser = await data[0]
                return 'success'
            }else{
                console.log('response', response)
                return response.status
            }
        }catch(e){
            console.log('error', e)
            return e
        }
    }

    static signout(){
        this.currentUser = null
    }
}