import { Answer } from "../models/Answer.js"
import { AnswerReplies } from "../models/AnswerReplies.js"
import { UserRepository } from "./UserRepository.js"

export default class AnswersRepository {
    static _nextId = 0
    static _nextReplyId = 0
    static _asnwers = [
        new Answer(AnswersRepository._nextId++, UserRepository._users[0], 0, "Jeg vil gerne vide lidt mere i detaljer om hvordan jeg kan tjene penge. Jeg kan forstå at jeg kan bruge penge ved at købe ting, men jeg ikke noget at sælge. Hvordan kan jeg så tjene penge?", 15, true, null),
        new Answer(AnswersRepository._nextId++, UserRepository._users[1], 1, "Jeg kan simpelthen ikke finde ud af Microsofts dokumentation. Jeg får hele tiden fejlen \"Ikke nok disk plads\" når jeg prøver at installere Visual Studio. Hvad skal jeg gøre?", 5, true, null),
        new Answer(AnswersRepository._nextId++, UserRepository._users[1], 1, "Jeg kan simpelthen ikke finde ud af Microsofts dokumentation. Jeg får hele tiden fejlen \"Ikke nok disk plads\" når jeg prøver at installere Visual Studio. Hvad skal jeg gøre?", 5, false, null),
        new Answer(AnswersRepository._nextId++, UserRepository._users[2], 2, "Jeg står som et kæmpe spørgsmåltegn i loboratoriet og kan ikke huske hvad jeg skal bruge til titrering. Please hjælp mig", -5, false, null),
        new Answer(AnswersRepository._nextId++, UserRepository._users[1], 3, "For procedural PHP kan du bruge mysqli men hvis du laver det OOP så kan du bruge PDO", 532, true, null)
    ]

    static _replies = [
        new AnswerReplies(AnswersRepository._nextId++, UserRepository._users[0], 0, "Jeg vil gerne vide lidt mere i detaljer om hvordan jeg kan tjene penge. Jeg kan forstå at jeg kan bruge penge ved at købe ting, men jeg ikke noget at sælge. Hvordan kan jeg så tjene penge?", 15, null),
        new AnswerReplies(AnswersRepository._nextId++, UserRepository._users[1], 1, "Jeg kan simpelthen ikke finde ud af Microsofts dokumentation. Jeg får hele tiden fejlen \"Ikke nok disk plads\" når jeg prøver at installere Visual Studio. Hvad skal jeg gøre?", 5, null),
        new AnswerReplies(AnswersRepository._nextId++, UserRepository._users[1], 1, "Jeg kan simpelthen ikke finde ud af Microsofts dokumentation. Jeg får hele tiden fejlen \"Ikke nok disk plads\" når jeg prøver at installere Visual Studio. Hvad skal jeg gøre?", 5, null),
        new AnswerReplies(AnswersRepository._nextId++, UserRepository._users[2], 2, "Jeg står som et kæmpe spørgsmåltegn i loboratoriet og kan ikke huske hvad jeg skal bruge til titrering. Please hjælp mig", -5, null),
        new AnswerReplies(AnswersRepository._nextId++, UserRepository._users[1], 4, "For procedural PHP kan du bruge mysqli men hvis du laver det OOP så kan du bruge PDO", 532, null)
    ]

    GetAllAnswers(){
        return AnswersRepository._asnwers
    }

    GetAllAnswersById(id){
        if(!Number.isInteger(id)){
            throw new TypeError('Expected an integer')
        }
        return AnswersRepository._asnwers.filter(q => q.id == id)
    }

    GetAllAnswersByQuestionId(id){
        if(!Number.isInteger(id)){
            throw new TypeError('Expected an integer')
        }
        return AnswersRepository._asnwers.filter(q => q.questionId == id)
    }

    CreateAnswer(answer){
        answer.id = AnswersRepository._nextId++
        AnswersRepository._asnwers.push(answer)
        return answer
    }

    UpdateAnswer(id, answer){
        if(!Number.isInteger(id) || !answer instanceof Answer){
            throw new TypeError('Expected an integer and an object of type Answer')
        }
        answer.id = id
        AnswersRepository._asnwers = AnswersRepository._asnwers.map(q => {
            if(q.id == id){                
                return answer
            }
            return q
        })
        return answer
    }

    RemoveAnswer(id, user){
        if(!Number.isInteger(id) || !user instanceof User){
            throw new TypeError('Expected an integer and an object of typ User')
        }
        AnswersRepository._asnwers = AnswersRepository._asnwers.filter(q => q.id != id && q.userId != user.id)
        return true
    }


    GetAllRepliesByAnswerId(id){
        if(!Number.isInteger(id)){
            throw new TypeError('Expected an integer')
        }
        return AnswersRepository._replies.filter(q => q.answerId == id)
    }

    GetAllReplyByReplyId(id){
        if(!Number.isInteger(id)){
            throw new TypeError('Expected an integer')
        }
        return AnswersRepository._replies.find(q => q.id == id)
    }
}