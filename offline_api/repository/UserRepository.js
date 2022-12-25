import { User } from "../models/User.js"
import { v4 as uuidv4 } from 'uuid'

export class UserRepository{
    static _nextId = 0
    static _users = [
        new User(uuidv4(), "økonomen", "1234", null),
        new User(uuidv4(), "datamatikeren1", "1234", null),
        new User(uuidv4(), "laboranten", "1234", null),
        new User(uuidv4(), "datamatikeren2", "1234", null),
    ]

    GetAllUsers(){
        return UserRepository._users
    }

    GetUserById(id){
        return UserRepository._users.filter(u => u.id == id)
    }

    CreateUser(user){
        UserRepository._users.push(user)
        return UserRepository._users[UserRepository._users.length-1]
    }

    GetUserByUsername(username){
        return UserRepository._users.find((u) => u.userName == username)
    }
}