// Libraries
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Wod = require('../../models/wod');

// makeWodsNamespace

const makeWodsNamespace = io => {
  const wodsNamespace = io.of('/wods');

  wodsNamespace.on('connection', socket => {
    console.log('a user connected to /wods namespace...');

    // Emitters

    // socket.emit('foo', 'hello from nsp');

    // Listeners

    socket.on('disconnect', () => {
      console.log('a user disconnected...');
    });

    socket.on('like', async ({ userId, wodId }) => {
      //   // Validate

      if (!ObjectId.isValid(wodId) || !ObjectId.isValid(userId)) {
        socket.emit(
          'invalidLike',
          `Either wodId: ${wodId} or userId: ${userId} was incorrect. Must be a valid mongo document _id.`,
        );
      }
      try {
        const wod = await Wod.findById(wodId).exec();
        console.log('wod: ', wod);
        wod.likedBy.includes(userId)
          ? wod.likedBy.splice(wod.likedBy.indexOf(userId), 1)
          : wod.likedBy.push(userId);
        const updatedWod = await wod.save();
        console.log('updatedWod: ', updatedWod);
        socket.broadcast.emit('likeUpdate', updatedWod);
      } catch (err) {
        console.log('err: ', err);
      }
    });
  });
  return wodsNamespace;
};

module.exports = {
  makeWodsNamespace,
};
