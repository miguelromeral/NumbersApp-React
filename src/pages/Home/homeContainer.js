/**
 * Home Page
 * 
 * It'll show the form to fetch for number facts
 */

import React from 'react'
import Layout from '../../components/layout'
import FormNumber from '../../components/form_number'
import Number from '../../components/number'
import Loading from '../../components/loading'
import trimDateValue from '../../classes/trimDateValue'
import Error from '../error'
import apiKey from '../../config'
import Type from '../../classes/type'
import Home from './home'
import 'bootstrap/dist/css/bootstrap.css'

/**
 * Container Component for Home page
 */
class HomeContainer extends React.Component {

    state = {
        // Data retreived from the API
        data: [],
        // Input from the user
        value: '',
        // Type of query
        type: Type.TRIVIA,
        // Flag if the query is being performed
        loading: false,
        // Flag if the query had some problem
        error: false,
    }

    /**
     * Gets a different URL depending on the type of query
     * @param {string} value Value in the input. It may be YYYY-MM-DD or just a number in a string
     * @param {Type} type Type of query
     */
    getUrlByType = (value, type) => {
        // In case of random, no value needed
        if (type == Type.RANDOM) {
            return "https://numbersapi.p.rapidapi.com/random/trivia?&fragment=true&json=true";
        }
        // If it has no value, no fetch can be performed
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

    /**
     * Performs the query to the API asynchronously
     * @param {string} value Value in the input. It may be YYYY-MM-DD or just a number in a string
     * @param {Type} type Type of query
     */
    fetchData = async (value, type) => {
        try {
            // Loading State
            this.setState({
                loading: true,
                error: false,
            })
            console.log('Fetching: ' + value + ", Type: "+ type)
            var url = this.getUrlByType(value, type)
            console.log("URL: " + url)
            if (url != null) {
                // Performs the query
                let res = await fetch(url, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": apiKey,
                        "x-rapidapi-host": "numbersapi.p.rapidapi.com"
                    }
                })
                // Data retrieved
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

    /**
     * Action when changing input's value
     * @param {event} e 
     */
    handleChange = e => {
        e.preventDefault()
        var value = e.target.value
        var empty = value == ''
        this.setState({
            value: value,
        })
        // If no value specified, nothing to show
        if (empty) {
            this.setState({
                loading: false,
                error: false,
                data: [],
            })
        } else {
            // If there is a value, fetch it as the user types
            this.fetchData(value, this.state.type)
        }
    }


    /**
     * Action when changing the type of query
     * @param {event} e  
     */
    handleChangeType = e => {
        e.preventDefault()
        var type = e.target.value
        var lastType = this.state.type
        console.log("New Type: " + type)
        this.setState({
            type: type,
            // In case there has been a change to/from date, put empty values to prevent format exceptions
            value: (lastType == Type.DATE || type == Type.DATE ? '' : this.state.value)
        })
        // Erase the latest result from the API when changing dates
        if (type == Type.DATE || lastType == Type.DATE) {
            this.fetchData('', '')
        } else {
            // If there is already a value or the random type (that doesn't requiere value), performs the fetch
            if (this.state.value !== '' || type == 'random') {
                this.fetchData(this.state.value, type)
            }
        }
    }

    /**
     * Refresh button action
     * @param {event} e 
     */
    refreshFetch = e => {
        // Gets the current value and type
        this.fetchData(this.state.value, this.state.type)
    }


    render() {
        return (
            <Home
                state={this.state}
                onChange={this.handleChange}
                onChangeType={this.handleChangeType}
                value={this.state.value}
                type={this.state.type}
                refreshAction={this.refreshFetch}
            />
        )
    }

}

export default HomeContainer