import React, { Component } from 'react'
import InputDropdown from './input-dropdown.js'
import ResultDisplay from './result-display.js'
import axios from 'axios'

class MainContainer extends Component {
  state = {
    inputType: 'Numeric',
    inputSequence: '',
    stepsOutput: [],
    isError: false,
  }

  // handles the dropdown menu's selection of input type
  handleInputTypeChange = inputTypeChange => {
    this.setState({ inputType: inputTypeChange })
  }

  // handles the input box's change of value
  handleInputSequence = event => {
      this.setState({ inputSequence: event.target.value })
  }

  // handles the call to backend for sorting the sequence
  handleSequenceSubmit = () => {
      axios
        .post('http://localhost:3001/sort/sequence', {
            mode: this.state.inputType,
            sequence: this.state.inputSequence
        })
        .then(res => {
          this.setState({stepsOutput: res.data.resultingSteps})
        })
        .catch(err => {
          console.error(`There was an error sorting the sequence ${this.state.sequence} with error ${err}`)
          this.setState({ stepsOutput: `There was an error sorting the sequence ${this.state.sequence} with error ${err}` })
        })
  }

  checkValidity = (input) => {
    if (input.length < 1 && input.length > 100) {
      return false
    }

    if (this.state.inputType === 'Numeric')  {
        return !input.some(isNaN)
    } else {
        return !input.some((element) => element.length > 10)
    }
  }

  // handles the client side validation of input and submits to backend
  validateAndSubmit = event => {
      const inputArray = this.state.inputSequence.split(',')

      if(this.checkValidity(inputArray)) {
        this.setState({ isError: false })
        this.handleSequenceSubmit()
      } else {
        this.setState({ isError: true })
      }
  }

  render() {
    return (
    <section>
      <InputDropdown inputType={this.state.inputType} onInputTypeChange={this.handleInputTypeChange} />
      <input type='text' onChange={this.handleInputSequence}/>
      <button onClick={this.validateAndSubmit}>
          Sort!
      </button>
      <div className='result'>
      You selected
      <strong> {this.state.inputType} </strong> <br/>
      With sequence
      <strong> {this.state.inputSequence} </strong> <br/>
      And got result
      <ResultDisplay isError={this.state.isError} stepsOutput={this.state.stepsOutput}/>
    </div>
    </section>
    )
  }

}

export default MainContainer