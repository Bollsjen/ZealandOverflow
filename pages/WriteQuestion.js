import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform, KeyboardAvoidingView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import MySafeArea from '../components/MySafeArea'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Question } from '../offline_api/models/Question';
import FilandaSignin from '../sigin/FilandaSignin';

const SERVER_URL = 'http://192.168.0.102:3000'

const createFormData = (photo, body = {}) => {
    const data = new FormData()
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    })
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    })
  
    return data;
  }

const WriteQuestion = ({route, navigation}) => {
    const [education, setEducation] = useState(0)
    const [educations, setEducations] = useState([])
    const [educationError, setEducationError] = useState()

    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')

    const [currentTag, setCurrentTag] = useState('')
    const [tags, setTags] = useState([])

    useEffect(() => {
        setTags([])
        setCurrentTag('')
        fetchEducations()
    }, [])


    const fetchEducations = async () => {
        try{
            const response = await fetch(SERVER_URL + '/api/Educations',{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            setEducations(await data)
        }catch(error){
            setEducationError(error)
        }
    }

    const tagTyping = () => {
        if(currentTag[currentTag.length-1] == ','){
            const tag = currentTag.slice(0,-1)
            setTags([...tags, tag])
            setCurrentTag('')
        }
    }

    const editTags = (index) => {
        const tag = tags[index]
        let newTags = tags
        newTags.splice(index, 1)
        setTags(newTags)
        setCurrentTag(tag)
    }

    const submitQuestion = async () => {
        try{
            if(title != '' && title != null && title != undefined){
                if(question != '' && question != null && question != undefined){
                    const response = await fetch(SERVER_URL + '/api/Questions', {
                        method: "POST",
                        body: JSON.stringify({
                            question: new Question(0, FilandaSignin.currentUser, title, education, question, 0, null, tags)
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if(await response.ok){
                        navigation.navigate('Home')
                    }
                }
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
                    <Text style={{fontSize: 20, marginLeft: 8}}>Write a question</Text>
                    <TouchableOpacity style={{flex:1, alignItems: 'flex-end', marginRight: 4,}} onPress={submitQuestion}>
                        <Text style={{fontSize: 16, color: '#0066CC', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#D6F1FF', borderRadius: 4,}}>Post</Text>
                    </TouchableOpacity>
            </View>
            <ScrollView behavior="padding">
                <KeyboardAvoidingView enabled>
                    <View style={styles.educationPickerView}>
                        <Text style={{paddingHorizontal: 8, paddingVertical: 8,}}>Choose your education</Text>
                        <Picker selectedValue={education} style={styles.educationPicker} onValueChange={(value) => setEducation(value)}>
                            {
                                educations.map((e, index) => 
                                {
                                    return <Picker.Item key={index} label={e} value={index} />
                                })
                            }
                        </Picker>
                    </View>

                    <View style={styles.questionTextView}>
                        <Text style={styles.questionTextLabel}>Title</Text>
                        <TextInput
                            style={styles.questionText}
                            placeholder="Type a question title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>

                    <View style={styles.questionTextView}>
                        <Text style={styles.questionTextLabel}>Question</Text>
                        <TextInput
                            style={[styles.questionText, {textAlignVertical: 'top'}]}
                            placeholder="Type a question"
                            multiline
                            numberOfLines={8}
                            value={question}
                            onChangeText={(text) => setQuestion(text)}
                        />
                    </View>

                    <View style={[styles.questionTextView, {marginBottom: 34,}]}>
                        <Text style={styles.questionTextLabel}>Tags (type a comma to seperate tags)</Text>
                        <View style={styles.questionTagsFieldView}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {
                                    tags.map((t, index) =>  {
                                        if(index == 0){
                                            return (
                                                <TouchableOpacity key={index} style={[styles.tagsView, {marginLeft: 6}]} onPress={() => editTags(index)}>
                                                    <Text style={styles.tagsText}>{t}</Text>
                                                </TouchableOpacity>
                                            )
                                        } else{
                                            return (
                                                <TouchableOpacity key={index} style={styles.tagsView} onPress={() => editTags(index)}>
                                                    <Text style={styles.tagsText}>{t}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    })
                                }
                                <TextInput
                                    style={styles.questionTagsInputField}
                                    placeholder="Type tags"
                                    value={currentTag}
                                    onChangeText={(text) => {
                                        setCurrentTag(text)
                                        tagTyping()
                                        }
                                    }
                                />
                            </View>
                        </View>
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



    tagsView: {
        marginRight: 4,
        paddingLeft: 4,
        paddingTop: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tagsText: {
        color: '#39739D',
        backgroundColor: '#CDE3F2',
        fontSize: 14,
        paddingHorizontal: 6,
        paddingVertical: 2,
    }
})

export default WriteQuestion