//Player data
let players = []
let selectedUnit = "all";
let selectedPosition = null;
let searchQuery = "";
const placedPlayers = new Set();
const playerNotes = {};

async function loadPlayers() {
    const response = await fetch("./data/players.json");
    players = await response.json();

    initUI();
}

function initUI() {
    selectUnit("all");
    loadBoard();
}

const positionsByUnit = {
    offense: ["QB", "RB", "WR", "TE", "OT", "OG", "C"],
    defense: ["EDGE", "IDL", "LB", "CB", "S"],
    special: ["K", "P", "LS"]
};

const roundTitles = {
    1: "1st Round",
    2: "2nd Round",
    3: "3rd Round",
    4: "4th Round",
    5: "5th Round",
    6: "6th Round",
    7: "7th Round",
    8: "UDFA"
};

const favorites = new Set();
const savedFavorites = localStorage.getItem("favorites");
if (savedFavorites) {
    JSON.parse(savedFavorites).forEach(id => favorites.add(id));
}

const busts = new Set();
const savedBusts = localStorage.getItem("busts");
if (savedBusts) {
    JSON.parse(savedBusts).forEach(id => busts.add(id));
}

const reviews = new Set();
const savedReviews = localStorage.getItem("reviews");
if (savedReviews) {
    JSON.parse(savedReviews).forEach(id => reviews.add(id));
}

const savedNotes = localStorage.getItem("playerNotes");
if (savedNotes) {
    Object.assign(playerNotes, JSON.parse(savedNotes));
}


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
        card.dataset.playerId = p.id;
        card.ondragstart = drag;

        if (favorites.has(p.id)) {
            card.classList.add("favorited");
        }

        if (busts.has(p.id)) {
            card.classList.add("busted");
        }

        if (reviews.has(p.id)) {
            card.classList.add("reviewed");
        }

        card.innerHTML = `
            <img src="${p.logo}" class="school_logo">
            ${!selectedPosition ? `<p class="player-position">${p.position}</p>` : ""}
            <div class="player-info">
                <h3 class="player-name">${p.name}</h3>
                <p>${p.height} | ${p.weight} lbs</p>
            </div>
        `;

        playerList.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    loadPlayers();

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

    // Attach one delegated click listener
    document.addEventListener("click", (e) => {
        // Ignore clicks on star/remove buttons
        if (e.target.closest(".card-actions")) return;

        // Find the nearest player-card parent
        const card = e.target.closest(".player-card");
        if (!card) return;

        const playerId = card.dataset.playerId;
        if (!playerId) return;

        // Make sure players are loaded
        if (!players || !players.length) return;

        const player = players.find(p => p.id === playerId);
        if (!player) return;

        // Show the modal
        showPlayerModal(player);
    });
});

