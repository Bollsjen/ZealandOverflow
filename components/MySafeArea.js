import { View, StyleSheet, StatusBar } from 'react-native';

let myBackgroundColor = '#CCCCCC'

const MySafeArea = (props) => {
    props.backgroundColor != undefined || props.backgroundColor != null ? myBackgroundColor = props.backgroundColor : myBackgroundColor = '#CCCCCC'

    return (
        <View style={styles.mySafeArea}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    mySafeArea: {
      marginTop: StatusBar.currentHeight,
      backgroundColor: myBackgroundColor,
      height: '100%'
    },
  });

  export default MySafeArea