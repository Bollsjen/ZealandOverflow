export class Question {
    constructor(id, user, title, educationId, description, votes, imageUrls, tags){
        if(!Number.isInteger(id)) throw new TypeError('Id has to be an integer')
        this.id = id
        this.user = user
        this.title = title
        this.description = description
        this.votes = votes
        this.educationId = educationId
        this.imageUrls = imageUrls
        this.tags = tags
        this.created = Math.floor(Date.now() / 1000)
    }
}