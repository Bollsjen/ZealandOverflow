import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image, TextInput, Modal, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native';
import MySafeArea from '../components/MySafeArea';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilandaSignin from '../sigin/FilandaSignin';
import axios from 'axios';
import { AnswerReplies } from '../offline_api/models/AnswerReplies';

const SERVER_URL = 'http://192.168.0.102:3000/api/Answers/Replies'

const WriteReply = ({route, navigation}) => {
    
    const{id} = route.params

    const [answer, setAnswer] = useState('')

    const submitQuestion = async () => {
        try{
                if(answer != '' && answer != null && answer != undefined){
                    const body = {reply: JSON.stringify(new AnswerReplies(0, FilandaSignin.currentUser, id, answer, 0, false, null))}
                    const response = await axios.post(SERVER_URL, body)
                    if(await response.status == 200){
                        navigation.goBack()
                    }else{
                        console.log(await response.statusText)
                    }
                }else{
                    console.log('reply text error')
                }
        }catch(err){
            console.log('Error: ',err)
        }
    }

    return (
        <MySafeArea>
            <View style={styles.writeQuestionTopView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign style={{fontSize: 24, padding: 4,}} name="arrowleft" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, marginLeft: 8}}>Write a comment reply</Text>
                    <TouchableOpacity style={{flex:1, alignItems: 'flex-end', marginRight: 4,}} onPress={submitQuestion}>
                        <Text style={{fontSize: 16, color: '#0066CC', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#D6F1FF', borderRadius: 4,}}>Post</Text>
                    </TouchableOpacity>
            </View>
            <ScrollView behavior="padding">
                <KeyboardAvoidingView enabled>
                    <View style={styles.questionTextView}>
                        <Text style={styles.questionTextLabel}>Answer</Text>
                        <TextInput
                            style={[styles.questionText, {textAlignVertical: 'top'}]}
                            placeholder="Type a question"
                            multiline
                            numberOfLines={8}
                            value={answer}
                            onChangeText={(text) => setAnswer(text)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </MySafeArea>
    )
}

const styles = StyleSheet.create({
    writeQuestionTopView: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderBottomColor: '#999999',
        borderBottomWidth: 1
    },
    selectImageButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    educationPickerView: {
        padding: 0,
        margin: 0,
        backgroundColor: '#FFF',
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
    },
    questionTextView: {
        backgroundColor: '#FFF',
        paddingHorizontal: 8,
        paddingVertical: 12,
        flexDirection: 'column',
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
    },
    questionTextLabel: {
        color: '#727272',
        paddingVertical: 4,
    },
    questionText: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#EAEAEA',
    },

    questionTagsFieldView: {
        backgroundColor: '#EAEAEA',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    questionTagsInputField: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        flex: 1,
        minWidth: 125,
    },
})

export default WriteReply