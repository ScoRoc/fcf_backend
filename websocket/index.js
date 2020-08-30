// Namespaces
const {
  makeAnnouncementsNamespace,
  makeEventsNamespace,
  makeWodsNamespace,
} = require('./namespaces');

// Sockets Export

module.exports = io => {
  io.on('connection', socket => {
    // console.log('socket: ', socket);
    console.log('a user connected to base socket...');
    socket.on('disconnect', () => {
      console.log('a user disconnected from base socket...');
    });
  });

  // Namespaces

  makeAnnouncementsNamespace(io);
  makeEventsNamespace(io);
  makeWodsNamespace(io);

  return io;
};
