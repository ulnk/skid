const request = require('request');

const getYoutubeData = async (id) => {
    const URI = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YT}&part=snippet,contentDetails,statistics,status`;
    return new Promise((resolve, reject) => {
        request(URI, (err, response, body) => {
            if (err) return reject(err);
            const data = JSON.parse(body);
            if (data.items.length === 0) return reject(new Error('No data found'));
            resolve(data.items[0].snippet);
        });
    });
};


module.exports = {
    getYoutubeData
};