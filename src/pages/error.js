import React from 'react'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.css'

function Error(props) {

    function showDescription() {
        if(props.description != null){
            return <h2>{props.description}</h2>
        }
    }

    return (
        <React.Fragment>
            <Layout>
                <h1>
                    Something Happened! :(
                </h1>
                {showDescription()}
            </Layout>

        </React.Fragment>
    )

}

export default Error