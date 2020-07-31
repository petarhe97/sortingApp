import React, { Component } from 'react'

class ResultDisplay extends Component {
  constructor (props) {
    super(props)
  }

  // renders a div displaying an error message if the validation results in an error
  // otherwise show the sorting steps
  render () {
    const isErr = this.props.isError;
    let resultDiv;
    if (isErr) {
        resultDiv = <div>Error! Please whether your input matches input type, within 1 to 100 values, and up to 10 characters long</div>
    } else {
        resultDiv = <div>
            {this.props.stepsOutput.map(function(element, idx){ return (<li key={idx}>{element}</li>)})}
        </div>
    }

    return (
      <div>
          {resultDiv}
      </div>
    )
  }
}

export default ResultDisplay