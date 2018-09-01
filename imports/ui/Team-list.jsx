import React, {Component}  from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import ActionDeleteForEver from 'material-ui/svg-icons/action/delete-forever';
import {red500} from 'material-ui/styles/colors';

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

export default class TeamList extends Component {

    deletePlayer (playerId) {
        Meteor.call('deletePlayer' , playerId, (error) => {
            if (error) {
                alert("oops something went wrong!" + error.reason);
            } else {
                //alert("Player deleted");
                this.props.updateCurrentPlayer(tempPlayer);
            }
        });
    }

    render () {
        return (
            <div>
                <ListItem
                    primaryText = {this.props.player.name}
                    leftAvatar = {<Avatar src="player.jpg"/>}
                    rightIcon={<ActionDeleteForEver hoverColor={red500} onClick={this.deletePlayer.bind(this, this.props.player._id)}/>}
                    onClick = {this.props.updateCurrentPlayer.bind(this, this.props.player)}
                />
            </div>
        )
    }
}
