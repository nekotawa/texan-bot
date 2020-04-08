let tmi = require("tmi.js");
const client = new tmi.Client({
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: "your_cute_bot",
    password: "oauth:43z49jl5rcwh426er4vvnuoc7fex5i",
  },
  channels: ["YourCuteTexan"],
});

client.connect();
client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (message.toLowerCase() === "!howdy") {
    client.say(channel, `howdy, @${tags.username}! `);
  }
});
