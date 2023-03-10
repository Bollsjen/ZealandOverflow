import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Modal, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MySafeArea from '../components/MySafeArea.js'
import AppBar from '../components/AppBar.js'
import {Picker} from '@react-native-picker/picker';

import QuestionsRepository from '../offline_api/repository/QuestionsRepository.js'

import QuestionCard from '../components/QuestionCard.js';
import FilandaSignin from '../sigin/FilandaSignin.js';
import Chip from '../components/Chip.js';
import axios from 'axios';

const SERVER_URL = 'http://192.168.0.102:3000/api/Questions'

const HomePage = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const [originalQuestions, setOriginalQuestions] = useState([])
  const [questions, setQuestions] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [sortByVotes, setSortByVotes] = useState(0)
  const [sortByViews, setSortByViews] = useState(0)

  const [education, setEducation] = useState(-1)
  const [educations, setEducations] = useState([])
  const [educationError, setEducationError] = useState('')

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if(!loaded){
      fetchQuestions()
      fetchEducations()
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    let filteredList = sort()
    if(education > 0){
      filteredList = filteredList.filter(q => q.educationId == (education-1))
    }
    setQuestions(filteredList)
  }, [education])

  useEffect(() => {
    setQuestions(sort())
  }, [sortByVotes])

  useEffect(() => {
    setQuestions(sort())
  }, [sortByViews])

  const fetchQuestions = async () => {
    try{
      const response = await fetch(SERVER_URL,{
        method: "GET",})
      const data = await response.json()
      setQuestions(await data)
      setOriginalQuestions(await data)
    }catch(error){
      console.log("HomePage"+error)
      setError(error)
    }
    //setQuestions(await qManager.GetAllQuestions())
  }


  const onRefresh = async () => {
    setRefreshing(true)
    await fetchQuestions()
    setRefreshing(false)

    setSortByViews(0)
    setSortByVotes(0)
  }

  const sort = () => {
    let sortedList = originalQuestions.slice()
    sortedList = sortedList.sort((a,b) => (a.id > b.id ? 1 : -1))
    if(sortByVotes == 1){
      sortedList = sortedList.sort((a,b) => (a.votes < b.votes ? 1 : -1))
    }else if(sortByVotes == 2){
      sortedList = sortedList.sort((a,b) => (a.votes > b.votes ? 1 : -1))
    }


    if(sortByViews == 1) {
      sortedList = sortedList.sort((a,b) => (a.views < b.views ? 1 : -1))
    }else if(sortByViews == 2){
      sortedList = sortedList.sort((a,b) => (a.views > b.views ? 1 : -1))
    }

    if(sortByViews == 0 && sortByVotes == 0){
      sortedList = originalQuestions.slice()
    }
    
    console.log(sortByVotes + ', ' + sortByViews)
    return sortedList
  }

  const filter = () => {
    console.log(education)
    let filteredList = questions.slice()
    if(education != educations.length){
      filteredList = filteredList.filter(q => q.educationId == education)
    }
    setQuestions(filteredList)
  }

  const fetchEducations = async () => {
    try{
        const response = await axios.get('http://192.168.0.102:3000/api/Educations')
        const data = await response.data
        let newData = [ "All" ]
        console.log(data)
        newData = newData.concat(data)
        setEducations(await newData)
    }catch(error){
        setEducationError(error)
        console.log(error)
    }
}

  return (
    <MySafeArea style={styles.safeArea}>
        <AppBar title={'Home Page'} navigation={navigation} />
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
                        <Text style={styles.modalText}>You have to be signed in to write a question</Text>
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

        <View style={styles.contentContainer}>
            <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            >
              <View style={styles.educationPickerView}>
                <Picker selectedValue={education} style={styles.educationPicker} onValueChange={(value) => {setEducation(value)}}>
                  {
                    educations.map((e,index) => 
                      (
                        <Picker.Item key={index} value={index} label={e}/>
                      )
                    )
                  }
                </Picker>
              </View>
              <View style={styles.sortingView}>
                <ScrollView horizontal>
                  <Chip title="Votes" state={sortByVotes} setState={setSortByVotes} onPress={() =>{}}/>
                  <Chip title="Views" state={sortByViews} setState={setSortByViews} onPress={() =>{}}/>
                </ScrollView>
              </View>
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
                }else{
                  setModalVisible(!modalVisible)
                }
              }
            }>
            <View style={styles.writeAnswerWrapper}>
              <Text style={styles.writeAnswerText}>Ask a question</Text>
            </View>
          </TouchableOpacity>
        </View>
    </MySafeArea>
  )
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



  sortingView: {
    paddingVertical: 8,
    backgroundColor:'#FFF',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
  educationPickerView: {
    backgroundColor: '#FFF',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
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
  
  export default HomePage