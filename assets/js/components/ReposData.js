import React, { Component } from 'react';

const loader = require('../images/loader.gif');

export default class ReposData extends Component {

    //if difference between stats exists, display it
    showDifference = (data) => {
        var difference = data.difference;
        if (difference && difference !== 0) {
            return (
                <span className={`difference ${(difference > 0) ? "bigger" : "lower"}`}>
                    {((difference > 0) ? `(+${difference})` : `(${difference})`)}
                </span>
            )
        }

    }

    formatTable = (data) => {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{data[0].name.value}</td>
                        <td>{data[1].name.value}</td>
                    </tr>
                    <tr>
                        <td>Forks</td>
                        <td>{data[0].forks_count.value}{this.showDifference(data[0].forks_count)}</td>
                        <td>{data[1].forks_count.value}{this.showDifference(data[1].forks_count)}</td>
                    </tr>
                    <tr>
                        <td>Stars</td>
                        <td>{data[0].stargazers_count.value}{this.showDifference(data[0].stargazers_count)}</td>
                        <td>{data[1].stargazers_count.value}{this.showDifference(data[1].stargazers_count)}</td>
                    </tr>
                    <tr>
                        <td>Watchers</td>
                        <td>{data[0].subscribers_count.value}{this.showDifference(data[0].subscribers_count)}</td>
                        <td>{data[1].subscribers_count.value}{this.showDifference(data[1].subscribers_count)}</td>
                    </tr>
                    <tr>
                        <td>Last release date</td>
                        <td>{data[0].latest_release.published_at.value}</td>
                        <td>{data[1].latest_release.published_at.value}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    //display repos data or loader while loading
    displayData = (data) => {
        if (data) {
            if (data.length === 0)
                return <img rel="preload" src={loader} alt="Ładowanie..."></img>
            else {
                console.log(JSON.stringify(data, null, 2))
                return (
                    <div className="table-container">
                        {this.formatTable(data)}
                    </div>
                )

            }

        }
    }

    render() {

        const { reposData } = this.props;
        return (
            <div className="repo-data">
                {this.displayData(reposData)}
            </div>
        );
    }
}