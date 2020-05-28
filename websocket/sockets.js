// Libraries
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Announcement = require('../models/announcement');

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
        socket.broadcast.emit('newLike', updatedAnnouncement);
      } catch (err) {
        console.log('err: ', err);
      }
    });
  });

  // Events
  // const eventsNamespace = io.of('/events')
  // eventsNamespace.on('connection', function(socket) {
  //   console.log('a user connected to /events namespace...')
  //   socket.on('test', msg => console.log('msg: ', msg))
  // })

  return io;
};
