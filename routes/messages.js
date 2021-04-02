

module.exports = (app,session,Company,Message,controllerMessage)=>{


app.get('/messages/send/to/:id', controllerMessage.newMessage);
 
 

app.post('/messages/send/to/:id',controllerMessage.donewMessage);






app.get('messages/inbox/:id', controllerMessage.Inbox);






}
  


