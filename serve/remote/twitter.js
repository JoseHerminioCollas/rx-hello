var Twitter = require('twitter-node-client').Twitter;

Twitter.error = function (err, response, body) {
    console.log('ERROR [%s]', err)
}
Twitter.success = function (data) {
    if ( typeof data === 'string'){
        var pD = JSON.parse( data )
        var outPrint = ''
        pD.statuses.forEach( e => {
            outPrint += '\n ====' + e.text
        })
        //console.log( '\- - ',  outPrint )
    }
}

module.exports = Twitter

//Example calls

//twitter.getUserTimeline({ screen_name: 'BoyCook', count: '10'}, error, success);
//twitter.getMentionsTimeline({ count: '10'}, error, success);
//twitter.getHomeTimeline({ count: '10'}, error, success);
//twitter.getReTweetsOfMe({ count: '10'}, error, success);

///twitter.getTweet({ id: '1111111112'}, error, success);
//twitter.getCustomApiCall('/statuses/lookup.json',{ id: '412312323'}, error, success);

// Get 10 tweets containing the hashtag haiku
//twitter.getSearch({'q':'#haiku','count': 10}, error, success);

// Get 10 popular tweets with a positive attitude about a movie that is not scary
//twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);
