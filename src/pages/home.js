import React from 'react'
import Layout from '../components/layout'
import FormNumber from '../components/form_number'
import Number from '../components/number'
import Loading from '../components/loading'
import Error from '../pages/error'
import apiKey from '../config'
import 'bootstrap/dist/css/bootstrap.css'

class Home extends React.Component {


    state = {
        data: [],
        value: '',
        loading: false,
        error: false,
    }

    fetchData = async (value) => {
        try {
            this.setState({
                loading: true,
                error: false,
            })
            console.log('Fetching: ' + value)
            var url = "https://numbersapi.p.rapidapi.com/"+value+"/trivia?fragment=true&notfound=floor&json=true"
            console.log("URL: " + url)
            let res = await fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": apiKey,
                    "x-rapidapi-host": "numbersapi.p.rapidapi.com"
                }
            })
            let data = await res.json()
            this.setState({
                loading: false,
            })
            if (data.Response === "False") {
                this.setState({
                    error: data.Error,
                })
            } else {
                this.setState({
                    data,
                    error: false,
                })
            }
        } catch (e) {
            this.setState({
                error: e,
                loading: false
            })
        }
    }

    handleChange = e => {
        e.preventDefault()
        var value = e.target.value
        var empty = value == ''
        this.setState({
            value: value,
        })
        if (empty) {
            this.setState({
                loading: false,
                error: false,
                data: [],
            })
        } else {
            this.fetchData(value)
        }
    }


    
    display(state) {
        if (state.loading) {
            return <Loading />
        }
        if (state.error) {
            return <Error description={state.error} />
        }
        if (state.data.length === 0) {
            return <h1>No facts found</h1>
        } else {
            /*return <Movie
                {...state.data}
                
            />*/
            return <Number {...state.data} />
            //<div>Displaying!: {state.data}</div>
        }

    }



    render() {
        return (
            <React.Fragment>
                <Layout>
                    <h1>
                        Numbers!
                    </h1>

                    <div>
                        <FormNumber
                            onChange={this.handleChange}
                            value={this.state.value} />

                            
                {this.display(this.state)}
                    </div>
                </Layout>
            </React.Fragment>
        )
    }

}

export default Home