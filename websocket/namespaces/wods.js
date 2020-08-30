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

    // socket.on('disconnect', () => {
    //   console.log('a user disconnected...');
    // });

    // socket.on('like', async ({ eventId, userId }) => {
    //   // Validate

    //   if (!ObjectId.isValid(eventId) || !ObjectId.isValid(userId)) {
    //     socket.emit(
    //       'invalidLike',
    //       `Either eventId: ${eventId} or userId: ${userId} was incorrect. Must be a valid mongo document _id.`,
    //     );
    //   }
    //   try {
    //     const event = await Event.findById(eventId).exec();
    //     console.log('event: ', event);
    //     event.likedBy.includes(userId)
    //       ? event.likedBy.splice(event.likedBy.indexOf(userId), 1)
    //       : event.likedBy.push(userId);
    //     const updatedEvent = await event.save();
    //     console.log('updatedEvent: ', updatedEvent);
    //     socket.broadcast.emit('likeUpdate', updatedEvent);
    //   } catch (err) {
    //     console.log('err: ', err);
    //   }
    // });
  });
  return wodsNamespace;
};

module.exports = {
  makeWodsNamespace,
};
