// Libraries
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Announcement = require('../models/announcement');
const Event = require('../models/event');

module.exports = io => {
  io.on('connection', socket => {
    // console.log('socket: ', socket);
    console.log('a user connected to base socket...');
    socket.on('disconnect', () => {
      console.log('a user disconnected from base socket...');
    });
  });

  // Announcements

  const announcementsNamespace = io.of('/announcements');
  announcementsNamespace.on('connection', socket => {
    console.log('a user connected to /announcements namespace...');

    // Emitters

    // socket.emit('foo', 'hello from nsp');

    // Listeners

    socket.on('disconnect', () => {
      console.log('a user disconnected...');
    });

    socket.on('like', async ({ announcementId, userId }) => {
      // Validate

      if (!ObjectId.isValid(announcementId) || !ObjectId.isValid(userId)) {
        socket.emit(
          'invalidLike',
          `Either announcementId: ${announcementId} or userId: ${userId} was incorrect. Must be a valid mongo document _id.`,
        );
      }
      try {
        const announcement = await Announcement.findById(announcementId).exec();
        announcement.likedBy.includes(userId)
          ? announcement.likedBy.splice(announcement.likedBy.indexOf(userId), 1)
          : announcement.likedBy.push(userId);
        const updatedAnnouncement = await announcement.save();
        socket.broadcast.emit('likeUpdate', updatedAnnouncement);
      } catch (err) {
        console.log('err: ', err);
      }
    });
  });

  // Events

  const eventsNamespace = io.of('/events');
  eventsNamespace.on('connection', socket => {
    console.log('a user connected to /events namespace...');

    // Emitters

    // socket.emit('foo', 'hello from nsp');

    // Listeners

    socket.on('disconnect', () => {
      console.log('a user disconnected...');
    });

    socket.on('like', async ({ eventId, userId }) => {
      // Validate

      if (!ObjectId.isValid(eventId) || !ObjectId.isValid(userId)) {
        socket.emit(
          'invalidLike',
          `Either eventId: ${eventId} or userId: ${userId} was incorrect. Must be a valid mongo document _id.`,
        );
      }
      try {
        const event = await Event.findById(eventId).exec();
        console.log('event: ', event);
        event.likedBy.includes(userId)
          ? event.likedBy.splice(event.likedBy.indexOf(userId), 1)
          : event.likedBy.push(userId);
        const updatedEvent = await event.save();
        console.log('updatedEvent: ', updatedEvent);
        socket.broadcast.emit('likeUpdate', updatedEvent);
      } catch (err) {
        console.log('err: ', err);
      }
    });
  });

  return io;
};
