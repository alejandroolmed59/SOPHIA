require('dotenv').config()

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Estoy lista.');
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
});


client.login(process.env.DISCORD_TOKEN);

