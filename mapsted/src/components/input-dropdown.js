import React, { Component } from 'react'
import Dropdown from 'react-dropdown'

class InputDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: 'Numeric', label: 'Numeric'}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    this.props.onInputTypeChange(option.label)
    this.setState({selected: option})
  }

  render () {
    const options = [
      { value: 'Numeric', label: 'Numeric' },
      { value: 'Text', label: 'Text'},
    ]

    return (
      <section>
        <h3>Please select an input type</h3>
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={this.props.inputType}
          placeholder="Select an input type"
        />
      </section>
    )
  }
}

export default InputDropdown