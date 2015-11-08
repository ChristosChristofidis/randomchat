'use strict';

const async = require('async');
const crypto = require('crypto');

module.exports = class RoomManager {
  constructor() {
    this.maxWaitTime = 5000;

    this.userIndex = 0;
    this.waitingUserCallback = null;
  }

  findRoom(callback) {
    this.userIndex++;
    // If no other user is currently waiting, we wait for a certain period of time, then callback an error
    if (!this.waitingUserCallback) {
      this.waitingUserCallback = callback;

      const oldUserIndex = this.userIndex;
      setTimeout(() => {
        // If the max wait time was exceeded and another user did not join
        // callback with an error and reset the waitingUserCallback
        if (oldUserIndex == this.userIndex) {
          this.waitingUserCallback('timeout');
          this.waitingUserCallback = null;
        }
      }, this.maxWaitTime);
    } else {
      // gen room id
      crypto.randomBytes(12, (err, bytes) => {
        const roomId = bytes.toString('hex');
        callback(null, roomId);
        this.waitingUserCallback(null, roomId);
        this.waitingUserCallback = null;
      });
    }
  };
};

