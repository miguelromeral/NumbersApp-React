import React from 'react'
import Type from '../classes/type'
import Layout from './layout'

/**
 * Form to set the number to look for facts
 */
class FormNumber extends React.Component {

    /**
     * Shows a different input depending of the type
     */
    showInput() {
        // If random facts, no need to set any input
        if (this.props.type == Type.RANDOM) {
            return null
        } else {
            // Same input, but changing the type if needed
            return <input
                type={this.props.type == Type.DATE ? "date" : "number"}
                className="form-control"
                placeholder="Get info about number..."
                name="value"
                value={this.props.value}
                onChange={this.props.onChange}>
            </input>
        }
    }

    render() {
        return (
            <React.Fragment>
                <div class="input-group">

                    <select
                        name="type"
                        id="type"
                        className="form-control"
                        onChange={this.props.onChangeType}
                        value={this.props.type}>
                        <option value={Type.TRIVIA}>Trivia</option>
                        <option value={Type.MATH}>Math</option>
                        <option value={Type.YEAR}>Year</option>
                        <option value={Type.DATE}>Date</option>
                        <option value={Type.RANDOM}>Random</option>
                    </select>



                    {this.showInput()}


                    <input
                        className="form-control"
                        type="button"
                        name="refresh"
                        value="Refresh"
                        onClick={this.props.refreshAction}
                    />


                </div>
            </React.Fragment>
        )
    }

}

export default FormNumber