function showPlayerModal(player) {
    const modal = document.getElementById("player-modal");
    const profileCard = modal.querySelector(".profile-card");
    const starBtn = document.createElement("button");
    const bustBtn = document.createElement("button");
    const reviewBtn = document.createElement("button");
    const notesArea = document.getElementById("player-notes");
    const saveBtn = document.getElementById("save-notes");

    starBtn.classList.add("favorite-btn");
    bustBtn.classList.add("bust-btn");
    reviewBtn.classList.add("review-btn");


    const isFav = favorites.has(player.id);
    const isBust = busts.has(player.id);
    const isReview = reviews.has(player.id);
    starBtn.innerHTML = isFav ? "★" : "☆";
    starBtn.classList.toggle("active", isFav);
    bustBtn.innerHTML = isBust ? "▼" : "▽";
    bustBtn.classList.toggle("active", isBust);
    reviewBtn.innerHTML = isReview ? "⚑" : "⚐";
    reviewBtn.classList.toggle("active", isReview);

    profileCard.innerHTML = `
        <img src="${player.logo}" class="school_logo">
        <div class="player-info">
            <h3>${player.name}</h3>
            <p>${player.height} | ${player.weight} lbs</p>
            <p>${player.stats}</p>
        </div>
    `;

    notesArea.value = playerNotes[player.id] || "";

    starBtn.onclick = () => toggleFavorite(player.id);
    bustBtn.onclick = () => toggleBust(player.id);
    reviewBtn.onclick = () => toggleReview(player.id);
    saveBtn.onclick = () => {
        playerNotes[player.id] = notesArea.value;
        localStorage.setItem("playerNotes", JSON.stringify(playerNotes));
    };

    profileCard.appendChild(reviewBtn);
    profileCard.appendChild(bustBtn);
    profileCard.appendChild(starBtn);
    modal.style.display = "flex";
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
    if (!playerId) return;

    // Get the card from sidebar or board
    let card = document.querySelector(`.player-card[data-player-id="${playerId}"]`);
    if (!card) return;

    const roundList = ev.currentTarget;
    if (!roundList) return;

    // Prevent duplicate
    if (!placedPlayers.has(playerId)) {
        placedPlayers.add(playerId);

        // Add buttons if not already added
        if (!card.querySelector(".card-actions")) {
            const actionContainer = document.createElement("div");
            actionContainer.className = "card-actions";

            const reviewBtn = document.createElement("button");
            reviewBtn.className = "review-btn";
            reviewBtn.innerHTML = reviews.has(playerId) ? "⚑" : "⚐";
            reviewBtn.classList.toggle("active", reviews.has(playerId));
            reviewBtn.onclick = (e) => {
                e.stopPropagation();
                toggleReview(playerId);
            }

            const bustBtn = document.createElement("button");
            bustBtn.className = "bust-btn";
            bustBtn.innerHTML = busts.has(playerId) ? "▼" : "▽";
            bustBtn.classList.toggle("active", busts.has(playerId));
            bustBtn.onclick = (e) => {
                e.stopPropagation();
                toggleBust(playerId);
            }

            const starBtn = document.createElement("button");
            starBtn.className = "favorite-btn";
            starBtn.innerHTML = favorites.has(playerId) ? "★" : "☆";
            starBtn.classList.toggle("active", favorites.has(playerId));
            starBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(playerId);
            };

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.innerText = "X";
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                card.remove();
                placedPlayers.delete(playerId);
                updateRanks();
                renderSidebarPlayers(selectedUnit, selectedPosition);
            };

            actionContainer.appendChild(reviewBtn);
            actionContainer.appendChild(bustBtn);
            actionContainer.appendChild(starBtn);
            actionContainer.appendChild(removeBtn);
            card.appendChild(actionContainer);
        }
    }

    // Add position if missing
    if (!card.querySelector(".player-position")) {
        const player = players.find(p => p.id === playerId);

        if (player) {
            const position = document.createElement("p");
            position.className = "player-position";
            position.innerText = player.position;

            const playerInfo = card.querySelector(".player-info");

            if (playerInfo) {
                card.insertBefore(position, playerInfo);
            } else {
                card.appendChild(position);
            }
        }
    }

    // Move card into the round
    const afterElement = getDragAfterElement(roundList, ev.clientY);
    if (!afterElement) roundList.appendChild(card);
    else roundList.insertBefore(card, afterElement);

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
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function toggleFavorite(playerId) {
    if (favorites.has(playerId)) {
        favorites.delete(playerId);
    } else {
        favorites.add(playerId);
    }

    localStorage.setItem("favorites", JSON.stringify([...favorites]));
    updateAllFavoriteIcons(playerId);
}

function toggleBust(playerId) {
    if (busts.has(playerId)) {
        busts.delete(playerId);
    } else {
        busts.add(playerId);
    }

    localStorage.setItem("busts", JSON.stringify([...busts]));
    updateAllBustsIcons(playerId);
}

function toggleReview(playerId) {
    if (reviews.has(playerId)) {
        reviews.delete(playerId);
    } else {
        reviews.add(playerId);
    }

    localStorage.setItem("reviews", JSON.stringify([...reviews]));
    updateAllReviewsIcons(playerId);
}

function updateAllFavoriteIcons(playerId) {
    const isFav = favorites.has(playerId);

    document.querySelectorAll(`.player-card[data-player-id="${playerId}"] .favorite-btn`)
        .forEach(btn => {
            btn.innerHTML = isFav ? "★" : "☆";
            btn.classList.toggle("active", isFav);
        });

    const modalStar = document.querySelector("#player-modal .favorite-btn");
    if (modalStar) {
        modalStar.innerHTML = isFav ? "★" : "☆";
        modalStar.classList.toggle("active", isFav);
    }

    document.querySelectorAll(`.player-card[data-player-id="${playerId}"]`)
        .forEach(card => {
            card.classList.toggle("favorited", isFav);
        });
}

function updateAllBustsIcons(playerId) {
    const isBust = busts.has(playerId);

    document.querySelectorAll(`.player-card[data-player-id="${playerId}"] .bust-btn`)
        .forEach(btn => {
            btn.innerHTML = isBust ? "▼" : "▽";
            btn.classList.toggle("active", isBust);
        });
    
    const modalArrow = document.querySelector("#player-modal .bust-btn");
    if (modalArrow) {
        modalArrow.innerHTML = isBust ? "▼" : "▽";
        modalArrow.classList.toggle("active", isBust);
    }

    document.querySelectorAll(`.player-card[data-player-id="${playerId}"]`)
        .forEach(card => {
            card.classList.toggle("busted", isBust);
        });
}

