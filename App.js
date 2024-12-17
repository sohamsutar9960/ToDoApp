import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/store';
import MainScreen from './src/screens/MainScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              title: 'TODO List',
              headerStyle: {backgroundColor: '#000'},
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="AddTodoScreen"
            component={AddTodoScreen}
            options={{
              title: 'Add TODO',
              headerStyle: {backgroundColor: '#000'},
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
