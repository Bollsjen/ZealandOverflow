import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import MySafeArea from '../components/MySafeArea.js'
import AppBar from '../components/AppBar.js'

import QuestionsRepository from '../offline_api/repository/QuestionsRepository.js'

import QuestionCard from '../components/QuestionCard.js';
import FilandaSignin from '../sigin/FilandaSignin.js';

const SERVER_URL = 'http://192.168.0.102:3000/api/Questions'

const HomePage = ({navigation}) => {
  const qManager = new QuestionsRepository()
  const [focused, setFocued] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [questions, setQuestions] = useState([])
  const [response, setResponse] = useState() 
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if(!loaded){
      fetchQuestions()
      setLoaded(true)
    }
  }, [])

  const fetchQuestions = async () => {
    try{
      const response = await fetch(SERVER_URL,{
        method: "GET",})
      const data = await response.json()
      setQuestions(await data)
    }catch(error){
      console.log(error)
      setError(error)
    }
    //setQuestions(await qManager.GetAllQuestions())
  }


  const onRefresh = async () => {
    setRefreshing(true)
    await fetchQuestions()
    setRefreshing(false)
  }

  return (
    <MySafeArea style={styles.safeArea}>
        <AppBar title={'Home Page'} navigation={navigation} />
        <View style={styles.contentContainer}>
            <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            >
              <View style={{marginBottom: 154}}>
                {
                  questions.map((q) => (
                      <TouchableOpacity key={q.id} onPress={() => navigation.navigate('Question Page', {id: q.id})}>
                          <QuestionCard question={q} style={styles.questionCards} />
                      </TouchableOpacity>
                  ))
                }
              </View>
            </ScrollView>
        </View>

        <View style={styles.writeAnswerView}>
          <TouchableOpacity onPress={() => {
                if(FilandaSignin.currentUser){
                  navigation.navigate('Write Question')
                }
              }
            }>
            <View style={styles.writeAnswerWrapper}>
              <Text style={styles.writeAnswerText}>Add a comment</Text>
            </View>
          </TouchableOpacity>
        </View>
    </MySafeArea>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#808080'
    },
    contentContainer: {
        flexDirection: 'column'
    },
    questionCards: {
        marginBottom: 8
    },


    writeAnswerView: {
      position: 'absolute',
      bottom: 34,
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
  });
  
  export default HomePage