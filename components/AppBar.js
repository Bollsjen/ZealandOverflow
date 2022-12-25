import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { PropTypes, useEffect, useState } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FilandaSignin from '../sigin/FilandaSignin';

const AppBar = (props) => {

    const [menuVisible, setMenuVisible] = useState(false)
    const [signInOut, setSignInOut] = useState('')

    return (
        <View style={styles.appBarContainer}>
        {
            props.backButton ? 
            (
                <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
                    <AntDesign name="arrowleft" style={styles.backButtonIcon} />
                </TouchableOpacity>
            )
            :
            null
        }
            <Text style={styles.appBarTitle}>{props.title}</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => setMenuVisible(!menuVisible)}>
                <Feather style={styles.backButtonIcon} name="menu" />
            </TouchableOpacity>

            {
                menuVisible ? 
                (
                    <View style={styles.appBarMenuView} visible={menuVisible}>
                        {
                            !FilandaSignin.currentUser ?
                            (
                                <TouchableOpacity style={styles.appMenuButton} onPress={() => 
                                    {
                                        setMenuVisible(!menuVisible)
                                        setSignInOut('in')
                                        props.navigation.navigate('Signin')
                                    }}>
                                    <Text style={styles.appBarMenuButtonText}>Signin</Text>
                                </TouchableOpacity>
                            ) :
                            <TouchableOpacity style={styles.appMenuButton} onPress={() => 
                                {
                                    setMenuVisible(!menuVisible)
                                    setSignInOut('out')
                                    FilandaSignin.signout()
                                }}>
                                <Text style={styles.appBarMenuButtonText}>Signout</Text>
                            </TouchableOpacity>
                        }
                    </View>
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    appBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignContent: 'center',
        overflow: 'visible',
        position: 'relative',
        zIndex: 1,
    },
    appBarTitle: {
        flex: 1,
        fontSize: 20
    },
    backButton:{
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    backButtonIcon: {
        fontSize: 24
    },


    appBarMenuView: {
        position: 'absolute',
        top: 50,
        right: 12,
        backgroundColor: '#EFEFEF',
        borderRadius: 5,
        borderColor: '#D8D8D8',
        borderWidth: 1
    },
    appMenuButton: {
    },
    appBarMenuButtonText: {
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
    }
});
  export default AppBar  