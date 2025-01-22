const maps = [
    { name: "de_ancient", bg: "de_ancient.png", fg: "map_icon_de_ancient.svg" },
    { name: "de_anubis", bg: "de_anubis.png", fg: "map_icon_de_anubis.png" },
    { name: "de_dust2", bg: "de_dust2.png", fg: "map_icon_de_dust2.svg" },
    { name: "de_inferno", bg: "de_inferno.png", fg: "map_icon_de_inferno.svg" },
    { name: "de_mirage", bg: "de_mirage.png", fg: "map_icon_de_mirage.svg" },
    { name: "de_nuke", bg: "de_nuke.png", fg: "map_icon_de_nuke.svg" },
    { name: "de_vertigo", bg: "de_vertigo.png", fg: "map_icon_de_vertigo.svg" },
    { name: "de_basalt", bg: "de_basalt.png", fg: "map_icon_de_basalt.webp" },
    { name: "de_edin", bg: "de_edin.jpg", fg: "map_icon_de_edin.svg" },
    { name: "cs_italy", bg: "cs_italy.png", fg: "map_icon_cs_italy.svg" },
    { name: "cs_office", bg: "cs_office.png", fg: "map_icon_cs_office.svg" },
    { name: "de_overpass", bg: "de_overpass.png", fg: "map_icon_de_overpass.svg" },
    { name: "de_train", bg: "de_train.png", fg: "map_icon_de_train.svg" },
    { name: "ar_baggage", bg: "ar_baggage.png", fg: "map_icon_ar_baggage.svg" },
    { name: "ar_pool_day", bg: "fy_pool_day.png", fg: "map_icon_ar_pool_day.webp" },
    { name: "ar_shoots", bg: "ar_shoots.jpg", fg: "map_icon_ar_shoots.svg" },
];

function createTiles() {
    const container = document.querySelector(".tile-container");
    
    maps.forEach((map) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerHTML = `
            <div class="background" style="background-image: url('./images/backgrounds/${map.bg}');"></div>
            <img class="foreground" src="./images/logos/${map.fg}" alt="${map.name}">
        `;
        tile.onclick = () => mapClicked(map.name);
        container.appendChild(tile);
    });
}

document.addEventListener("DOMContentLoaded", createTiles);
