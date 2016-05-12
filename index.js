var Botkit = require('botkit');

var slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
    console.error('SLACK_TOKEN is required!');
    process.exit(1);
}

var controller = Botkit.slackbot();
var bot = controller.spawn({
    token: slackToken
});

bot.startRTM(function (err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

controller.hears(['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    bot.reply(message, 'Hello.');
});

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, 'Hello VEXabits.');
});

controller.hears(['\\bex'], ['direct_message', 'direct_mention', 'mention', 'ambient'], function (bot, message) {
    if (message.text) {
        bot.reply(message, 'You mean: ' + message.text.replace(/(\bex)/i, 'VEX'));
    }
});
