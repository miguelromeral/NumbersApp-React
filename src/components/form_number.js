import React from 'react'
import Layout from './layout'

class FormNumber extends React.Component {

    render() {
        return (
            <Layout>
                <div class="input-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Get info about number..."
                        name="value"
                        value={this.props.value}
                        onChange={this.props.onChange}>
                    </input>
                </div>
            </Layout>
        )
    }

}

export default FormNumber