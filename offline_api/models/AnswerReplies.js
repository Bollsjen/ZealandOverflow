export class AnswerReplies {
    constructor(id, user, answerId, description, votes, imageUrls){
        if(!Number.isInteger(id)) throw new TypeError('Id has to be an integer')
        this.id = id
        this.user = user
        this.answerId = answerId
        this.description = description
        this.votes = votes
        this.imageUrls = imageUrls
        this.created = Math.floor(Date.now() / 1000)
    }
}