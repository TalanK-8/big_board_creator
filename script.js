//Player data

const players = [
    {id: "player-1", name: "Jordyn Tyson", unit: "offense", position: "WR", height: "6' 2\"", weight: "200", stats: "158rec   2282yds   22tds", photo: "JordynTyson.jpg", logo: "ArizonaStateLogo.png"},
    {id: "player-2", name: "Carnell Tate", unit: "offense", position: "WR", height: "6' 3\"", weight: "195", stats: "121rec   1872yds   14tds", photo: "CarnellTate.jpg", logo: "OhioStateLogo.png"}
];

const positionsByUnit = {
    offense: ["QB", "RB", "WR", "TE", "OT", "OG", "C"],
    defense: ["EDGE", "IDL", "LB", "CB", "S"],
    special: ["K", "P", "LS"]
};

let selectedUnit = "offense";
let selectedPosition = null;

function selectUnit(unit) {
    selectUnit = unit;
    selectedPosition = null;

    const positionContainer = document.getElementById("position-buttons");
    positionContainer.innerHTML = "";

    positionsByUnit[unit].forEach(pos => {
        const btn = document.createElement("button");
        btn.innerText = pos;
        btn.onClick = () => selectedPosition(pos);
        positionContainer.appendChild(btn);
    });

    document.getElementById("player-list").innerHTML = "";
}

function selectPosition(position) {
    selectedPosition = position;

    const filteredPlayers = players.filter(p => p.unit === selectedUnit && p.position === position);

    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    filteredPlayers.forEach(p => {
        const card = document.createElement("div");
        card.className = "player-card";
        card.draggable = true;
        card.id = p.id;
        card.ondragstart = drag;

        card.innerHTML = `
            <div class="player-top">
                <img src="${p.photo}" alt="Player Photo" class="player-photo">
                <img src="${p.logo}" alt="School Logo" class="school_logo">
            </div>
            <div class="player-info">
                <h3 class="player-name">${p.name}</h3>
                <p class="player-height-weight">${p.height} | ${p.weight} lbs</p>
                <p class="player-stats">${p.stats}</p>
            </div>
        `;
        playerList.appendChild(card);
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}