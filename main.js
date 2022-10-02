const { GatewayIntentBits, EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({ 
  intents: [
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent // Add this line.
  ] 
});

// Most played champ + winrate
// overall winrate
// role

client.on("ready", () => {
  console.log("Fxfey bot is READY!");
});

const prefix = "$";

const riotAPIKey = "";

// Detecting if there is a message created.
client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  if (command === 'help') {
    const embed2 = new EmbedBuilder()
      .setColor(`#${Math.random() * 9999}`)
      .setThumbnail("https://i.pinimg.com/originals/e7/2e/f3/e72ef3d39ef1ffd40ffb8aff12e52e2f.png")
      .setTitle("Help 🦊")
      .setDescription(`This bot is just a little project by Fxfey#1870. \n Below are all the commands available for this bot and a description.`)
      .addFields(
        {
          name: 'snoop ($snoop Fxfey)',
          value: `The snoop command can be used along with a League of legends players name in order to receive ranked information about that player.`,
          inline: true,
        }
      )
      // .setTimestamp()
      .setFooter({
        text: `Bot by Fxfey \n Latency : ${client.ws.ping}ms`,
        iconURL: `${client.user.displayAvatarURL()}`,
    });

    message.channel.send({ embeds: [embed2] });

	} else if (command === 'snoop') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}! Please provide your summoner name!`);
		}

        let text = args.toString();

        var replaced = text.replace(/,/g, '%20');
        
        var axios = require('axios');

        var config = {
        method: 'get',
        url: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${replaced}?api_key=${riotAPIKey}`,
        headers: { }
        };

        axios(config)
        .then(function (response) {
        // console.log(JSON.stringify(response.data));
        var level = JSON.stringify(response.data.id);

        var cleanLevel = level.replace('"', '');
        var cleanLevel2 = cleanLevel.replace('"', '');

        var config2 = {
            method: 'get',
            url: ` https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${cleanLevel2}?api_key=${riotAPIKey}`,
            headers: { }
            };
    
            axios(config2)
            .then(function (response2) {

              var config3 = {
                method: 'get',
                url: ` https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${cleanLevel2}/top?count=5&api_key=${riotAPIKey}`,
                headers: { }
                };
        
                axios(config3)
                .then(function (response3) {

                  function clean(string){

                    var clean1 = string.replace('"', '');
                    var clean2 = clean1.replace('"', '');
          
                    return clean2;
          
                  }

                  const object = require('./champs.json');

                  // console.log(JSON.stringify(object.data));

                  var hope = Array();

                  for (var key in object.data) {
                    // console.log("Key: " + key);
                    // console.log("Value: " + JSON.stringify(object.data[key].key));

                    let obj = {num: clean(JSON.stringify(object.data[key].key)), name: clean(JSON.stringify(object.data[key].id))}

                    hope.push(obj);

                  }

                  // while(count < 161){

                  //   var champ = 1;

                  //   console.log(JSON.stringify(object.data[champ]));

                  //   champ++;
                  //   count++;

                  // }

                //--------------------------

                var topChamps = Array();

                let champCount1 = 0

                while(champCount1 < 161){

                  if(hope[champCount1].num == response3.data[0].championId){
                    topChamps.push(hope[champCount1].name);
                    break;
                  }

                  champCount1++;

                }

                //--------------------------

                let champCount2 = 0

                while(champCount2 < 161){

                  if(hope[champCount2].num == response3.data[1].championId){
                    topChamps.push(hope[champCount2].name);
                    break;
                  }

                  champCount2++;

                }

                //--------------------------

                let champCount3 = 0

                while(champCount3 < 161){

                  if(hope[champCount3].num == response3.data[2].championId){
                    topChamps.push(hope[champCount3].name);
                    break;
                  }

                  champCount3++;

                }

                //--------------------------

                let champCount4 = 0

                while(champCount4 < 161){

                  if(hope[champCount4].num == response3.data[3].championId){
                    topChamps.push(hope[champCount4].name);
                    break;
                  }

                  champCount4++;

                }

                //--------------------------

                let champCount5 = 0

                while(champCount5 < 161){

                  if(hope[champCount5].num == response3.data[4].championId){
                    topChamps.push(hope[champCount5].name);
                    break;
                  }

                  champCount5++;

                }

                //--------------------------
          
                  var name = clean(JSON.stringify(response2.data[1].summonerName));
                  var tier = clean(JSON.stringify(response2.data[1].tier));
                  var rank = clean(JSON.stringify(response2.data[1].rank));
                  var wins = JSON.stringify(response2.data[1].wins);
                  var losses = JSON.stringify(response2.data[1].losses);
          
                  var equationwin = Number(wins);
                  var equationlosses = Number(losses);
          
                  var total = (equationlosses + equationwin);
          
                  var percentage = (equationwin / total * 100).toFixed(2);

                  const champResult = JSON.stringify(topChamps).replace(/[A-Z]/g, ' $&').trim();

                  var cleanChampResult = champResult.replace(/[^0-9a-z-A-Z,]/g, "");

                  var iron = "https://static.wikia.nocookie.net/leagueoflegends/images/f/fe/Season_2022_-_Iron.png/revision/latest?cb=20220105213520"
                  var bronze = "https://static.wikia.nocookie.net/leagueoflegends/images/e/e9/Season_2022_-_Bronze.png/revision/latest?cb=20220105214224"
                  var silver = "https://static.wikia.nocookie.net/leagueoflegends/images/4/44/Season_2022_-_Silver.png/revision/latest?cb=20220105214225"
                  var gold = "https://static.wikia.nocookie.net/leagueoflegends/images/8/8d/Season_2022_-_Gold.png/revision/latest?cb=20220105214225"
                  var platinum = "https://static.wikia.nocookie.net/leagueoflegends/images/3/3b/Season_2022_-_Platinum.png/revision/latest?cb=20220105214225"
                  var diamond = "https://static.wikia.nocookie.net/leagueoflegends/images/e/ee/Season_2022_-_Diamond.png/revision/latest?cb=20220105214226"
                  var master = "https://static.wikia.nocookie.net/leagueoflegends/images/e/eb/Season_2022_-_Master.png/revision/latest?cb=20220105214311"
                  var grandmaster = "https://static.wikia.nocookie.net/leagueoflegends/images/f/fc/Season_2022_-_Grandmaster.png/revision/latest?cb=20220105214312"
                  var challenger = "https://static.wikia.nocookie.net/leagueoflegends/images/0/02/Season_2022_-_Challenger.png/revision/latest?cb=20220105214312"

                  if( tier === "BRONZE"){
                    var url = bronze
                  } else if( tier === "IRON"){
                    var url = iron
                  } else if( tier === "GOLD"){
                    var url = gold
                  } else if( tier === "PLATINUM"){
                    var url = platinum
                  } else if( tier === "DIAMOND"){
                    var url = diamond
                  } else if( tier === "SILVER"){
                    var url = silver
                  } else if( tier === "MASTER"){
                    var url = master
                  } else if( tier === "GRANDMASTER"){
                    var url = grandmaster
                  } else if( tier === "CHALLENGER"){
                    var url = challenger
                  }
                  
                  const embed = new EmbedBuilder()
                    .setColor(`#${Math.random() * 9999}`)
                    .setImage(url)
                    .setThumbnail("https://i.imgur.com/uf9YNVm.png")
                    .setTitle("Player Snoop 🦊")
                    .addFields(
                      {
                        name: 'Name',
                        value: `${name}`,
                        inline: true,
                      },
                      {
                        name: 'W/L',
                        value: `W : ${wins} \nL : ${losses} \n% : ${percentage}`,
                        inline: false,
                      },
                      {
                        name: 'Top Champs',
                        value: `${cleanChampResult.split(',').join("\r\n")}`,
                        inline: false,
                      },
                      {
                        name: 'Rank',
                        value: `${tier} ${rank}`,
                        inline: false,
                      }
                    )
                    .setTimestamp()
                    .setFooter({
                      text: `Bot by Fxfey \n Latency : ${client.ws.ping}ms \n-`,
                      iconURL: `${client.user.displayAvatarURL()}`,
                  });

                  message.channel.send({ embeds: [embed] });
          
                  // message.channel.send(`| \n Name : ${name} \n Rank : ${tier} ${rank} :Emblem_Bronze: \n Wins : ${wins} \n Loses : ${losses} \n Win % : ${percentage} \n\n Top Champs: \n ${champResult.replace(/[^0-9a-z-A-Z ,]/g, "")}`);
                
                })
                .catch(function (error) {
                  console.log(error);
                  const embed3 = new EmbedBuilder()
                    .setColor(`#${Math.random() * 9999}`)
                    .setThumbnail("https://www.pngkit.com/png/full/1009-10091972_iu-png.png")
                    .setTitle("Player Snoop 🦊")
                    .addFields(
                      {
                        name: 'ERROR',
                        value: `This Player is not ranked.`,
                        inline: true,
                      }
                    )
                    // .setTimestamp()
                    .setFooter({
                      text: `Bot by Fxfey \n Latency : ${client.ws.ping}ms`,
                      iconURL: `${client.user.displayAvatarURL()}`
                  });

                  message.channel.send({ embeds: [embed3] });
                });
            
            })
            .catch(function (error) {
              console.log(error);
            });

        })
        .catch(function (error) {
        console.log(error);
        });

        // var config5 = {
        //   method: 'get',
        //   url: ` https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/9AKr0fdumxpN4UsJQGi_PYcjLEh4brEen3OVg76l04SVF_rE?api_key=RGAPI-985a1414-3868-40db-ab18-51d61ae75f63`,
        //   headers: { }
        //   };
  
        //   axios(config5)
        //   .then(function (response5) {

        //       var logName3 = JSON.stringify(response5.data[1]); 

        //       message.channel.send(`| \n Name : ${logName3.summonerName} \n Rank : ${logName3.tier} ${logName3.rank} \n Wins : ${logName3.wins} Loses : ${logName3.losses}`);

        //   })
        //   .catch(function (error) {
        //   console.log(error);
        //   });

    }
});

client.login('');