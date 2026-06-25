// =========================
// DRAG & DROP
// =========================

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const card = ev.target.closest(".player-card");
    const playerId = card.dataset.playerId || card.id;
    ev.dataTransfer.setData("text/plain", playerId);
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".player-card")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// =========================
// DROP INTO BOARD
// =========================

function dropIntoRound(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");
    if (!playerId) return;

    let card = document.querySelector(`.player-card[data-player-id="${playerId}"]`);
    if (!card) return;

    const roundList = ev.currentTarget;
    if (!roundList) return;

    if (!placedPlayers.has(playerId)) {
        placedPlayers.add(playerId);

        if (!card.querySelector(".card-actions")) {
            const actionContainer = createBoardActions(playerId, card);
            card.appendChild(actionContainer);
        }
    }

    addPositionIfMissing(playerId, card);

    const afterElement = getDragAfterElement(roundList, ev.clientY);

    if (!afterElement) roundList.appendChild(card);
    else roundList.insertBefore(card, afterElement);

    updateRanks();
}

// =========================
// BOARD ACTIONS CREATION (IMPORTANT CLEANUP)
// =========================

function createBoardActions(playerId, card) {
    const actionContainer = document.createElement("div");
    actionContainer.className = "card-actions";

    const reviewBtn = createReviewBtn(playerId);
    const bustBtn = createBustBtn(playerId);
    const starBtn = createFavoriteBtn(playerId);
    const removeBtn = createRemoveBtn(playerId, card);

    actionContainer.appendChild(reviewBtn);
    actionContainer.appendChild(bustBtn);
    actionContainer.appendChild(starBtn);
    actionContainer.appendChild(removeBtn);

    return actionContainer;
}

// =========================
// BUTTON HELPERS
// =========================

function createReviewBtn(playerId) {
    const btn = document.createElement("button");
    btn.className = "review-btn";
    btn.innerHTML = reviews.has(playerId) ? "⚑" : "⚐";
    btn.classList.toggle("active", reviews.has(playerId));

    btn.onclick = (e) => {
        e.stopPropagation();
        toggleReview(playerId);
    };

    return btn;
}

function createBustBtn(playerId) {
    const btn = document.createElement("button");
    btn.className = "bust-btn";
    btn.innerHTML = busts.has(playerId) ? "▼" : "▽";
    btn.classList.toggle("active", busts.has(playerId));

    btn.onclick = (e) => {
        e.stopPropagation();
        toggleBust(playerId);
    };

    return btn;
}

function createFavoriteBtn(playerId) {
    const btn = document.createElement("button");
    btn.className = "favorite-btn";
    btn.innerHTML = favorites.has(playerId) ? "★" : "☆";
    btn.classList.toggle("active", favorites.has(playerId));

    btn.onclick = (e) => {
        e.stopPropagation();
        toggleFavorite(playerId);
    };

    return btn;
}

function createRemoveBtn(playerId, card) {
    const btn = document.createElement("button");
    btn.className = "remove-btn";
    btn.innerText = "X";

    btn.onclick = (e) => {
        e.stopPropagation();
        card.remove();
        placedPlayers.delete(playerId);
        updateRanks();
        renderSidebarPlayers(selectedUnit, selectedPosition);
    };

    return btn;
}

// =========================
// HELPERS
// =========================

function addPositionIfMissing(playerId, card) {
    if (card.querySelector(".player-position")) return;

    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const position = document.createElement("p");
    position.className = "player-position";
    position.innerText = player.position;

    const playerInfo = card.querySelector(".player-info");

    if (playerInfo) card.insertBefore(position, playerInfo);
    else card.appendChild(position);
}

// =========================
// BOARD STATE
// =========================

function updateRanks() {
    const allRounds = document.querySelectorAll(".round");
    const boardData = {};

    allRounds.forEach(round => {
        const roundNumber = round.dataset.round;
        const playerIds = [...round.querySelectorAll(".player-card")]
            .map(card => card.dataset.playerId || card.id);

        boardData[roundNumber] = playerIds;
    });

    localStorage.setItem("bigBoardData", JSON.stringify(boardData));

    document.querySelectorAll(".rank-list .player-card")
        .forEach((player, index) => {

            let rank = player.querySelector(".rank-number");

            if (!rank) {
                rank = document.createElement("span");
                rank.className = "rank-number";
                player.prepend(rank);
            }

            rank.innerText = index + 1;
        });
}

// =========================
// DROP BACK TO SIDEBAR
// =========================

function dropBackToSidebar(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");

    if (!placedPlayers.has(playerId)) return;

    const boardCard =
        document.querySelector(`.rank-list .player-card[data-player-id="${playerId}"]`) ||
        document.getElementById(playerId);

    if (!boardCard) return;

    boardCard.remove();
    placedPlayers.delete(playerId);

    renderSidebarPlayers(selectedUnit, selectedPosition);
    updateRanks();
}

// =========================
// LOAD BOARD
// =========================

function loadBoard() {
    const savedData = localStorage.getItem("bigBoardData");
    if (!savedData) return;

    const boardData = JSON.parse(savedData);

    Object.keys(boardData).forEach(roundNumber => {
        const roundDiv =
            document.querySelector(`.round[data-round="${roundNumber}"] .rank-list`);

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
                <img src="${player.logo}" class="school_logo">
                <p class="player-position">${player.position}</p>
                <div class="player-info">
                    <h3 class="player-name">${player.name}</h3>
                    <p>${player.height} | ${player.weight} lbs</p>
                </div>
            `;

            const actionContainer = createBoardActions(player.id, card);
            card.appendChild(actionContainer);

            roundDiv.appendChild(card);
            placedPlayers.add(player.id);
        });
    });

    renderSidebarPlayers(selectedUnit, selectedPosition);
    updateRanks();
}

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".round").forEach(round => {
        const rankList = round.querySelector(".rank-list");

        rankList.addEventListener("dragover", ev => ev.preventDefault());
        rankList.addEventListener("drop", dropIntoRound);
    });
});