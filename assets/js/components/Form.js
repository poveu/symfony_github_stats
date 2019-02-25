import React, { Component } from 'react';

import * as api from '../helpers/ReposApi'

export default class Form extends Component {

    state = {
        firstRepo: '',
        secondRepo: ''
    }

    getReposData = async () => {
        //simple data validation
        var regex = new RegExp(/([a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+)\/*$/);

        //if full URL was specified, extract path from it
        var firstRepoMatch = this.state.firstRepo.match(regex);
        var secondRepoMatch = this.state.secondRepo.match(regex);

        if (this.state.firstRepo === '' || !firstRepoMatch || !firstRepoMatch[0]) {
            this.props.errorHandler({ validateMessage: 'You need to input a correct path or URL to first repository' })
            return;
        }

        if (this.state.secondRepo === '' || !secondRepoMatch || !secondRepoMatch[0]) {
            this.props.errorHandler({ validateMessage: 'You need to input a correct path or URL to second repository' })
            return;
        }

        this.props.errorHandler(null)

        //before fetching, set an empty array to display loader
        this.props.updateReposData([])

        //get repositories data from API
        await api.getReposData(this.props.basePath, { firstRepo: firstRepoMatch[1], secondRepo: secondRepoMatch[1] }, this.props.errorHandler)
            .then(data => {
                if (data) {
                    if (data.message) {
                        this.props.errorHandler(data)
                        this.props.updateReposData(null)
                    } else {
                        this.props.updateReposData(data)
                    }
                } else
                    this.props.updateReposData(null)
            });
    }

    //handle Enter key press in inputs
    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.getReposData()
        }
    }

    //update value of edited input and linked state
    updateInputValue(event, whichOne) {

        switch (whichOne) {
            case 1:
                this.setState({ firstRepo: event.target.value });
                break;
            case 2:
                this.setState({ secondRepo: event.target.value });
                break;
            default:
                console.log('Unknow control');
                break;
        }

    }

    render() {
        return (
            <div>
                <p className="description">
                    Please input paths or URLs to two GitHub repositories you want to compare.
                </p>
                <p className="description info">
                    Correct format is <span>owner/repo_name</span> or <span>https://github.com/owner/repo_name</span>.
                </p>
                <div className="inputs">
                    <input type="text" name="firstRepo" placeholder="e.g.: poveu/IPS" value={this.state.firstRepo} onChange={(event) => this.updateInputValue(event, 1)} onKeyPress={this.handleKeyPress}></input>
                    <input type="text" name="secondRepo" placeholder="e.g.: poveu/symfony_github_stats" value={this.state.secondRepo} onChange={(event) => this.updateInputValue(event, 2)} onKeyPress={this.handleKeyPress}></input>
                </div>
                <button className="compare-button" onClick={this.getReposData}>Compare repositories</button>
            </div>
        );
    }
}