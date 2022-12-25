import { User } from "../offline_api/models/User"
import { UserRepository } from "../offline_api/repository/UserRepository"

export default class FilandaSignin {
    static currentUser = null

    static signinWithUsernameAndPassword(username, password){
        const aManager = new UserRepository()
        const user = aManager.GetUserByUsername(username)

        if(user && user.password == password){
            this.currentUser = user
            return true
        }
        return false
    }

    static signout(){
        this.currentUser = null
    }
}