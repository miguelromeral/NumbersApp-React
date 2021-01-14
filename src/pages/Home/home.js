import React from 'react'
import Layout from '../../components/layout'
import FormNumber from '../../components/form_number'
import Number from '../../components/number'
import Loading from '../../components/loading'
import Error from '../error'
import 'bootstrap/dist/css/bootstrap.css'

/**
 * Presentational Component for Home page
 */
const Home = ({ state, onChange, onChangeType, value, type, refreshAction }) => (
    <React.Fragment>
        <Layout>
            <h1>
                Numbers Facts!
            </h1>

            <div>
                <FormNumber
                    onChange={onChange}
                    onChangeType={onChangeType}
                    value={value}
                    type={type}
                    refreshAction={refreshAction} />

            </div>
            <div>
                {display(state)}
            </div>
        </Layout>
    </React.Fragment>

)

export default Home

/**
 * Displays the output from the data
 * @param {*} state Home Container Component state
 */
function display(state) {
    if (state.loading) {
        return <Loading />
    }
    if (state.error) {
        return <Error description={state.error} />
    }
    if (state.data.length === 0) {
        return <h5>No facts found</h5>
    } else {
        return <Number
            {...state.data}
            type={state.type}
            date={state.value} />
    }

}