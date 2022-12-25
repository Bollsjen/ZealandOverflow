export class Answer {
    constructor(id, user, questionId, description, votes, solution, imageUrls){
        if(!Number.isInteger(id)) throw new TypeError('Id has to be an integer')
        this.id = id
        this.user = user
        this.questionId = questionId
        this.description = description
        this.votes = votes
        this.solution = solution
        this.imageUrls = imageUrls
        this.created = Math.floor(Date.now() / 1000)
    }
}