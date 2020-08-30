// Libraries
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Announcement = require('../../models/announcement');

// makeAnnouncementsNamespace

const makeAnnouncementsNamespace = io => {
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
  return announcementsNamespace;
};

module.exports = {
  makeAnnouncementsNamespace,
};
