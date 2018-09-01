import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';
import {blueGrey100} from 'material-ui/styles/colors';

const styles = {
    signIn : {
        margin : 12,
        backgroundColor : blueGrey100,
    },
    wrapper: {
        display : 'flex',
        flexWrap: 'wrap',
    },
};
export default class AccountsWrapper extends Component {
    componentDidMount () {
        this.view = Blaze.render(Template.loginButtons,ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount () {
        Blaze.remove(this.view);
    }
    render() {
        return (
            <div style={styles.wrapper}>
                <span className="btn" ref="container" style={styles.signIn} />
            </div>
        )
    }
}
