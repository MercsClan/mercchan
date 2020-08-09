const db = require('./../Firebase/firebase.js');

const eventsDB = db.collection('events');

eventsDB
  .get()
  .then((docs) => {
    docs.forEach((doc) => {
      eventRoleID = doc.data().roleID;
      eventChannelID = doc.data().channelID;
      eventDate = doc.data().date;

      console.log(event);
    });
  })
  .catch((error) => {
    console.log(error);
  });

console.log('done');
