import React, {Component}  from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

// imports for player collection to work
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';
import {Players} from "../api/players";
import PropTypes from 'prop-types';

// import as parts of the project
import TeamList from './Team-list';
import TeamStats from './Team-stats';
import Player from './Player';
import AccountsWrapper from './AccountsWrapper';
import Edit from "./EditPlayer"

// import image collection
import UserFiles from '../api/FilesCol.js'
import {Meteor} from "meteor/meteor";


const tempPlayer = {
    name              :  "Temp player",
    team              :  "Devils",
    ballManipulation  :  1,
    kickingAbilities  :  2,
    passingAbilities  :  0,
    duelTackling      :  3,
    fieldCoverage     :  1,
    blockingAbilities :  2,
    gameStrategy      :  3,
    playmakingRisks   :  0,
    notes             :  "temporary player",
};


class App extends Component {

    constructor (props) {
        super(props);
        // setting up the state
        this.state = {
            currentPlayer : tempPlayer,
            showEditPlayer : false,
        };
    }

    renderPlayers () {
        return this.props.players.map((player) => (
            <TeamList key={player._id} player={player} updateCurrentPlayer={this.updateCurrentPlayer.bind(this)}/>
        ))
    }

    updateCurrentPlayer (player) {
        this.setState({
            currentPlayer : player,
        });
        console.log("Iam working");
    }

    showEditForm () {
        this.setState({
            showEditPlayer : true,
        });
    }

    showTeamStats () {
        this.setState({
            showEditPlayer : false,
        });
    }

    showForm () {
        if (this.state.showEditPlayer === true){
            return (<Edit currentPlayer={this.state.currentPlayer} showTeamStats={this.showTeamStats.bind(this)} updateCurrentPlayer={this.updateCurrentPlayer.bind(this)}/>);
        } else {
            return (<TeamStats players={this.props.players}/>);
        }
    }

    render () {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <AppBar
                        title = {"Soccer Application"}
                        iconClassNameRight = {"muidocs-icon-navigation-expand-more"}
                        showMenuIconButton = {false}
                        style={{backgroundColor : '#0277BD'}}>
                        <AccountsWrapper />
                    </AppBar>
                    <div className="row">
                        <div className = "col s12 m7">
                            <Player player={this.state.currentPlayer} files={this.props.files} showEditForm={this.showEditForm.bind(this)}/>
                        </div>
                        <div className = "col s12 m5">
                            <h2> Team List </h2>
                            <Link to="/New" className="waves-effects btn waves-light light-blue darken-3">Add player</Link>
                            <Divider/>
                            <List>
                                {this.renderPlayers()}
                            </List>
                            <Divider/>
                        </div>
                    </div>
                    <div className="row">
                        <div className = "col s12">
                            <br/>
                            <Divider/>
                            {this.showForm()}
                            <Divider/>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

    // we expect to have an array to our state soi we make sure of the received type here
    static propTypes = {
        players : PropTypes.array.isRequired,
    };
}

    // we subscribe for the data we published from the server main.js
    export default withTracker(() => {
        Meteor.subscribe('players');
        Meteor.subscribe('files.all');
        console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddd");
        players_count = Players.find({owner : Meteor.userId()}).count();
        console.log(players_count);
        console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddd");

        // subscribing means having access to data from database so we find it and fetch it then save to our state players
        return {
            players: Players.find({owner : Meteor.userId()}, {sort : {name : 1}}).fetch(),
            files  : UserFiles.find({}, {sort: {name: 1}}).fetch()
        };
    })(App);
