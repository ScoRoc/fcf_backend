const socketio = require('socket.io')

module.exports.listen = app => {
  const io = socketio.listen(app)

  // Announcements
  const announcementsNamespace = io.of('/announcements')
  announcementsNamespace.on('connection', function(socket) {
    console.log('a user connected to /announcements namespace...')
    socket.on('test', msg => console.log('msg: ', msg))
  })

  // Events
  const eventsNamespace = io.of('/events')
  eventsNamespace.on('connection', function(socket) {
    console.log('a user connected to /events namespace...')
    socket.on('test', msg => console.log('msg: ', msg))
  })

  return io
}
