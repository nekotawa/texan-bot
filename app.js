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
  let stealth = 10;
  let intelligence = 10;
  let luck = 10;
  let d20 = Math.floor(Math.random() * 20 + 1);
  const texBot = tags.username === "yourcutetexanbot";
  let username;

  function getFirstWord(str) {
    let spaceIndex = str.indexOf(" ");
    return spaceIndex === -1 ? str : str.substr(0, spaceIndex);
  }

  const rollD20 = (username, constraint) => {
    const rollDice = () => {
      switch (true) {
        case d20 === 20:
          client.say(
            channel,
            "Nat 20! All hail " + username + " for they are now a VIP!"
          );
          break;
        case d20 === 1:
          client.timeout(
            channel,
            username,
            60,
            username +
              " rolled a Critical FAIL! To the dungeons with you! You are timed out for 1 minute."
          );
          break;
        case d20 >= constraint:
          client.say(channel, "Luck smiles on you today " + username);
          break;
        case d20 < constraint:
          client.say(channel, "Better luck next time " + username);
          break;
        default:
          null;
      }
    };
    setTimeout(rollDice, 2000);
  };

  switch (true) {
    case message.includes("spotted!") && texBot:
      username = getFirstWord(message);
      rollD20(username, stealth);
      break;
    case message.includes("distraction") && texBot:
      username = getFirstWord(message);
      rollD20(username, intelligence);
      break;
    case message.includes("Struggle") && texBot:
      username = getFirstWord(message);
      rollD20(username, luck);
      break;
    default:
      null;
  }
});
