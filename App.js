import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'
import DeckListView from './components/DeckListView'
import AddDeck from './components/AddDeck'
import Constants from 'expo-constants'
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'
import DeckQuizView from './components/DeckQuizView'
import AddCard from './components/AddCard'


const CardsStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckListView: {
    screen: DeckListView,
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
  DeckQuizView: {
    screen: DeckQuizView
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add New Card'
    }
  }
})

const AppContainer = createAppContainer(MainNavigator)

const App = () => {
  return (
    <View style={styles}>
      <CardsStatusBar barStyle='light-content' />
      <AppContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: 1
})

export default App
