import React, {Component}  from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {blue200, lightBlue800, lightBlue50} from 'material-ui/styles/colors';
import UserFiles from "../api/FilesCol";

const styles = {
    chip : {
        margin : 4,
    },
    wrapper: {
      display : 'flex',
      flexWrap: 'wrap',
    },
    button: {
        margin:12,
    },
};

export default class Player extends Component {
    render () {

        const player  = this.props.player;
        const offense = parseInt(player.kickingAbilities) + parseInt(player.ballManipulation) + parseInt(player.passingAbilities)
            + parseInt(player.fieldCoverage) + parseInt(player.playmakingRisks);
        const defense = parseInt(player.duelTackling) + parseInt(player.fieldCoverage) + parseInt(player.blockingAbilities)
            + parseInt(player.gameStrategy) + parseInt(player.playmakingRisks);
        const total   = parseInt(player.ballManipulation) + parseInt(player.kickingAbilities) + parseInt(player.passingAbilities)
            + parseInt(player.duelTackling) + parseInt(player.fieldCoverage) + parseInt(player.blockingAbilities)
            + parseInt(player.gameStrategy) + parseInt(player.playmakingRisks);

        const files = this.props.files;
        let imageName = "player.jpg";
        let found = false;
        for (let i =  0 ; i < files.length ; i++) {
            if (files[i].name.includes(player.name)){
                imageName = UserFiles.findOne({_id: files[i]._id}).link();
                found = true;
                break;
            }
        }

        return (
            <Card>
                <CardMedia overlay={<CardTitle title = {player.name} subtitle={`Offense: ${offense} - Defense: ${defense} - total: ${total}`} />} >
                    <img src={imageName} />
                </CardMedia>
                <CardText>
                    <div style={styles.wrapper}>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.ballManipulation} </Avatar>
                            Ball manipulation
                        </Chip>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.kickingAbilities} </Avatar>
                            Kicking abilities
                        </Chip>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.passingAbilities} </Avatar>
                            passing abilities
                        </Chip>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.duelTackling} </Avatar>
                            Duel/Tackling abilities
                        </Chip>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.fieldCoverage} </Avatar>
                            Field speed coverage
                        </Chip>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.blockingAbilities} </Avatar>
                            Blocking ablilities
                        </Chip>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.gameStrategy} </Avatar>
                            Game Strategy
                        </Chip>
                        <Chip backgroundColor={blue200} style={styles.chip} >
                            <Avatar size={32} color={lightBlue50} backgroundColor={lightBlue800}> {player.playmakingRisks} </Avatar>
                            Playmaking risks
                        </Chip>
                    </div>
                </CardText>
                <CardActions>
                    <RaisedButton label="Edit Player" labelPosition="before" style={styles.button} onClick={this.props.showEditForm.bind(this)}/>
                </CardActions>
            </Card>
        )
    }
}
