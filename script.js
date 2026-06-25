// =====================================================
// STATE
// =====================================================

let players = [];
let selectedUnit = "all";
let selectedPosition = null;
let searchQuery = "";

const placedPlayers = new Set();
const playerNotes = {};

const favorites = new Set();
const busts = new Set();
const reviews = new Set();

const savedFavorites = localStorage.getItem("favorites");
if (savedFavorites) JSON.parse(savedFavorites).forEach(id => favorites.add(id));

const savedBusts = localStorage.getItem("busts");
if (savedBusts) JSON.parse(savedBusts).forEach(id => busts.add(id));

const savedReviews = localStorage.getItem("reviews");
if (savedReviews) JSON.parse(savedReviews).forEach(id => reviews.add(id));

const savedNotes = localStorage.getItem("playerNotes");
if (savedNotes) Object.assign(playerNotes, JSON.parse(savedNotes));


// =====================================================
// CONSTANTS
// =====================================================

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


// =====================================================
// INIT
// =====================================================

async function loadPlayers() {
    const res = await fetch("./data/players.json");
    players = await res.json();
    initUI();
}

function initUI() {
    selectUnit("all");
    loadBoard();
}

document.addEventListener("DOMContentLoaded", () => {
    loadPlayers();
});


// =====================================================
// SIDEBAR FILTERING
// =====================================================

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


// =====================================================
// SIDEBAR RENDERING
// =====================================================

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

        if (favorites.has(p.id)) card.classList.add("favorited");
        if (busts.has(p.id)) card.classList.add("busted");
        if (reviews.has(p.id)) card.classList.add("reviewed");

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


// =====================================================
// TOGGLES (GLOBAL STATE)
// =====================================================

function toggleFavorite(playerId) {
    favorites.has(playerId) ? favorites.delete(playerId) : favorites.add(playerId);
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
    updateAllFavoriteIcons(playerId);
}

function toggleBust(playerId) {
    busts.has(playerId) ? busts.delete(playerId) : busts.add(playerId);
    localStorage.setItem("busts", JSON.stringify([...busts]));
    updateAllBustsIcons(playerId);
}

function toggleReview(playerId) {
    reviews.has(playerId) ? reviews.delete(playerId) : reviews.add(playerId);
    localStorage.setItem("reviews", JSON.stringify([...reviews]));
    updateAllReviewsIcons(playerId);
}


// =====================================================
// ICON UPDATES (used by BOTH board + modal)
// =====================================================

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
}


// =====================================================
// NOTES STORAGE
// =====================================================

const savedNotes = localStorage.getItem("playerNotes");
if (savedNotes) {
    Object.assign(playerNotes, JSON.parse(savedNotes));
}