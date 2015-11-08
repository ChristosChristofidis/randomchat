'use strict';

const Promise = require('bluebird');
const crypto = Promise.promisifyAll(require('crypto'));

const MAX_WAIT_TIME = 5000;

module.exports = class RoomManager {

  constructor(callbacks, options) {
    const maxWaitTime = (options && options.maxWaitTime) ? options.maxWaitTime : MAX_WAIT_TIME;
    const pairUsers = Promise.coroutine(function* () {
      // Try to get the second user before the first one times out
      let user1 = null, user2 = null;
      try {
        // Wait for two requests in serial
        user1 = yield callbacks.getWaitingUserId();
        user2 = yield callbacks.getWaitingUserId().timeout(maxWaitTime);
      } catch (err) {
        callbacks.onTimeout(user1);
        pairUsers();
        return;
      }

      const randomBytes = yield crypto.randomBytesAsync(12);
      const roomId = randomBytes.toString('hex');

      callbacks.onRoomFound(user1, roomId);
      callbacks.onRoomFound(user2, roomId);

      // Wait for the next pair of requests
      pairUsers();
    });

    pairUsers();
  }
};
