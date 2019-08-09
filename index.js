require('dotenv').config()

const Twitch = require('./twitch');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', async () => {
  console.log('Estoy lista.');

  let sendMessage = true;
  const time = 25 * 60000;
  const channel = client.channels.find(ch => ch.name === '🦜-cotorreo');
  let sendMessageRucas = true;

  setInterval(async () => {
    let streamStatus = await Twitch.checkStream('JuggerWicho115');
    if (streamStatus == false && sendMessage == false) {
      sendMessage = true;
    }

    if(streamStatus == true && sendMessage == true) {
      channel.send("@everyone ¡Wicho inició stream! https://www.twitch.tv/JuggerWicho115");
      sendMessage = false;
    } 
  }, time);
  
  setInterval(() => {
    let fecha = new Date;
    const channel = client.channels.find(ch => ch.name === '🦜-cotorreo');
    if (fecha.getDay() == 6 && sendMessage == false) {
      sendMessageRucas = true;
    }

    if (fecha.getDay() == 5 && sendMessage == true) {
      channel.send(`@everyone ¡YA ES VIERNES DE AHORCAR RUCAS, MORROS! ${client.emojis.find(emoji => emoji.name === "spooky")}`);
      sendMessageRucas = false;
    }
  }, 60000);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === '👋-presentaciones');
  if (!channel) return;
  
  let rulesChannel = member.guild.channels.find(channel => channel.name === "📙-reglas").toString();
  
  const welcomeResponses = [
    `¡Hola, ${member}! 💕 Bienvenido al server. No olvides leer las ${rulesChannel}. 🙏`,
    `¡Hey, ${member}! Bienvenido. 😘 No olvides leer las ${rulesChannel}. 🙏`,
    `¡Te estabamos esperando, ${member}! 👋 Por favor lee las ${rulesChannel} y chinga a tu madre. 🙂👍`,
    `¡Hola, ${member}! 🥰 Bienvenido a Agartha. Los niños están al fondo a la derecha. 🐻 No olvides leer las ${rulesChannel}. 🙏`,
    `¡Hola, ${member}! Bienvenido a Agartha; aquí tienes tu Kronorium. 📙 No olvides leer las ${rulesChannel}. 🥰`,
    `¡Hola, ${member}! Bienvenido a Agartha. No olvides leer las ${rulesChannel}. 🥰`
  ];

  channel.send(welcomeResponses[Math.floor(Math.random()*welcomeResponses.length)]);
});

client.on('message', async message => {
  if (message.channel.name === '💁♀-recepción' && message.author.id !== '605780919995072524') {

    let member = `<@${message.author.id}>`;

    const patientResponses = [
      `¡Ya estás en lista de espera , ${member}! 🙋‍♀️ Si el Dr. Wicho lo cree conveniente, te pasará a la sala de espera. 😘`,
      `¡Anotado, ${member}! 🥰 Si el Dr. Wicho lo cree conveniente, te pasará a la sala de espera. 😘`,
      `Tu mensaje está viajando por el Aether, ${member}. 👋 Si logra llegarle al Dr., te pasará a sala de espera. 😉`,
      `Tu mensaje está siendo teletransportado, ${member}. 😮 En caso de éxito, el Dr. Wicho te pasará a la sala de espera. 🤭`
    ];

    message.channel.send(patientResponses[Math.floor(Math.random()*patientResponses.length)]);
  }

  if (message.content.toLowerCase() == '!nuke' && message.author.id === '119917959463436290') {
    message.delete();
    try {
      const fetched = await message.channel.fetchMessages();
      fetched.forEach(message => {
        try {
          message.delete();
        } catch (error) {
          console.log(error);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  if (message.content.toLowerCase() == '!recepcion' && message.author.id === '119917959463436290') {
    message.channel.send(`¡Bienvenido/a a la clínica! 🏥

    Si desean consulta con el Dr. Wicho:
    - Favor de describir su problema brevemente aquí en recepción. 👇
    - El Dr. los irá pasando a la Sala de Espera y eventualmente los pasará a su consultorio. 🥰
    - Si son muchos pacientes, será difícil pasarlos a todos. Si en una sesión no logran entrar, vuélvanlo a intentar otro día. No lloren. 🙄
    
    También contamos con un grupo de apoyo (${message.guild.channels.find(channel => channel.name === "👥-deprimidos-anónimos").toString()}), en donde podrán compartir sus problemas y consejos con otros pacientes de manera abierta. ${message.guild.emojis.find(emoji => emoji.name === "hyped02")}`)
  }

  if (message.content.toLowerCase() == '!reglas' && message.author.id === '119917959463436290') {
    message.channel.send("No hagas mamadas o te kickeamos. 🥰");
  }

  if (message.content.includes('!twitch')) {
    let user = message.content.split(' ')[1];
    let status = await Twitch.checkStream(user);

    if(status) {
      message.channel.send(`¡${user} sí está en stream! https://www.twitch.tv/${user}`);
    } else {
      message.channel.send(`${user} no está en stream. :(`);
    }
  }

  if (message.content.includes('!google')) {
    let search = message.content.split(' ');
    search = search.splice(1, search.length);
    search = search.join("+");
    message.channel.send(`https://www.google.com/search?q=${search}`);
  }

  if ((message.content.includes('!yt') || message.content.includes('!youtube'))) {
    let search = message.content.split(' ');
    search = search.splice(1, search.length);
    search = search.join("+");
    message.channel.send(`https://www.youtube.com/results?search_query=${search}`);
  }

  if (message.content.includes('!oraculo')) {
    let oracleResponses = [
      "Sí.",
      "No.",
      "Tal vez.",
      "No sé, pero chinga tu madre. 🙂👍",
      "Siéntate papito. 🤡",
      "Duérmete otro rato, mejor. 😘",
      `Son chorizos. ${message.guild.emojis.find(emoji => emoji.name === "chorizos")}`,
      "Pregúntame mañana mejor.",
      `Afirmativo. ${message.guild.emojis.find(emoji => emoji.name === "hyped02")}`,
      "No sé, pero confío en ti. 😚"
    ];

    message.channel.send(oracleResponses[Math.floor(Math.random()*oracleResponses.length)])
  }
});


client.login(process.env.DISCORD_TOKEN);

