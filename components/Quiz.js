import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import FlipCard from 'react-native-flip-card'
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'


class Quiz extends React.Component {
  state = {
    currentQuestionIndex: 0,
    score: 0,
    flip: false
  }

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.getParam('title')} Quiz`
  })

  handleFlip = () => {
    this.setState((prevState) => ({
      flip: !prevState.flip
    }))
  }

  handleCorrect = () => {
    const {questions, navigation} = this.props
    const {currentQuestionIndex, score} = this.state

    if (currentQuestionIndex + 1 < questions.length) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        score: prevState.score + 1
      }))
    } else {
      navigation.replace('QuizSummary', {
        score: Math.floor(((score + 1)/questions.length)*100),
        title: navigation.getParam('title')
      })
    }
  }

  handleIncorrect = () => {
    const {questions, navigation} = this.props
    const {currentQuestionIndex, score} = this.state

    if (currentQuestionIndex + 1 < questions.length) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }))
    } else {
      navigation.replace('QuizSummary', {
        score: Math.floor((score/questions.length)*100),
        title: navigation.getParam('title')
      })
    }
  }

  renderFlipped = () => {
    const {questions} = this.props
    const {currentQuestionIndex} = this.state

    return (
      <View style={styles.container}>
        <Text>{`${currentQuestionIndex + 1}/${questions.length}`}</Text>
        <Text style={styles.contentText}>{questions[currentQuestionIndex].answer}</Text>
        <TouchableOpacity>
          <Button
            title='Correct'
            buttonStyle={styles.correctBtn}
            onPress={this.handleCorrect}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            title='Incorrect'
            buttonStyle={styles.incorrectBtn}
            onPress={this.handleIncorrect}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.questionBtn}
            onPress={this.handleFlip}
          >View Question</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {questions} = this.props
    const {currentQuestionIndex} = this.state

    return (
      <FlipCard
        flip={this.state.flip}
        clickable={false}
        flipHorizontal={true}
        flipVertical={false}
      >
        <View style={styles.container}>
          <Text>{`${currentQuestionIndex + 1}/${questions.length}`}</Text>
          <Text style={styles.contentText}>{questions[currentQuestionIndex].question}</Text>
          <TouchableOpacity>
            <Button
              title='Correct'
              buttonStyle={styles.correctBtn}
              onPress={this.handleCorrect}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              title='Incorrect'
              buttonStyle={styles.incorrectBtn}
              onPress={this.handleIncorrect}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.answerBtn}
              onPress={this.handleFlip}
            >View Answer</Text>
          </TouchableOpacity>
        </View>
        {this.renderFlipped()}
      </FlipCard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 100
  },
  correctBtn: {
    backgroundColor: 'green',
    width: 100,
    marginBottom: 25
  },
  incorrectBtn: {
    backgroundColor: 'red',
    width: 100
  },
  questionBtn: {
    color: 'red',
    marginTop: 50
  },
  answerBtn: {
    color: 'red',
    marginTop: 50
  }
})

const mapStateToProps = (state, {navigation}) => ({
  questions: state[navigation.getParam('title')].questions
})

export default connect(mapStateToProps)(Quiz)