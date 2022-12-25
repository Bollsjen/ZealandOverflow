import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image, TextInput, Modal, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native';
import AnswerCard from '../components/AnswerCard.js';

import AppBar from '../components/AppBar.js';
import MySafeArea from '../components/MySafeArea.js';
import QuestionPageCard from '../components/QuestionPageCard.js';
import { Answer } from '../offline_api/models/Answer.js';
import AnswersRepository from '../offline_api/repository/AnswersRepository.js';

import QuestionsRepository from '../offline_api/repository/QuestionsRepository';
import { UserRepository } from '../offline_api/repository/UserRepository.js';
import FilandaSignin from '../sigin/FilandaSignin.js';

const QuestionPage = ({route, navigation}) => {
    const qManager = new QuestionsRepository()
    const aManager = new AnswersRepository()
    const uManager = new UserRepository()

    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [myAnswer, setMyAsnwer] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const {id} = route.params

    useEffect(() => {
        fetchQuestion()
        fetchAnswer()
    }, [])

    const fetchQuestion = () => {
        try{            
            setQuestion(qManager.GetAllQuestionsById(id)[0])            
        }catch(err){
            setError(err)
        }
    }

    const fetchAnswer = () => {
        try{            
            setAnswers(aManager.GetAllAnswersByQuestionId(id))
            //console.log(answers)
        }catch(err){
            setError(err)
        }
    }

    const checkSignedin = () => {
        if(FilandaSignin.currentUser){
            if(myAnswer != '' && myAnswer != undefined && myAnswer != null){
                aManager.CreateAnswer(new Answer(0, FilandaSignin.currentUser, question.id, myAnswer, 0, false, null))
                console.log("Reply")
            }else{
                console.log('reply error')
            }
        }else{
            setModalVisible(!modalVisible);
            Keyboard.dismiss()
        }
    }

    const replyAnswer = () => {
        console.log('Answer: ' + myAnswer)
        if(FilandaSignin.currentUser){
            if(myAnswer != '' && myAnswer != undefined && myAnswer != null){
                aManager.CreateAnswer(new Answer(0, FilandaSignin.currentUser, question.id, myAnswer, 0, false, null))
                console.log("Reply")
            }else{
                console.log('reply error')
            }
        }else{
            setModalVisible(!modalVisible);
        }
    }

    return (
        <MySafeArea backgroundColor={"#FFF"}>
            <AppBar title={'Question'} backButton={true} navigation={navigation}/>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You have to be signed in to answer</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Alright</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                </View>
            <View style={styles.container}>
                <ScrollView style={{margin: 0, padding: 0, marginBottom: 50,}} contentProps={{keyboardDismissMode: 'interactive', keyboardShouldPersistTaps: 'handled'}}>
                    <View style={styles.questionContainer}>
                        <QuestionPageCard question={question}/>
                    </View>
                    <View style={styles.answersView}>
                        {
                            answers.map((answer) => 
                                (
                                    <View style={{marginBottom: 8}}>
                                        <AnswerCard key={answer.id} id={answer.id} answer={answer} />
                                    </View>
                                )
                            )
                        }
                    </View>
                </ScrollView>
                <View style={styles.writeAnswerView}>
                    <TouchableOpacity onPress={() => navigation.navigate('Write Comment')}>
                        <View style={styles.writeAnswerWrapper}>
                            <Text style={styles.writeAnswerText}>Add a comment</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </MySafeArea>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C4C4C4',
        flex: 1,
        marginBottom: 32,
    },
    questionContainer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 8,
    },

    answersView:{
        flexDirection: 'column',
        marginBottom: 8,
    },
    answersTitle:{
        fontSize: 22,
        paddingTop: 24,
        paddingLeft: 50
    },
    writeAnswerView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        width: '100%',
    },
    writeAnswerWrapper: {
        marginHorizontal: 8,
        marginVertical: 12,
        padding: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
    },


    centeredView: {
        position: 'absolute',
        left: '5%',
        top: 0,
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',

      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default QuestionPage