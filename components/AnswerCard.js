import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnswersRepository from '../offline_api/repository/AnswersRepository';
import { UserRepository } from '../offline_api/repository/UserRepository';
import AnswerReplyCard from './AnswerReplyCard';

const SERVER_URL = 'http://192.168.0.102:3000/api/Answers/Replies/by/answer/'

const AnswerCard = (props) => {
    const uManager = new UserRepository()
    const aManager = new AnswersRepository()
    const [replies, setReplies] = useState([])

    useEffect(() => {
        GetReplies()
    }, [])

    const GetReplies = async () => {
        try{
            const response = await axios.get(SERVER_URL + props.answer.id)
            const data = await response.data
            setReplies(data)
        }catch(err){
            console.log(err)
        }
    }

    const UserSince = () => {
        const date = new Date(props.answer.user ? props.answer.user.created * 1000 : '')
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

    const Answered = () => {
        const date = new Date(props.answer.created)
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

    return (
        <View style={styles.answerCardWrapper}>
            <View style={styles.answerCardContainer}>
                <View style={styles.answerCardTopWrapper}>
                    <View style={styles.answerCardProfilePictureView}>
                        <AntDesign style={styles.answerCardProfilePicture} name="user" />
                    </View>
                    <View style={styles.answerCardUsernameView}>
                        <Text style={styles.answerCardUsernameText}>{props.answer.user.userName}</Text>
                    </View>
                    <View style={styles.answerCardDateView}>
                        <Entypo style={{color: '#808080'}} name="dot-single" />
                        <Text style={styles.answerCardDateText}>{Answered()}</Text>
                    </View>
                    {
                        props.answer.solution ? 
                        (
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <AntDesign style={{color: '#33CC33', fontSize: 24}} name="checkcircle" />
                            </View>
                        ) :
                        null
                    }
                </View>

                <View style={styles.answerCardContent}>
                    <Text style={styles.answerCardContentText}>{props.answer.description}</Text>
                </View>

                <View style={styles.answerFooterView}>
                    <TouchableOpacity style={styles.reactionButton}>
                        <Feather style={styles.reactionIcon} name="thumbs-up" />
                        <Text style={styles.reactionText}>{props.answer.votes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reactionButton}>
                        <Feather style={styles.reactionIcon} name="thumbs-down" />
                        <Text style={styles.reactionText}>{props.answer.votes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reactionButton}>
                        <AntDesign style={styles.reactionIcon} name="back" />
                        <Text style={styles.reactionText}>reply</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.editButton}>
                        <Entypo style={styles.reactionIcon} name="dots-three-horizontal" />
                    </TouchableOpacity>
                </View>

                {
                    replies.length > 0 ? 
                    (
                        <View style={styles.answerReplysView}>
                            {
                                replies.map((reply, index) => {
                                    if(index != replies.length-1){
                                        return(
                                            <View style={{marginBottom: 42}}>
                                                <AnswerReplyCard reply={reply} />
                                            </View>
                                        )
                                    }else{
                                        return(
                                            <View style={{marginBottom: 8}}>
                                                <AnswerReplyCard reply={reply} />
                                            </View>
                                        )
                                    }
                                })
                            }
                        </View>
                    ) :
                    (
                        <View style={{marginTop: 8}}></View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    answerCardWrapper: {
        paddingLeft: 24,
        paddingRight: 8,
        paddingVertical: 16,
        backgroundColor: '#FFF'
    },
    answerCardContainer: {
        borderLeftColor: '#808080',
        borderLeftWidth: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    answerCardTopWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    answerCardProfilePictureView: {
        backgroundColor: '#E0E0E0',
        borderRadius: 50,
    },
    answerCardProfilePicture: {
        fontSize: 24,
    },
    answerCardUsernameView:{
        paddingLeft: 4,
    },
    answerCardUsernameText:{
        fontSize: 14
    },
    answerCardDateView: {
        paddingLeft: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    answerCardDateText:{
        paddingLeft: 4,
        color: '#808080',
        fontSize: 12,
    },


    answerCardContent: {
        paddingVertical: 16,
        marginLeft: 20,
    },
    answerCardContentText: {
        fontSize: 16,
    },


    answerFooterView:{
        flexDirection: 'row',
        flex: 1,
        marginLeft: 20,
        marginRight: 8,
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
    },




    answerReplysView: {
        marginTop: 24,
        marginLeft: 28,
        borderLeftColor: '#808080',
        borderLeftWidth: 1,
    }
})

export default AnswerCard