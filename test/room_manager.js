'use strict';

var assert = require('chai').assert;
var RoomManager = require('../room_manager.js');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

describe('Room Manager', () => {
  it('handles timeouts correctly', done => {
    let userId = 0;
    new RoomManager({
      getWaitingUserId: () => new Promise(resolve => {
        // Only let the first user connect
        if (userId == 0) resolve(++userId);
      }),
      onRoomFound: (userId) => {
        assert.fail('User should have timed out instead of finding room');
        done();
      },
      onTimeout: () => {
        done();
      }
    }, {maxWaitTime: 100});
  });

  it('correctly generates a room id for two uses joining asynchronously', done => {
    let roomIds = [];
    let userId = 0;
    new RoomManager({
      getWaitingUserId: () => new Promise(resolve =>
        setTimeout(() => {
          resolve(++userId);
        }, 100)
      ),
      onRoomFound: (userId, roomId) => {
        roomIds.push(roomId);
        if (userId == 2) {
          assert.isDefined(roomIds[0]);
          assert.equal(roomIds[0], roomIds[1]);
          done();
        }
      },
      onTimeout: () => {
        assert.fail('Users timed out instead of getting room id');
      }
    }, {maxWaitTime: 300});
  });
});
