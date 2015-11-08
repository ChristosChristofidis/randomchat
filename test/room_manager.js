var assert = require('chai').assert;
var RoomManager = require('../room_manager.js');
var async = require('async');

describe('Room Manager', () => {
  it('Allows two users to join a room asynchronously', (done) => {
    const roomManager = new RoomManager();
    async.parallel([
      // The first user joins, by they can't immediately join a room with someone, they need to wait
      (callback) => roomManager.findRoom(callback),
      // The second use joins later
      (callback) => setTimeout(() => roomManager.findRoom(callback), 100)
    ], (err, results) => {
      // Make sure they both got room ids
      assert.isDefined(results[0]);
      assert.isDefined(results[1]);
      // We make sure they both got the same room id
      assert.equal(results[0], results[1]);
      done();
    });
  });

  it('gives users who wait too long an error callback', (done) => {
    const roomManager = new RoomManager();
    roomManager.maxWaitTime = 60;
    roomManager.findRoom((err, roomId) => {
      assert.equal(err, 'timeout');
      done();
    });
  });
});
