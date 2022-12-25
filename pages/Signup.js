import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image, TextInput, Modal, Pressable } from 'react-native';
import AppBar from '../components/AppBar';
import MySafeArea from '../components/MySafeArea';

import AntDesign from 'react-native-vector-icons/AntDesign';

const Signup = ({navigation}) => {
    return (
        <MySafeArea>
            <AppBar title={'Signup'} navigation={navigation} backButton={true} />
            <View style={styles.siginView}>
                <View style={styles.inputFieldView}>
                    <Text style={styles.inputFieldLabel}>E-mail</Text>
                    <TextInput style={styles.inputField} placeholder={'E-mail...'} />
                </View>

                <View style={styles.inputFieldView}>
                    <Text style={styles.inputFieldLabel}>Username</Text>
                    <TextInput style={styles.inputField} placeholder={'Username...'} />
                </View>

                <View style={styles.inputFieldView}>
                    <Text style={styles.inputFieldLabel}>Password</Text>
                    <TextInput secureTextEntry style={styles.inputField} placeholder={'Password...'} />
                </View>

                <View style={styles.signinButtonView}>
                    <TouchableOpacity style={styles.signinButton}>
                        <Text style={styles.signinButtonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.signupView}>
                <Text style={styles.signupLabel}>Already have an account?</Text>
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.signupButtonText}>Signin</Text>
                    <AntDesign style={styles.signinButtonIcon} name="right" />
                </TouchableOpacity>
            </View>
        </MySafeArea>
    )
}

const styles = StyleSheet.create({
    siginView:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3,
        paddingHorizontal: 32,
    },
    inputFieldView: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 12,
    },
    inputFieldLabel: {
        fontSize: 14,
        paddingVertical: 8,
    },
    inputField: {
        backgroundColor: '#FFF',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },


    signinButtonView: {
        marginTop: 32,
    },
    signinButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
    },
    signinButtonText: {
        paddingHorizontal: 72,
        paddingVertical: 12,
        color: '#FFF',
        fontSize: 18,
    },


    signupView: {
        marginTop: 32,
        flex: 1.5,
        paddingHorizontal: 32,
    },
    signupLabel: {
        paddingVertical: 16,
    },
    signupButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    signupButtonText: {
        color: '#777',
        paddingVertical: 8,
    },
    signinButtonIcon: {
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: '#777',
    }
})

export default Signup