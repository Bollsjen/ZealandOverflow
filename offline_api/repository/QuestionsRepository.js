import { Question } from "../models/Question.js"
import { UserRepository } from "./UserRepository.js"

export default class QuestionsRepository {
    static _nextId = 0
    static _fulltimeEducations = [
        "Administrationsøkonom", "Autoteknolog", "Datamatiker","Finansøkonom", "El-Installatør", "Handelsøkonom", "Markedsføringsøkonom", "Multimediedesigner",
        "Serviceøkonom", "Procesteknolog", "Laborant", "Logistikøkonom", "Jordbrugsteknolog", "Produktionsteknolog", "VVS-Installatør", "Byggetekniker", "IT-teknolog"
    ]
    static _questions = [
        new Question(QuestionsRepository._nextId++, UserRepository._users[0], "Hvordan tjener jeg penge?", 0, "Jeg vil gerne vide lidt mere i detaljer om hvordan jeg kan tjene penge. Jeg kan forstå at jeg kan bruge penge ved at købe ting, men jeg ikke noget at sælge. Hvordan kan jeg så tjene penge?", 15, null, ["Penge", "Salg", "Tjene"]),
        new Question(QuestionsRepository._nextId++, UserRepository._users[1], "Hvordan installerer jeg Visual Studio?", 2, "Jeg kan simpelthen ikke finde ud af Microsofts dokumentation. Jeg får hele tiden fejlen \"Ikke nok disk plads\" når jeg prøver at installere Visual Studio. Hvad skal jeg gøre?", 5, null, ["Visual Studio", "Installation", "Microsoft", "Data"]),
        new Question(QuestionsRepository._nextId++, UserRepository._users[2], "Hvordan er det nu jeg titrerer?", 10, "Jeg står som et kæmpe spørgsmåltegn i loboratoriet og kan ikke huske hvad jeg skal bruge til titrering. Please hjælp mig", -5, null, ["Laboratorium", "Laborant", "Titrering"]),
        new Question(QuestionsRepository._nextId++, UserRepository._users[3], "Hvordan får jeg PHP til at hente data fra databaser?", 2, "Jeg har siddet med dette problem længe og kan simpelt hen ikke finde ud af hvordan jeg får PHP til at hente data fra min database. Min database er en MySQL.", 24, null, ["PHP", "SQL", "MySQL", "Data"])
    ]

    GetAllEducations(){
        return QuestionsRepository._fulltimeEducations
    }

    GetEducationById(id){
        if(!Number.isInteger(id)){
            return 'Expected an integer'
        }
        return QuestionsRepository._fulltimeEducations[id]
    }

    GetAllQuestions(){
        return QuestionsRepository._questions
    }

    GetAllQuestionsByUserId(userId){
        if(typeof userId !== 'string'){
            throw new TypeError('Expected a string')
        }
        return QuestionsRepository._questions.filter(q => q.userId == userId)
    }

    GetAllQuestionsByTags(tags){
        if(!(tags instanceof Array) || tags.every(item => typeof item !== 'string')){
            throw new TypeError('Expected a list/array of strings')
        }
        let result = []
        QuestionsRepository._questions.forEach(q => {
            q.tags.forEach(t => {
                tags.forEach(tag => {
                    if(tag == t){
                        result.push(q)
                    }
                })
            })
        })

        return result
    }

    GetAllQuestionsByEducation(educationId){
        if(!Number.isInteger(educationId)){
            throw new TypeError('Expected an integer')
        }
        return QuestionsRepository._questions.filter(q => q.educationId == educationId)
    }

    GetAllQuestionsById(id){
        if(!Number.isInteger(id)){
            throw new TypeError('Expected an integer')
        }
        return QuestionsRepository._questions.filter(q => q.id == id)
    }

    CreateQuestion(question){
        question.id = QuestionsRepository._nextId++
        QuestionsRepository._questions.push(question)
        return question
    }

    UpdateQuestion(id, question){
        if(!Number.isInteger(id) || !question instanceof Question){
            throw new TypeError('Expected an integer and an object of type Question')
        }
        question.id = id
        QuestionsRepository._questions = QuestionsRepository._questions.map(q => {
            if(q.id == id){                
                return question
            }
            return q
        })
        return question
    }

    RemoveQuestion(id, user){
        if(!Number.isInteger(id) || !user instanceof User){
            throw new TypeError('Expected an integer and an object of typ User')
        }
        QuestionsRepository._questions = QuestionsRepository._questions.filter(q => q.id != id && q.userId != user.id)
        return true
    }
}