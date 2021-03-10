

module.exports = (app,session,Company,Message,controllerMessage)=>{


app.get('/messages/send', controllerMessage.newMessage);






app.get('messages/inbox', controllerMessage.Inbox);






}
  


