import React, { Component } from 'react'
import InputDropdown from './input-dropdown.js'
import axios from 'axios'

class MainContainer extends Component {
  state = {
    inputType: 'Numeric',
    inputSequence: '',
    stepsOutput: []
  }

  handleInputTypeChange = inputTypeChange => {
    this.setState({ inputType: inputTypeChange })
    console.log(this.state.inputType)
  }

  handleInputSequence = event => {
      this.setState({ inputSequence: event.target.value })
  }

  handleSequenceSubmit = () => {
      axios
        .post('http://localhost:3001/sort', {
            mode: this.state.inputType,
            sequence: this.state.inputSequence
        })
        .then(res => {
            this.state.stepsOutput = res.data
        })
        .catch(err => console.error(`There was an error sorting the sequence ${this.state.sequence} with error ${err}`))
  }

  validateAndSubmit = event => {
      // Validate
      this.handleSequenceSubmit()
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
      <strong> {this.state.stepsOutput} </strong> <br/>
    </div>
    </section>
    )
  }

}

export default MainContainer