//Player data

const players = [
    {id: "player-1", name: "Rueben Bain Jr.", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "275", stats: "75pres   19.5sacks   33tfls", photo: "images/players/RuebenBain.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-2", name: "Caleb Downs", unit: "defense", position: "S", height: "6' 0\"", weight: "205", stats: "256tcks   10pd   6ints", photo: "images/players/CalebDowns.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-3", name: "Fernando Mendoza", unit: "offense", position: "QB", height: "6' 5\"", weight: "225", stats: "68.5cmp%   7884yds   66tds   22ints", photo: "images/players/FernandoMendoza.jpg", logo: "images/logos/IndianaLogo.png"},
    {id: "player-4", name: "Peter Woods", unit: "defense", position: "IDL", height: "6' 3\"", weight: "315", stats: "41pres   5sacks   14.5tfls", photo: "images/players/PeterWoods.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-5", name: "Francis Mauigoa", unit: "offense", position: "OT", height: "6' 6\"", weight: "315", stats: "42gs   8sa   0.5pres%", photo: "images/players/FrancisMauigoa.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-6", name: "Jeremiyah Love", unit: "offense", position: "RB", height: "6' 0\"", weight: "214", stats: "6.7ypc   3476yds   42tds", photo: "images/players/JeremiyahLove.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-7", name: "Jordyn Tyson", unit: "offense", position: "WR", height: "6' 2\"", weight: "200", stats: "158recs   2282yds   22tds", photo: "images/players/JordynTyson.jpg", logo: "images/logos/ArizonaStateLogo.png"},
    {id: "player-8", name: "Carnell Tate", unit: "offense", position: "WR", height: "6' 3\"", weight: "195", stats: "121recs   1872yds   14tds", photo: "images/players/CarnellTate.jpg", logo: "images/logos/OhioStateLogo.png"}
];

const positionsByUnit = {
    offense: ["QB", "RB", "WR", "TE", "OT", "OG", "C"],
    defense: ["EDGE", "IDL", "LB", "CB", "S"],
    special: ["K", "P", "LS"]
};

let selectedUnit = "offense";
let selectedPosition = null;
let searchQuery = "";
const placedPlayers = new Set();
const playerNotes = {};

function handleSearch(value) {
    searchQuery = value.toLowerCase();
    renderSidebarPlayers(selectedUnit, selectedPosition);
}

function selectUnit(unit) {
    selectedUnit = unit;
    selectedPosition = null;

    const positionContainer = document.getElementById("position-buttons");
    positionContainer.innerHTML = "";

    if (unit !== "all") {
        positionsByUnit[unit].forEach(pos => {
            const btn = document.createElement("button");
            btn.innerText = pos;
            btn.onclick = () => selectPosition(pos);
            positionContainer.appendChild(btn);
        });
    }

    renderSidebarPlayers(unit);
}

function selectPosition(position) {
    selectedPosition = position;
    renderSidebarPlayers(selectedUnit, position);
}

