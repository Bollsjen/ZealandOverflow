import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { UserRepository } from '../offline_api/repository/UserRepository';

const SERVER_URL = 'http://192.168.0.102:3000/api/Questions'

const QuestionPageCard = (props) => {
    const uManager = new UserRepository()
    const {id} = props
    const [question, setQuestion] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        fetchQuestion()
    },[])

    const fetchQuestion = async () => {
        try{
            const response = await axios.get(SERVER_URL+'/'+id)
            const data = await response.data
            setQuestion(data[0])
        }catch(e){
            console.error('question Fetch error', e)
        }
    }

    const Asked = () => {
        const date = new Date(question.created)
        const now = Date.now()
        const difference = now - (date.getTime() * 1000)
        
        const seconds = Math.floor(difference / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          };

          const formattedDate = date.toLocaleDateString('da-DK', options);
          const actualDate = formattedDate.replace(/\./g,'/')

          if(days < 1){
            if(hours < 1){
                return minutes + 'm ago'
            }else {
                return hours + 'h ago'
            }
        } else if(days > 1 && days < 3){
            return hours + 'h ago'
        } else if (days > 2 && days < 15){
            return days + 'h ago'
        }else {
            return actualDate
        }
    }

    const UserSince = () => {
        const date = new Date(question.user ? question.user.created * 1000 : 0)
        const now = Date.now()
        const difference = now - (date.getTime() * 1000)
        
        const seconds = Math.floor(difference / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          };

          const formattedDate = date.toLocaleDateString('da-DK', options);
          const actualDate = formattedDate.replace(/\./g,'/')
          return actualDate
    }

    return (
        <View style={styles.questionContainer}>
            <View style={styles.questionCardTopWrapper}>
                <View style={styles.questionCardProfilePictureView}>
                    <AntDesign style={styles.questionCardProfilePicture} name="user" />
                </View>
                <View style={styles.questionCardUsernameView}>
                    <Text style={styles.questionCardUsernameText}>{question.user && question.user.userName}</Text>
                </View>
                <View style={styles.questionCardDateView}>
                    <Entypo style={{color: '#808080'}} name="dot-single" />
                    <Text style={styles.questionCardDateText}>{Asked()}</Text>
                </View>
            </View>

            <View style={styles.questionCardContent}>
                <Text style={styles.questionContentText}>{question.description}</Text>
            </View>

            <View style={styles.questionFooterView}>
                <TouchableOpacity style={styles.reactionButton}>
                    <Feather style={styles.reactionIcon} name="thumbs-up" />
                    <Text style={styles.reactionText}>{question.votes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.reactionButton}>
                    <Feather style={styles.reactionIcon} name="thumbs-down" />
                    <Text style={styles.reactionText}>{question.votes}</Text>
                </TouchableOpacity>

                <View style={styles.reactionButton}>
                    <FontAwesome style={styles.reactionIcon} name="commenting-o" />
                    <Text style={styles.reactionText}>{question.votes}</Text>
                </View>

                <TouchableOpacity style={styles.editButton}>
                    <Entypo style={styles.reactionIcon} name="dots-three-horizontal" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    questionContainer:{
        flexDirection: 'column',
        marginBottom: 8,
        backgroundColor: '#FFF'
    },
    questionCardTopWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    questionCardProfilePictureView: {
        backgroundColor: '#E0E0E0',
        borderRadius: 50,
    },
    questionCardProfilePicture: {
        fontSize: 24,
    },
    questionCardUsernameView:{
        paddingLeft: 4,
    },
    questionCardUsernameText:{
        fontSize: 14
    },
    questionCardDateView: {
        paddingLeft: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    questionCardDateText:{
        paddingLeft: 4,
        color: '#808080',
        fontSize: 12,
    },


    questionCardContent: {
        paddingVertical: 16,
    },
    questionContentText:{
        fontSize: 16,
    },



    questionFooterView:{
        flexDirection: 'row',
        flex: 1,
        width: '100%'
    },
    reactionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 70,
        alignSelf: 'flex-start'
    },
    reactionIcon: {
        fontSize: 18,
    },
    reactionText: {
        fontSize: 14,
        paddingLeft: 4,
    },
    editButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    }
})

export default QuestionPageCard