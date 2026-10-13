// =========================
// DRAG & DROP
// =========================

function allowDrop(ev) {
    ev.preventDefault();
}


function drag(ev) {
    const card = ev.target.closest(".player-card");
    if (!card) return;

    const playerId = card.dataset.playerId || card.id;
    if (!playerId) return;

    let source = "board";

    if (card.closest("#favorites-list")) {
        source = "favorites";
    } else if (card.closest("#watchlist-list")) {
        source = "watchlist";
    } else if (card.closest("#player-list")) {
        source = "sidebar";
    }

    ev.dataTransfer.setData("text/plain", playerId);
    ev.dataTransfer.setData("source", source);
    ev.dataTransfer.effectAllowed = "move";
}



function getDragAfterElement(container, y, movingPlayerId = null) {
    const draggableElements = [
        ...container.querySelectorAll(".player-card")
    ].filter(card => {
        const id = card.dataset.playerId || card.id;
        return id !== movingPlayerId;
    });

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }

        return closest;
    }, {
        offset: Number.NEGATIVE_INFINITY,
        element: null
    }).element;
}



// =========================
// CLICK-TO-SELECT / CLICK-TO-PLACE
// =========================

let selectedPlayerId = null;

function selectPlayerForPlacement(playerId) {
    selectedPlayerId = playerId;

    // Update the selection highlight on every copy of this player.
    document.querySelectorAll(".player-card").forEach(card => {
        const id = card.dataset.playerId || card.id;

        card.classList.toggle(
            "placement-selected",
            id === selectedPlayerId
        );
    });
}

function clearPlacementSelection() {
    selectedPlayerId = null;

    document.querySelectorAll(".player-card").forEach(card => {
        card.classList.remove("placement-selected");
    });
}


function createPlacementButton(playerId) {
    const btn = document.createElement("button");
    btn.className = "placement-btn";
    btn.type = "button";
    btn.title = "Select player to place or move";
    btn.setAttribute("aria-label", "Select player to place or move");

    // Six dots arranged in 3 rows and 2 columns
    btn.textContent = "⠿";


    btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        if (selectedPlayerId === playerId) {
            clearPlacementSelection();
        } else {
            selectPlayerForPlacement(playerId);
        }
    });

    return btn;
}

function addPlacementButton(card, playerId) {
    if (card.querySelector(".placement-btn")) return;
    card.prepend(createPlacementButton(playerId));
}


// Place a selected player into a round.


function placeSelectedPlayer(roundList, targetCard = null) {
    if (!selectedPlayerId || !roundList) return;

    const playerId = selectedPlayerId;
    const player = players.find(p => p.id === playerId);

    if (!player) return;

    // Find the existing card if this player is already on the board.
    const boardCards = [
        ...document.querySelectorAll(
            "#big-board-screen .rank-list .player-card"
        )
    ];

    let card = boardCards.find(
        c => (c.dataset.playerId || c.id) === playerId
    );

    // Otherwise, find the player's card in the sidebar.
    if (!card) {
        card = document.querySelector(
            `#player-list .player-card[data-player-id="${playerId}"]`
        );
    }

    if (!card) return;

    // Remember where the player was before moving them.
    const oldParent = card.parentElement;
    const oldNextSibling = card.nextElementSibling;

    // Remove the player temporarily so they aren't duplicated.
    if (oldParent) oldParent.removeChild(card);

    // Add the button and board actions if needed.
    addPlacementButton(card, playerId);

    if (!card.querySelector(".card-actions")) {
        card.appendChild(createBoardActions(playerId, card));
    }

    addPositionIfMissing(playerId, card);

    // Place before the clicked player, or at the end if no player was clicked.
    if (targetCard && targetCard.parentElement === roundList) {
        roundList.insertBefore(card, targetCard);
    } else {
        roundList.appendChild(card);
    }

    placedPlayers.add(playerId);

    clearPlacementSelection();
    updateRanks();
    renderSidebarPlayers(selectedUnit, selectedPosition);
}
function placeSelectedPlayer(roundList, targetCard = null) {
    if (!selectedPlayerId || !roundList) return;

    const playerId = selectedPlayerId;
    const player = players.find(p => p.id === playerId);

    if (!player) return;

    // Find the existing card on the board first.
    const boardCards = [
        ...document.querySelectorAll(
            "#big-board-screen .rank-list .player-card"
        )
    ];

    let card = boardCards.find(
        c => (c.dataset.playerId || c.id) === playerId
    );

    // If the player isn't on the board, find their sidebar card.
    if (!card) {
        card = [
            ...document.querySelectorAll(
                "#player-list .player-card"
            )
        ].find(c => (c.dataset.playerId || c.id) === playerId);
    }

    if (!card) return;

    // Don't try to insert a card before itself.
    if (targetCard === card) {
        targetCard = card.nextElementSibling;
    }

    // Remove the card from its current location.
    card.remove();

    addPlacementButton(card, playerId);

    if (!card.querySelector(".card-actions")) {
        card.appendChild(createBoardActions(playerId, card));
    }

    addPositionIfMissing(playerId, card);

    // Insert before the target card, or append if no target exists.
    if (targetCard && targetCard.parentElement === roundList) {
        roundList.insertBefore(card, targetCard);
    } else {
        roundList.appendChild(card);
    }

    placedPlayers.add(playerId);

    clearPlacementSelection();
    updateRanks();
    renderSidebarPlayers(selectedUnit, selectedPosition);
}

