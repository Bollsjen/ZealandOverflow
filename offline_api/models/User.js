export class User {
    constructor(id, userName, password, imageUrl){
        this.id = id
        this.userName = userName
        this.password = password
        this.imageUrl = imageUrl
        this.created = Math.floor(Date.now() / 1000)
    }
}