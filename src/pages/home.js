import React from 'react'
import Layout from '../components/layout'
import FormNumber from '../components/form_number'
import Number from '../components/number'
import Loading from '../components/loading'
import trimDateValue from '../components/trimDateValue'
import Error from '../pages/error'
import apiKey from '../config'
import Type from '../classes/type'
import 'bootstrap/dist/css/bootstrap.css'

class Home extends React.Component {


    state = {
        data: [],
        value: '',
        type: Type.TRIVIA,
        loading: false,
        error: false,
    }

    getUrlByType = (value, type) => {
        if (type == Type.RANDOM) {
            return "https://numbersapi.p.rapidapi.com/random/trivia?&fragment=true&json=true";
        }
        if (value == '') {
            return null;
        }
        switch (type) {
            case Type.TRIVIA: return "https://numbersapi.p.rapidapi.com/" + value + "/trivia?fragment=true&notfound=floor&json=true";
            case Type.MATH: return "https://numbersapi.p.rapidapi.com/" + value + "/math?fragment=true&json=true";
            case Type.YEAR: return "https://numbersapi.p.rapidapi.com/" + value + "/year?fragment=true&json=true";
            case Type.DATE: return "https://numbersapi.p.rapidapi.com/" + trimDateValue(value) + "/date?fragment=true&json=true";
            default: return null;
        }
    }


    fetchData = async (value, type) => {
        try {
            this.setState({
                loading: true,
                error: false,
            })
            console.log('Fetching: ' + value)
            var url = this.getUrlByType(value, type)
            console.log("URL: " + url)
            if (url != null) {
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
            } else {
                this.setState({
                    data: [],
                    error: false,
                    loading: false
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
            console.log("Fetching by value and type: " + value + ", " + this.state.type)
            this.fetchData(value, this.state.type)
        }
    }



    handleChangeType = e => {
        e.preventDefault()
        var type = e.target.value

        var empty = type == ''
        var lastType = this.state.type
        console.log("New Type: " + type)
        this.setState({
            type: type,
            value: (lastType == Type.DATE || type == Type.DATE ? '' : this.state.value)
        })
        if (type == Type.DATE || lastType == Type.DATE) {
            this.fetchData('', '')
        } else {
            if (this.state.value !== '' || type == 'random') {
                console.log("Fetching by value and type: " + this.state.value + ", " + type)
                this.fetchData(this.state.value, type)
            }
        }



    }

    refreshFetch = e => {
        this.fetchData(this.state.value, this.state.type)
    }


    display(state) {
        if (state.loading) {
            return <Loading />
        }
        if (state.error) {
            return <Error description={state.error} />
        }
        if (state.data.length === 0) {
            return <h5>No facts found</h5>
        } else {
            /*return <Movie
                {...state.data}
                
            />*/
            return <Number
                {...state.data}
                type={this.state.type}
                date={this.state.value} />
            //<div>Displaying!: {state.data}</div>
        }

    }



    render() {
        return (
            <React.Fragment>
                <Layout>
                    <h1>
                        Numbers Facts!
                    </h1>

                    <div>
                        <FormNumber
                            onChange={this.handleChange}
                            onChangeType={this.handleChangeType}
                            value={this.state.value}
                            type={this.state.type}
                            refreshAction={this.refreshFetch} />

                    </div>
                    <div>
                        {this.display(this.state)}
                    </div>
                </Layout>
            </React.Fragment>
        )
    }

}

export default Home