import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import FlipCard from 'react-native-flip-card'
import {Button} from 'react-native-elements'


class Quiz extends React.Component {
  state = {
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

  renderFlipped = () => (
    <View style={styles.container}>
      <Text style={styles.contentText}>Answer</Text>
      <TouchableOpacity>
        <Button
          title='Correct'
          buttonStyle={styles.correctBtn}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          title='Incorrect'
          buttonStyle={styles.incorrectBtn}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionBtn}>
        <Button
          style={styles.questionBtn}
          title='View Question'
          type='outline'
          onPress={this.handleFlip}
        />
      </TouchableOpacity>
    </View>
  )

  render() {
    return (
      <FlipCard
        flip={this.state.flip}
        clickable={false}
        flipHorizontal={true}
        flipVertical={false}
      >
        <View style={styles.container}>
          <Text style={styles.contentText}>Question</Text>
          <TouchableOpacity>
            <Button
              title='Correct'
              buttonStyle={styles.correctBtn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              title='Incorrect'
              buttonStyle={styles.incorrectBtn}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.answerBtn}>
            <Button
              title='View Answer'
              type='outline'
              onPress={this.handleFlip}
            />
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
    fontSize: 30,
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
    marginTop: 100
  },
  answerBtn: {
    marginTop: 100
  }
})

export default Quiz