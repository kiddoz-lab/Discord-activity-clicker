const sdk = new window.discordSdk.DiscordSDK("1479462891852927096");

async function start() {
    try {
        await sdk.ready();
        const { code } = await sdk.commands.authorize({
            client_id: "1479462891852927096",
            response_type: "code",
            state: "",
            prompt: "none",
            scope: ["identify", "activities.write"]
        });
        
        const auth = await sdk.commands.authenticate({ access_token: code });
        document.getElementById("status").innerText = auth.user.username;
    } catch (e) {
        document.getElementById("status").innerText = "Local Mode";
    }
}

function updateLeaderboard(name, score) {
    const list = document.getElementById("leaderboard");
    list.innerHTML = `<li>${name}: ${score} LIGHT</li>`;
}

start();
