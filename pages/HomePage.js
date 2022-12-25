import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';

import MySafeArea from '../components/MySafeArea.js'
import AppBar from '../components/AppBar.js'

import QuestionsRepository from '../offline_api/repository/QuestionsRepository.js'

import QuestionCard from '../components/QuestionCard.js';

const HomePage = ({navigation}) => {
    const qManager = new QuestionsRepository()

  const [questions, setQuestions] = useState([])
  const [response, setResponse] = useState() 
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    /*try{
      const response = await fetch(DATA_URL,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },})
      const data = await response.json()
      setResponse(await data)
    }catch(error){
      setError(error)
    }*/
    setQuestions(await qManager.GetAllQuestions())
  }

  return (
    <MySafeArea style={styles.safeArea}>
        <AppBar title={'Home Page'} navigation={navigation} />
        <View style={styles.contentContainer}>
            <ScrollView>
            {
                questions.map((q) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Question Page', {id: q.id})}>
                        <QuestionCard key={q.id} question={q} style={styles.questionCards} />
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
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
    }
  });
  
  export default HomePage