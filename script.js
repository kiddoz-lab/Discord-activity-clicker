const discordSdk = new window.discordSdk.DiscordSDK("1479462891852927096");

let light = 0;
let power = 1;
let cost = 10;

async function setupActivity() {
    await discordSdk.ready();
    
    const { code } = await discordSdk.commands.authorize({
        client_id: "1479462891852927096",
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "activities.write"]
    });

    document.getElementById("user-display").innerText = "Glow Connected";
}

function createParticle(e) {
    const container = document.getElementById("particle-container");
    for (let i = 0; i < 8; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        const size = Math.random() * 8 + 4;
        p.style.width = size + "px";
        p.style.height = size + "px";
        
        p.style.setProperty("--x", (Math.random() - 0.5) * 200 + "px");
        p.style.setProperty("--y", (Math.random() - 0.5) * 200 + "px");
        
        p.style.left = e.clientX + "px";
        p.style.top = e.clientY + "px";
        
        container.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

function updateUI() {
    document.getElementById("light-count").innerText = Math.floor(light);
    document.getElementById("cost-display").innerText = `Cost: ${cost}`;
    document.getElementById("upgrade-btn").disabled = light < cost;
}

document.getElementById("glow-target").addEventListener("click", (e) => {
    light += power;
    createParticle(e);
    updateUI();
});

document.getElementById("upgrade-btn").addEventListener("click", () => {
    if (light >= cost) {
        light -= cost;
        power += 1.5;
        cost = Math.floor(cost * 1.8);
        updateUI();
    }
});

setupActivity();
