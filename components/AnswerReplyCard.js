import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UserRepository } from '../offline_api/repository/UserRepository';
import FilandaSignin from '../sigin/FilandaSignin';

const AnswerReplyCard = (props) => {

    const Answered = () => {
        const date = new Date(props.reply.created)
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
        <View style={styles.answerCardContainer}>
            <View style={styles.answerCardTopWrapper}>
                <View style={styles.answerCardProfilePictureView}>
                    <AntDesign style={styles.answerCardProfilePicture} name="user" />
                </View>
                <View style={styles.answerCardUsernameView}>
                    <Text style={styles.answerCardUsernameText}>{props.reply.user.userName}</Text>
                </View>
                <View style={styles.answerCardDateView}>
                    <Entypo style={{color: '#808080'}} name="dot-single" />
                    <Text style={styles.answerCardDateText}>{Answered()}</Text>
                </View>
            </View>

            <View style={styles.answerCardContent}>
                <Text style={styles.answerCardContentText}>{props.reply.description}</Text>
            </View>

            <View style={styles.answerFooterView}>
                <TouchableOpacity style={styles.reactionButton}>
                    <Feather style={styles.reactionIcon} name="thumbs-up" />
                    <Text style={styles.reactionText}>{props.reply.votes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.reactionButton}>
                    <Feather style={styles.reactionIcon} name="thumbs-down" />
                    <Text style={styles.reactionText}>{props.reply.votes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.reactionButton} onPress={() => {if(FilandaSignin.currentUser) props.navigation.navigate('Write Reply', {id: props.answer})}}>
                        <AntDesign style={styles.reactionIcon} name="back" />
                        <Text style={styles.reactionText}>reply</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.editButton}>
                    <Entypo style={styles.reactionIcon} name="dots-three-horizontal" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    answerCardContainer: {
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

})

export default AnswerReplyCard