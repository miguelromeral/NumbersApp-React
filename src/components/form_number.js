import React from 'react'
import Layout from './layout'

class FormNumber extends React.Component {

    render() {
        return (
            <Layout>
                <div class="input-group">

                    <select
                        name="type"
                        id="type"
                        className="form-control"
                        onChange={this.props.onChangeType}
                        value={this.props.type}>
                        <option value="trivia">Trivia</option>
                        <option value="math">Math</option>
                        <option value="year">Year</option>
                        <option value="random">Random</option>
                    </select>



                    {this.props.refreshVisible ?
                        null
                        :
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Get info about number..."
                            name="value"
                            value={this.props.value}
                            onChange={this.props.onChange}>
                        </input>
                    }


                    <input
                        className="form-control"
                        type="button"
                        name="refresh"
                        value="Refresh"
                        onClick={this.props.refreshAction}
                    >
                    </input>

                </div>
            </Layout>
        )
    }

}

export default FormNumber