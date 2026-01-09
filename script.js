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
    selectedUnit = unit;
    selectedPosition = null;

    const positionContainer = document.getElementById("position-buttons");
    positionContainer.innerHTML = "";

    positionsByUnit[unit].forEach(pos => {
        const btn = document.createElement("button");
        btn.innerText = pos;
        btn.onclick = () => selectPosition(pos);
        positionContainer.appendChild(btn);
    });

    document.getElementById("player-list").innerHTML = "";
}

function selectPosition(position) {
    selectedPosition = position;

    const filteredPlayers = players.filter(p => 
        p.unit === selectedUnit && 
        p.position === position &&
        !document.querySelector(`.rank-list .player-card[data-player-id="${p.id}"]`)
    );

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

function drag(ev) {
    const card = ev.target.closest(".player-card");
    ev.dataTransfer.setData("text/plain", card.id || card.dataset.playerId);
}

function dropIntoRound(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");
    const card =
        document.getElementById(playerId) ||
        document.querySelector(`.player-card[data-player-id="${playerId}"]`);

    if (!card) return;

    card.setAttribute("data-player-id", playerId);
    card.removeAttribute("id");

    const roundList = ev.currentTarget;
    const afterElement = getDragAfterElement(roundList, ev.clientY);

    if (afterElement == null) {
        roundList.appendChild(card);
    } else {
        roundList.insertBefore(card, afterElement);
    }

    hideSideBarPlayer(playerId);
    updateRanks();
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".player-card")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element;
}

function updateRanks() {
    const allPlayers = document.querySelectorAll(".rank-list .player-card");

    allPlayers.forEach((player, index) => {
        let rank = player.querySelector(".rank-number");

        if (!rank) {
            rank = document.createElement("span");
            rank.className = "rank-number";
            player.prepend(rank);
        }

        rank.innerText = index + 1;
    });
}

function dropBackToSidebar(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");
    const boardCard = document.querySelector(
        `.rank-list .player-card[data-player-id="${playerId}"]`
    );

    if (!boardCard) return;

    boardCard.remove();

    const sidebarCard = document.getElementById(playerId);
    if (sidebarCard) sidebarCard.style.display = "block";

    updateRanks();
}

function hideSideBarPlayer(playerId) {
    const sidebarCard = document.getElementById(playerId);
    if (sidebarCard) sidebarCard.style.display = "none";
}

selectUnit(selectedUnit);