function updateAllReviewsIcons(playerId) {
    const isReview = reviews.has(playerId);

    document.querySelectorAll(`.player-card[data-player-id="${playerId}"] .review-btn`)
        .forEach(btn => {
            btn.innerHTML = isReview ? "⚑" : "⚐";
            btn.classList.toggle("active", isReview);
        });

    const modalFlag = document.querySelector("#player-modal .review-btn");
    if (modalFlag) {
        modalFlag.innerHTML = isReview ? "⚑" : "⚐";
        modalFlag.classList.toggle("active", isReview);
    }

    document.querySelectorAll(`.player-card[data-player-id="${playerId}"]`)
        .forEach(card => {
            card.classList.toggle("reviewed", isReview);
        });
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

            if (reviews.has(player.id)) {
                card.classList.add("reviewed");
            }
            if (busts.has(player.id)) {
                card.classList.add("busted");
            }
            if (favorites.has(player.id)) {
                card.classList.add("favorited");
            }

            card.innerHTML = `
                <img src="${player.logo}" class="school_logo">
                <p class="player-position">${player.position}</p> 
                <div class="player-info">
                    <h3 class="player-name">${player.name}</h3>
                    <p>${player.height} | ${player.weight} lbs</p>
                </div>
            `;

            const removeBtn = document.createElement("button");
            const starBtn = document.createElement("button");
            const bustBtn = document.createElement("button");
            const reviewBtn = document.createElement("button");
            const actionContainer = document.createElement("div");
            actionContainer.className = "card-actions";

            actionContainer.appendChild(reviewBtn);
            actionContainer.appendChild(bustBtn);
            actionContainer.appendChild(starBtn);
            actionContainer.appendChild(removeBtn);

            const isReview = reviews.has(player.id);
            reviewBtn.className = "review-btn";
            reviewBtn.innerHTML = isReview ? "⚑" : "⚐";
            const isBust = busts.has(player.id);
            bustBtn.className = "bust-btn";
            bustBtn.innerHTML = isBust ? "▼" : "▽";
            const isFav = favorites.has(player.id);
            starBtn.className = "favorite-btn";
            starBtn.innerHTML = isFav ? "★" : "☆";
            removeBtn.className = "remove-btn";
            removeBtn.innerText = "X";

            reviewBtn.classList.toggle("active", isReview);
            bustBtn.classList.toggle("active", isBust);
            starBtn.classList.toggle("active", isFav);

            reviewBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                e.preventDefault();
                toggleReview(player.id);
            })

            bustBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                e.preventDefault();
                toggleBust(player.id);
            });

            starBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                e.preventDefault();
                toggleFavorite(player.id);
            });

            removeBtn.onclick = (e) => {
                e.stopPropagation();
                card.remove();
                placedPlayers.delete(player.id);
                updateRanks();
                renderSidebarPlayers(selectedUnit, selectedPosition);
            };

            card.appendChild(actionContainer);
            roundDiv.appendChild(card);

            // --- Add to placedPlayers only AFTER creating the card ---
            placedPlayers.add(player.id);
        });
    });

    // Render the sidebar after board cards are loaded
    renderSidebarPlayers(selectedUnit, selectedPosition);

    updateRanks();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".round").forEach(round => {
        const rankList = round.querySelector(".rank-list");
        rankList.addEventListener("dragover", (ev) => ev.preventDefault());
        rankList.addEventListener("drop", dropIntoRound);
    });
});

document.getElementById("download-board-btn").addEventListener("click", () => {
    downloadBigBoard();
})

// async function downloadBigBoard() {
//     const boardData = JSON.parse(localStorage.getItem("bigBoardData") || '{}');
//     const favoritesSet = new Set(JSON.parse(localStorage.getItem("favorites") || '[]'));

//     // Build the HTML
//     let html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <title>My Big Board</title>
//         <style>
//             body { font-family: sans-serif; background: #f0f0f0; }
//             .round { border: 1px solid #aaa; padding: 10px; margin: 10px; display: inline-block; vertical-align: top; width: 200px; }
//             .player-card { border: 1px solid #333; padding: 5px; margin: 5px; background: #fff; position: relative; display: flex; align-items: center; gap: 5px; }
//             .player-photo { width: 50px; height: 50px; object-fit: cover; }
//             .rank-number { font-weight: bold; margin-right: 5px; }
//             .favorite-star { position: absolute; top: 5px; right: 5px; color: gold; font-weight: bold; }
//         </style>
//     </head>
//     <body>
//         <h1>My Big Board</h1>
//         <div id="board-container">
//     `;

//     Object.keys(boardData).forEach(roundNum => {
//         const title = roundNum === "8" ? "UDFA" : roundNum + "th Round";
//         html += `<div class="round"><h2>${title}</h2>`;

//         boardData[roundNum].forEach(playerId => {
//             const player = players.find(p => p.id === playerId);
//             if (!player) return;

//             const isFav = favoritesSet.has(playerId);
//             html += `
//                 <div class="player-card">
//                     <span class="rank-number">${boardData[roundNum].indexOf(playerId) + 1}</span>
//                     <img src="${player.logo}" class="player-photo">
//                     <div><strong>${player.name}</strong></div>
//                     ${isFav ? '<div class="favorite-star">★</div>' : ''}
//                 </div>
//             `;
//         });

//         html += `</div>`; // close round
//     });

//     html += `
//         </div>
//     </body>
//     </html>
//     `;

//     // Download the file
//     const blob = new Blob([html], { type: "text/html" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "bigboard.html";
//     a.click();
// }

