import { Client } from "discord.js";

function uptime(client: Client<true>) {
    let days = Math.floor(client.uptime / 86400000),
        hours = Math.floor(client.uptime / 3600000) % 24,
        minutes = Math.floor(client.uptime / 60000) % 60;
    return client.user.setPresence({
        activities: [
            {
                name: `${days}d:${hours <= 9 ? `0${hours}` : hours}h:${
                    minutes <= 9 ? `0${minutes}` : minutes
                }m`,
                type: "STREAMING",
                url: "https://www.twitch.tv/himei_miyu",
            },
        ],
    });
}

new Client({ intents: 0 })
    .on("ready", (client) => {
        console.info(`${client.user.username} is online`);
        uptime(client);
        setInterval(() => {
            uptime(client);
        }, 6e4);
    })
    .login(process.env.TOKEN);
