import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import QuestionsRepository from '../offline_api/repository/QuestionsRepository';

const EDUCATION_URL = 'http://'/*192.168.0.102*/+'192.168.1.177:3000/api/Educations'

const QuestionCard = ({style, ...props}) => {
    const manager = new QuestionsRepository()

    const [error, setError] = useState('')
    const [education, setEducation] = useState([])
    const [question, setQuestion] = useState(props.question)
    const [answersCount, setAnswersCount] = useState(0)

    useEffect(() => {
         fetchEducation(question.educationId)
    }, [])

    const fetchEducation = async (id) => {
        try{
            id = Number(id)
            const url = EDUCATION_URL + '/' + parseInt(id)
            const response = await fetch(url,{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json'
                },})
              const data = await response.json()
              setEducation(await data)
              getAnswerCount()
        }catch(err){
            console.error('error: ', err)
            setError(err)
        }
    }


    const getAnswerCount = async () => {
        try{
            const url = 'http://'/*192.168.0.102*/+'192.168.1.177:3000/api/Answers/by/question/' + question.id
            const response = await axios.get(url)
            const data = await response.data
            if(response.status == 200){
                setAnswersCount(data.length)
            }
            else
                console.log(response.statusText)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <View style={style}>
            <View style={styles.questionCardContainer}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: 75}}>
                        <View>
                            <Text style={{alignSelf: 'flex-end'}}>{question.votes} votes</Text>
                            <Text style={{alignSelf: 'flex-end'}}>{answersCount} answers</Text>
                            <Text style={{alignSelf: 'flex-end'}}>{question.views} views</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column', flex: 1, paddingLeft: 6}}>
                        <Text style={styles.questionCardTitle}>{question.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {
                                props.question.tags.map((tag, index) => 
                                    (
                                        <View key={index} style={styles.questionCardTags}>
                                            <Text style={styles.questionCardTagsText}>{tag}</Text>
                                        </View>
                                    )
                                )
                            }
                        </View>
                        <Text style={{alignSelf: 'flex-end'}}>{education.education}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    questionCardContainer: {
        padding: 8,
        backgroundColor: '#FFF',
    },
    questionCardTitle: {
        fontSize: 18
    },
    questionCardTags: {
        backgroundColor: '#E1ECF4',
        marginRight: 4,
        paddingHorizontal: 4,
        paddingVertical: 2
    },
    questionCardTagsText: {
        color: '#39739D',
        fontSize: 12
    }
})

export default QuestionCard