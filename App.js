import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import decks from './reducers'
import {logger} from './middleware'
import thunk from 'redux-thunk'
import Constants from 'expo-constants'
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation'
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import DeckList from './components/DeckList'
import DeckMenu from './components/DeckMenu'
import Quiz from './components/Quiz'


const CardsStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <AntDesign name='pluscircleo' color={tintColor}/>
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckMenu: {
    screen: DeckMenu
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add New Card'
    }
  },
  Quiz: {
    screen: Quiz
  }
})

const AppContainer = createAppContainer(MainNavigator)

const store = createStore(decks, applyMiddleware(thunk, logger))

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles}>
        <CardsStatusBar barStyle='light-content'/>
        <AppContainer/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  flex: 1
})

export default App
