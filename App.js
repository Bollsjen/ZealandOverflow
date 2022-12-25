import { StyleSheet, StatusBar, Button, LogoTitle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import WriteComment from './pages/WriteComment';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Home" component={HomePage}/>
        <Stack.Screen name="Question Page" component={QuestionPage}/>
        <Stack.Screen name="Write Comment" component={WriteComment}/>

        <Stack.Screen name="Signin" component={Signin}/>
        <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight
  },
});
