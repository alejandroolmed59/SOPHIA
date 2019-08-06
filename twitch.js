let twitch_api = require('twitch-api-v5');

twitch_api.clientID = process.env.TWITCH_ID;

const checkStream = async (user) => {
  return new Promise(function(resolve, reject) {
    twitch_api.users.usersByName({ users: user }, (err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(new Promise(function(resolve, reject) {
          twitch_api.streams.channel({ channelID: res.users[0]._id }, (err, res) => {
            if(err) {
              reject(err)
            } else {
              resolve(res.stream ? true : false);
            };
          });
        }));
      };
    });
  });
};

module.exports.checkStream = checkStream; 