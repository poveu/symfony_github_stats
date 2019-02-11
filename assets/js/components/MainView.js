import '../../css/app.less';
const loader = require('../images/loader.gif')

import React from 'react';

import Form from './Form'
import ReposData from './ReposData'

export default class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            reposData: null,
            error: null
        };
    }

    //this function is being passed to other components, to let them update repos data
    updateReposData = (newData) => {
        this.setState({
            reposData: newData
        })
    }

    //simple error catching and displaying
    errorHandler = error => {

        var errorMessage = null;

        if (error) {

            if (error.validateMessage) {
                errorMessage =
                    <div className="box error">
                        {error.validateMessage}
                    </div>
            } else if (error.message) {

                if (error.message === "Not Found") {
                    errorMessage =
                        <div className="box error">
                            <h2>Repository not found</h2>
                            {(error.path) && `Path ${error.path} seems to be incorrect.`}
                        </div>
                } else {

                    errorMessage =
                        <div className="box error">
                            <h2>Server returned an error</h2>
                            {error.message}{(error.path) && ` (for path ${error.path})`}
                        </div>

                }

            } else {
                errorMessage =
                    <div className="box error">
                        <h2>Server returned an error</h2>
                        {error}
                    </div>
            }

        }

        this.setState({
            error: errorMessage
        })

    }

    render() {
        return (
            <div>
                <div className="box instructions">
                    <h1>Instructions</h1>
                    <p>
                        Use the form below to see comparision of two GitHub repositories.
                    </p>
                    <p>
                        You can also get JSON data from this API with these endpoints:
                    </p>
                    <ul>
                        <li><span>/repo/<span className="gray">{'{'}owner{'}'}/{'{'}name{'}'}</span></span> - displays stats of single repository <span className="example gray">(for example: <a href="repo/poveu/IPS" target="_blank">/repo/poveu/IPS</a>)</span></li>
                        <li><span>/repo/<span className="gray">{'{'}owner{'}'}/{'{'}name{'}'}</span>/compare/<span className="gray">{'{'}owner{'}'}/{'{'}name{'}'}</span></span> - displays stats and comparision of two repositories <span className="example gray">(for example: <a href="repo/poveu/IPS/compare/poveu/symfony_github_stats" target="_blank">/repo/poveu/IPS/compare/poveu/symfony_github_stats</a>)</span></li>
                    </ul>
                </div>
                <div className="box">
                    <h1>GitHub Repositories Stats</h1>
                    <Form
                        errorHandler={this.errorHandler}
                        updateReposData={this.updateReposData}
                        basePath={this.props.location.pathname}
                    >
                    </Form>

                </div>

                {this.state.error}

                {/* preload loader image */}
                <img rel="preload" src={loader} alt="Ładowanie..." className="image-preloader"></img>

                {
                    this.state.reposData &&
                    <div className="box">
                        <ReposData reposData={this.state.reposData}></ReposData>
                    </div>
                }
            </div>

        )
    }

}