function renderSidebarPlayers(filterUnit = null, filterPosition = null) {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    players.forEach(p => {
        if (placedPlayers.has(p.id)) return;
        if (filterUnit && filterUnit !== "all" && p.unit !== filterUnit) return;
        if (filterPosition && p.position !== filterPosition) return;
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return;

        const card = document.createElement("div");
        card.className = "player-card";
        card.draggable = true;
        card.id = p.id;
        card.ondragstart = drag;

        card.innerHTML = `
            <img src="${p.photo}" class="player-photo">
            <img src="${p.logo}" class="school_logo">
            <div class="player-info">
                <h3 class="player-name">${p.name}</h3>
                <p>${p.height} | ${p.weight} lbs</p>
                <p>${p.stats}</p>
            </div>
        `;

        playerList.appendChild(card);
        card.querySelector(".player-name").onclick = () => showPlayerModal(p);
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const card = ev.target.closest(".player-card");
    const playerId = card.dataset.playerId || card.id;
    ev.dataTransfer.setData("text/plain", playerId);
}

function dropIntoRound(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");

    let card =
        document.getElementById(playerId) ||
        document.querySelector(`.player-card[data-player-id="${playerId}"]`);

    if (!card) return;

    card.setAttribute("data-player-id", playerId);
    card.draggable = true;
    card.ondragstart = drag;

    placedPlayers.add(playerId);

    if (!card.querySelector(".remove-btn")) {
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.innerText = "X";

        removeBtn.onclick = () => {
            const boardCard = document.querySelector(
                `.rank-list .player-card[data-player-id="${playerId}"]`
            );
            if (!boardCard) return;

            boardCard.remove();
            placedPlayers.delete(playerId);

            renderSidebarPlayers(selectedUnit, selectedPosition);
            updateRanks();
        };

        card.appendChild(removeBtn);
    }

    const roundList = ev.currentTarget;
    const afterElement = getDragAfterElement(roundList, ev.clientY);

    if (afterElement == null) {
        roundList.appendChild(card);
    } else {
        roundList.insertBefore(card, afterElement);
    }

    updateRanks();
    if (selectedPosition) selectPosition(selectedPosition);
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
    const allRounds = document.querySelectorAll(".round");
    const boardData = {};

    allRounds.forEach(round => {
        const roundNumber = round.dataset.round;
        const playerIds = [...round.querySelectorAll(".player-card")].map(card =>
            card.dataset.playerId || card.id
        );
        boardData[roundNumber] = playerIds;
    });

    localStorage.setItem("bigBoardData", JSON.stringify(boardData));

    document.querySelectorAll(".rank-list .player-card").forEach((player, index) => {
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

    if (!placedPlayers.has(playerId)) return;

    const boardCard = document.querySelector(
        `.rank-list .player-card[data-player-id="${playerId}"]`) ||
        document.getElementById(playerId);

    if (!boardCard) return;

    boardCard.remove();
    placedPlayers.delete(playerId);

    renderSidebarPlayers(selectedUnit, selectedPosition);
    updateRanks();
}

function hideSideBarPlayer(playerId) {
    const sidebarCard = document.getElementById(playerId);
    if (sidebarCard) sidebarCard.style.display = "none";
}

function showPlayerModal(player) {
    const modal = document.getElementById("player-modal");
    const profileCard = modal.querySelector(".profile-card");
    const notesArea = document.getElementById("player-notes");
    const saveBtn = document.getElementById("save-notes");

    profileCard.innerHTML = `
        <img src="${player.photo}" class="player-photo">
        <img src="${player.logo}" class="school_logo">
        <div class="player-info">
            <h3>${player.name}</h3>
            <p>${player.height} | ${player.weight} lbs</p>
            <p>${player.stats}</p>
        </div>
    `;

    notesArea.value = playerNotes[player.id] || "";

    saveBtn.onclick = () => {
        playerNotes[player.id] = notesArea.value;
    };

    modal.style.display = "flex";
}

function loadBoard() {
    const savedData = localStorage.getItem("bigBoardData");
    if (!savedData) return;

    const boardData = JSON.parse(savedData);

    Object.keys(boardData).forEach(roundNumber => {
        const roundDiv = document.querySelector(`.round[data-round="${roundNumber}"] .rank-list`);
        if (!roundDiv) return;

        boardData[roundNumber].forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (!player) return;

            const card = document.createElement("div");
            card.className = "player-card";
            card.draggable = true;
            card.dataset.playerId = player.id;
            card.ondragstart = drag;

            card.innerHTML = `
                <img src="${player.photo}" class="player-photo">
                <img src="${player.logo}" class="school_logo">
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <p>${player.height} | ${player.weight} lbs</p>
                    <p>${player.stats}</p>
                </div>
            `;

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.innerText = "X";
            removeBtn.onclick = () => {
                card.remove();
                placedPlayers.delete(player.id);
                updateRanks();
                renderSidebarPlayers(selectedUnit, selectedPosition);
            };
            card.appendChild(removeBtn);

            roundDiv.appendChild(card);
            placedPlayers.add(player.id);
        });
    });

    updateRanks();
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("player-modal");
    const closeBtn = document.getElementById("modal-close");

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    modal.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

loadBoard();
selectUnit("all");