// =========================
// DROP INTO BOARD
// =========================



function dropIntoRound(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");
    const source = ev.dataTransfer.getData("source");

    if (!playerId) return;
    if (source === "favorites" || source === "watchlist") return;

    const roundList = ev.currentTarget;
    if (!roundList) return;

    // Determine the insertion point BEFORE moving the card.
    const targetCard = getDragAfterElement(
        roundList,
        ev.clientY,
        playerId
    );

    selectedPlayerId = playerId;

    placeSelectedPlayer(roundList, targetCard);
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


function returnSelectedPlayerToSidebar() {
    if (!selectedPlayerId) return;

    const playerId = selectedPlayerId;

    const boardCards = [
        ...document.querySelectorAll(
            "#big-board-screen .rank-list .player-card"
        )
    ];

    const boardCard = boardCards.find(card =>
        (card.dataset.playerId || card.id) === playerId
    );

    if (!boardCard) return;

    boardCard.remove();
    placedPlayers.delete(playerId);

    clearPlacementSelection();
    updateRanks();
    renderSidebarPlayers(selectedUnit, selectedPosition);
}


// =========================
// LOAD BOARD
// =========================


function loadBoard() {
    const savedData = localStorage.getItem("bigBoardData");
    if (!savedData) {
        renderSidebarPlayers(selectedUnit, selectedPosition);
        return;
    }

    let boardData;

    try {
        boardData = JSON.parse(savedData);
    } catch (error) {
        console.error("Could not load saved Big Board:", error);
        renderSidebarPlayers(selectedUnit, selectedPosition);
        return;
    }

    // Prevent duplicate placement state if the board is reloaded.
    placedPlayers.clear();

    Object.keys(boardData).forEach(roundNumber => {
        const roundDiv = document.querySelector(
            `.round[data-round="${roundNumber}"] .rank-list`
        );

        if (!roundDiv || !Array.isArray(boardData[roundNumber])) return;

        boardData[roundNumber].forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (!player) return;

            // Avoid placing the same player twice.
            if (placedPlayers.has(player.id)) return;

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
                    <p>${player.height} | ${player.weight}lbs | ${player.age}yrs</p>
                </div>

                <div class="card-grade-container">
                    ${renderCardGrade(player)}
                </div>
            `;

            // IMPORTANT: Add buttons AFTER setting innerHTML.
            addPlacementButton(card, player.id);

            card.appendChild(createBoardActions(player.id, card));

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
        if (!rankList) return;

        rankList.addEventListener("dragover", event => {
            event.preventDefault();
        });

        rankList.addEventListener("drop", dropIntoRound);

        round.addEventListener("click", event => {
            if (!selectedPlayerId) return;

            // Don't place a player when clicking a button.
            if (event.target.closest("button")) return;

            const clickedCard = event.target.closest(".player-card");

            // Ignore clicks outside this round's player list.
            if (clickedCard && !rankList.contains(clickedCard)) return;

            // Use the click's vertical position to determine
            // whether to insert above or below the card.
            const targetCard = getDragAfterElement(
                rankList,
                event.clientY,
                selectedPlayerId
            );

            event.stopPropagation();
            placeSelectedPlayer(rankList, targetCard);
        });
    });

    const sidebar = document.getElementById("player-list");

    if (sidebar) {
        sidebar.addEventListener("click", event => {
            if (!selectedPlayerId) return;
            if (event.target.closest(".player-card")) return;

            returnSelectedPlayerToSidebar();
        });
    }
});
