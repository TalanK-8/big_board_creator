//Player data

const players = [
    {id: "player-1", name: "Rueben Bain Jr.", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "275", stats: "113tcks   19.5sacks   33tfls", photo: "images/players/RuebenBain.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-2", name: "Caleb Downs", unit: "defense", position: "S", height: "6' 0\"", weight: "205", stats: "256tcks   10pd   6ints", photo: "images/players/CalebDowns.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-3", name: "Fernando Mendoza", unit: "offense", position: "QB", height: "6' 5\"", weight: "225", stats: "68.5cmp%   7884yds   66tds   22ints", photo: "images/players/FernandoMendoza.jpg", logo: "images/logos/IndianaLogo.png"},
    {id: "player-4", name: "David Bailey", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "250", stats: "163tcks   29sacks   42tfls", photo: "images/players/DavidBailey.jpg", logo: "images/logos/TexasTechLogo.png"},
    {id: "player-5", name: "Peter Woods", unit: "defense", position: "IDL", height: "6' 3\"", weight: "315", stats: "82tcks   5sacks   14.5tfls", photo: "images/players/PeterWoods.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-6", name: "Francis Mauigoa", unit: "offense", position: "OT", height: "6' 6\"", weight: "315", stats: "42gs   8sa   0.5pres%", photo: "images/players/FrancisMauigoa.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-7", name: "Jeremiyah Love", unit: "offense", position: "RB", height: "6' 0\"", weight: "214", stats: "6.7ypc   3476yds   42tds", photo: "images/players/JeremiyahLove.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-8", name: "Jordyn Tyson", unit: "offense", position: "WR", height: "6' 2\"", weight: "200", stats: "158recs   2282yds   22tds", photo: "images/players/JordynTyson.jpg", logo: "images/logos/ArizonaStateLogo.png"},
    {id: "player-9", name: "Carnell Tate", unit: "offense", position: "WR", height: "6' 3\"", weight: "195", stats: "121recs   1872yds   14tds", photo: "images/players/CarnellTate.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-10", name: "Makai Lemon", unit: "offense", position: "WR", height: "5' 11\"", weight: "195", stats: "137recs   2008yds   14tds", photo: "images/players/MakaiLemon.jpg", logo: "images/logos/USCLogo.png"},
    {id: "player-11", name: "Spencer Fano", unit: "offense", position: "OT", height: "6' 6\"", weight: "302", stats: "35gs   3sa   0.6pres%", photo: "images/players/SpencerFano.jpg", logo: "images/logos/UtahLogo.png"},
    {id: "player-12", name: "Kenyon Sadiq", unit: "offense", position: "TE", height: "6' 3\"", weight: "245", stats: "75recs   863yds   11tds", photo: "images/players/KenyonSadiq.jpg", logo: "images/logos/OregonLogo.png"},
    {id: "player-13", name: "Mansoor Delane", unit: "defense", position: "CB", height: "6' 0\"", weight: "190", stats: "191tcks   27pd   8ints", photo: "images/players/MansoorDelane.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-14", name: "Jermod McCoy", unit: "defense", position: "CB", height: "6' 0\"", weight: "193", stats: "75tcks   14pd   6ints", photo: "images/players/JermodMcCoy.jpg", logo: "images/logos/TennesseeLogo.png"},
    {id: "player-15", name: "Keldric Faulk", unit: "defense", position: "EDGE", height: "6' 6\"", weight: "285", stats: "109tcks   10sacks   19.5tfls", photo: "images/players/KeldricFaulk.jpg", logo: "images/logos/AuburnLogo.png"},
    {id: "player-16", name: "Arvell Reese", unit: "defense", position: "LB", height: "6' 4\"", weight: "243", stats: "112tcks   13.5tfls   7sacks", photo: "images/players/ArvellReese.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-17", name: "Avieon Terrell", unit: "defense", position: "CB", height: "5' 11\"", weight: "180", stats: "125tcks   25pd   3ints", photo: "images/players/AvieonTerrell.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-9", name: "Cashius Howell", unit: "defense", position: "EDGE", height: "6' 2\"", weight: "248", stats: "127tcks   27sacks   35.5tfls", photo: "images/players/CashiusHowell.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-18", name: "TJ Parker", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "265", stats: "126tcks   21.5sacks   41.5tfls", photo: "images/players/TJParker.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-19", name: "Ty Simpson", unit: "offense", position: "QB", height: "6' 2\"", weight: "208", stats: "64.5cmp%   3984yds   28tds   5ints", photo: "images/players/TySimpson.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-20", name: "Kadyn Proctor", unit: "offense", position: "OT", height: "6' 7\"", weight: "366", stats: "38gs   16sa   3.18pres%", photo: "images/players/KadynProctor.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-9", name: "Denzel Boston", unit: "offense", position: "WR", height: "6' 4\"", weight: "209", stats: "132recs   1781yds   20tds", photo: "images/players/DenzelBoston.jpg", logo: "images/logos/WashingtonLogo.png"},
    {id: "player-21", name: "Kayden McDonald", unit: "defense", position: "IDL", height: "6' 3\"", weight: "326", stats: "85tcks   3sacks   11tfls", photo: "images/players/KaydenMcDonald.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-21", name: "Christen Miller", unit: "defense", position: "IDL", height: "6' 4\"", weight: "305", stats: "64tcks   4sacks   11.5tfls", photo: "images/players/ChristenMiller.jpg", logo: "images/logos/GeorgiaLogo.png"},
    {id: "player-21", name: "Gennings Dunker", unit: "offense", position: "OT", height: "6' 5\"", weight: "315", stats: "40gs   10sa   3.8pres%", photo: "images/players/GenningsDunker.jpg", logo: "images/logos/IowaLogo.png"},
    {id: "player-21", name: "R Mason Thomas", unit: "defense", position: "EDGE", height: "6' 2\"", weight: "249", stats: "65tcks   17sacks   25.5tfls", photo: "images/players/RMasonThomas.jpg", logo: "images/logos/OklahomaLogo.png"}
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