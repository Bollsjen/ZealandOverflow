import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image, TextInput, Modal, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native';
import MySafeArea from '../components/MySafeArea';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WriteComment = ({route, navigation}) => {

    return (
        <MySafeArea>
            <ScrollView keyboardShouldPersistTaps='handled' style={{flex: 1}}>
                <View style={styles.writeCommentTopView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign style={{fontSize: 24, padding: 4,}} name="arrowleft" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, marginLeft: 8}}>Write a comment</Text>
                    <TouchableOpacity style={{flex:1, alignItems: 'flex-end', marginRight: 4,}}>
                        <Text style={{fontSize: 16, color: '#0066CC', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#D6F1FF', borderRadius: 4,}}>Post</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{height: '100%', width: '100%', padding: 8}}
                    
                />
            </ScrollView>
        </MySafeArea>
    )
}

const styles = StyleSheet.create({
    writeCommentTopView: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderBottomColor: '#999999',
        borderBottomWidth: 1
    }
})

export default WriteComment