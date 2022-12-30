import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import QuestionsRepository from '../offline_api/repository/QuestionsRepository';

const EDUCATION_URL = 'http://192.168.0.102:3000/api/Educations'

const QuestionCard = ({style, ...props}) => {
    const manager = new QuestionsRepository()

    const [error, setError] = useState('')
    const [education, setEducation] = useState([])
    const [question, setQuestion] = useState(props.question)

    useEffect(() => {
         fetchEducation(question.educationId)
    }, [])

    const fetchEducation = async (id) => {
        console.log('id:', id)
        try{
            id = Number(id)
            const url = EDUCATION_URL + '/' + parseInt(id)
            console.log('url', url)
            const response = await fetch(url,{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json'
                },})
              const data = await response.json()
              setEducation(await data)
        }catch(err){
            console.error('error: ', err)
            setError(err)
        }
    }

    return (
        <View style={style}>
            <View style={styles.questionCardContainer}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: 75}}>
                        <View>
                            <Text style={{alignSelf: 'flex-end'}}>{question.votes} votes</Text>
                            <Text style={{alignSelf: 'flex-end'}}>0 answers</Text>
                            <Text style={{alignSelf: 'flex-end'}}>27 views</Text>
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