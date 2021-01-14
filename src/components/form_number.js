import React from 'react'
import Type from '../classes/type'
import Layout from './layout'

class FormNumber extends React.Component {

    showInput() {

        if (this.props.type == Type.RANDOM) {
            return null
        } else {
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
            <div>
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
                    >
                    </input>

                </div>
            </div>
        )
    }

}

export default FormNumber