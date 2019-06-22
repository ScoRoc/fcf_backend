const socketio = require('socket.io')

module.exports.listen = app => {
  const io = socketio.listen(app)

  const announcementsNamespace = io.of('/announcements')
  announcementsNamespace.on('connection', function(socket) {
    console.log('a user connected...')
    socket.on('test', msg => console.log('msg: ', msg))
  })
  return io
}
