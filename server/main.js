import { Meteor } from 'meteor/meteor';
import { Players } from '../imports/api/players'
import UserFiles from "../imports/api/FilesCol";

Meteor.startup(() => {
  Meteor.publish('players', function () {
      return Players.find({});
  });
  Meteor.publish('files.all', function () {
      return UserFiles.find().cursor;
  });
});
