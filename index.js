const Discord = require('discord.js')
const fetch = require('node-fetch');
global.fetch = require("node-fetch");
const { Client, Intents, } = require('discord.js');
const client = new Client ({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES,"GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.once('ready', () => {
    console.log('Ready!');
});
client.on('ready', () => {
    client.user.setActivity('天気予報', { type: 'PLAYING' })
});

let length = '数';
    
client.on('messageCreate', message => {

    if(message.content === '!ping'){
        message.channel.send('pong');
    }
  
});

let mention = 'yourBotId';
let weather = '天気'

client.on("messageCreate", message => {
      console.log('get a message');

    if(message.content.includes(mention) && message.content.includes(weather)){
      const query_params = new URLSearchParams({ 
        appid: "yourAPIId", 
        lat: '取得したい緯度',
        lon: '取得したい経度',
        units: 'metric',
        lang:'ja'
      });
      
      
      
      fetch("http://api.openweathermap.org/data/2.5/forecast?" + query_params)
      .then(response => {
          return response.json()
      })
      .then(data => {
      let weather = data.list[0].weather[0].description;
      let city = data.city.name;
          
      message.channel.send('天気予報を取得します...');
          
      const embed = new Discord.MessageEmbed()
      .setTitle('今日、明日の天気')
      .setURL('https://google.com')
      .addField(`${data.city.name}の天気`, `${data.list[0].dt_txt}
      ${data.list[0].weather[0].description}
      ${data.list[1].dt_txt}
      ${data.list[1].weather[0].description}
      ${data.list[2].dt_txt}
      ${data.list[2].weather[0].description}
      ${data.list[3].dt_txt}
      ${data.list[3].weather[0].description}
      ${data.list[4].dt_txt}
      ${data.list[4].weather[0].description}
      ${data.list[5].dt_txt}
      ${data.list[5].weather[0].description}
      ${data.list[6].dt_txt}
      ${data.list[6].weather[0].description}
      ${data.list[7].dt_txt}
      ${data.list[7].weather[0].description}
       ${data.list[8].dt_txt}
      ${data.list[8].weather[0].description}
      ${data.list[9].dt_txt}
      ${data.list[9].weather[0].description}`)
      .setColor('#ee82ee')
      .setTimestamp()
      message.channel.send({ embeds: [embed] })

    })
    

     
        
    }
    
})

client.login('yourBotToken');
