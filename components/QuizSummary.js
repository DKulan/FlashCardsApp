import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'


class QuizSummary extends React.Component {
  handleResetButton = () => {
    const {navigation} = this.props

    navigation.replace('Quiz', {
      title: navigation.getParam('title')
    })
  }

  handleBackButton = () => {
    this.props.navigation.goBack()
  }

  render() {
    const {getParam} = this.props.navigation

    return (
      <View style={styles.container}>
        <Text>You have completed the quiz!</Text>
        <Text style={{fontSize: 30}}>Your Score:
          <Text style={getParam('score') >= 50 ? styles.highScore : styles.lowScore}> {getParam('score')}%</Text>
        </Text>
        <Button
          buttonStyle={styles.reset}
          title='Reset Quiz'
          onPress={this.handleResetButton}
        />
        <Button
          type='outline'
          buttonStyle={styles.backBtn}
          title='Back to Menu'
          onPress={this.handleBackButton}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reset: {
    marginTop: 100
  },
  backBtn: {
    marginTop: 25
  },
  highScore: {
    color: 'green'
  },
  lowScore: {
    color: 'red'
  }
})

export default QuizSummary