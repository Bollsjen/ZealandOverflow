import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { PropTypes, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Chip = (props) => {

    return (
        <TouchableOpacity style={styles.chipTouchable} onPress={() => {let number = props.state; number += 1; number == 3 ? props.setState(0) : props.setState(number); props.onPress()}}>
        <Text style={styles.chipText}>{props.title}</Text>
        {
          props.state == 1 ? 
          (<AntDesign style={styles.chipIcon} name='caretup' />) :
          props.state == 2 ? (<AntDesign style={styles.chipIcon} name='caretdown' />) :
          <AntDesign style={styles.chipIconEmpty} name='' />
        }
        
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chipTouchable: {
        marginRight: 6,
        backgroundColor: '#D6D6D6',
        flex: 0,
        alignitems:'center',
        flexDirection: 'row',
        borderRadius: 20,
        padding: 2,
      },
      chipText: {
        paddingLeft: 12,
        paddingVertical: 2,
        fontSize: 16,
      },
      chipIcon: {
        marginHorizontal: 6,
        marginVertical: 5,
        paddingRight: 2,
        paddingVertical: 2,
        paddingLeft: 2,
        backgroundColor: '#C1C1C1',
        borderRadius: 50,
      },
      chipIconEmpty: {
        marginHorizontal: 6,
        marginVertical: 2,
        paddingRight: 0,
        paddingVertical: 2,
        paddingLeft: 2,
      }
})

export default Chip