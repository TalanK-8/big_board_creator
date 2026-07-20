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

const evaluations = {};
let gradeFormulas = {};

const savedFavorites = localStorage.getItem("favorites");
if (savedFavorites) JSON.parse(savedFavorites).forEach(id => favorites.add(id));

const savedBusts = localStorage.getItem("busts");
if (savedBusts) JSON.parse(savedBusts).forEach(id => busts.add(id));

const savedReviews = localStorage.getItem("reviews");
if (savedReviews) JSON.parse(savedReviews).forEach(id => reviews.add(id));

Object.assign(playerNotes,
    JSON.parse(localStorage.getItem("playerNotes") || "{}")
);


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
    const playersRes = await fetch("./data/players.json");
    players = await playersRes.json();

    const formulasRes = await fetch("./data/gradeFormulas.json");
    gradeFormulas = await formulasRes.json();
    /* Switch back once finished updating json
    const savedFormulas = localStorage.getItem("gradeFormulas");
    if(savedFormulas){
        gradeFormulas = JSON.parse(savedFormulas);
    }
    else{
        const formulasRes = await fetch("./data/gradeFormulas.json");
        gradeFormulas = await formulasRes.json();
    }
    */

    const savedEvaluations = localStorage.getItem("evaluations");
    if (savedEvaluations) {
        Object.assign(evaluations, JSON.parse(savedEvaluations));
    }

    requestAnimationFrame(() => {
        selectUnit("all");
        loadBoard();
        refreshAllCardGrades();
    });
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
        const unitFilter = filterUnit || selectedUnit;
        const positionFilter = filterPosition || selectedPosition;

        if (placedPlayers.has(p.id)) return;
        if (unitFilter !== "all" && p.unit !== unitFilter) return;
        if (positionFilter && p.position !== positionFilter) return;
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
                <p>${p.height} | ${p.weight}lbs | ${p.age}yrs</p>
            </div>

            <div class="card-grade-container">
                ${renderCardGrade(p)}
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
// PLAYER PROFILE OPENER
// =====================================================

document.addEventListener("click", (e) => {
    const card = e.target.closest(".player-card");
    if (!card) return;

    // IMPORTANT: ignore clicks on action buttons
    if (e.target.closest(".card-actions")) return;

    const playerId = card.dataset.playerId;
    if (!playerId || !players.length) return;

    const player = players.find(p => p.id === playerId);
    if (!player) return;

    openPlayerModal(player);
});

// =====================================================
// HELPER FUNCTION FOR GRADES
// =====================================================

function calculateOverallGrade(player) {
    const position = player.position;

    const formula = gradeFormulas[position];
    if (!formula) return null;

    const evaluation = evaluations[player.id];
    if (!evaluation) return null;

    let total = 0;

    for (const characteristic in  formula) {
        const value = evaluation[characteristic];

        if (value === undefined) continue;

        total += value * formula[characteristic];
    }

    return total;
}

function renderCardGrade(player) {
    const grade = calculateOverallGrade(player);

    if (grade === null) {
        return "";
    }

    return `
        <div class="card-grade">
            ${grade.toFixed(1)}
        </div>
    `;
}

function refreshAllCardGrades(){

    document.querySelectorAll(".player-card").forEach(card => {

        const playerId = card.dataset.playerId;

        const player = players.find(
            p => p.id === playerId
        );

        if(!player) return;

        const oldGrade = card.querySelector(".card-grade");

        const newHTML = renderCardGrade(player);

        if(oldGrade){
            oldGrade.remove();
        }

        if(newHTML){
            card.insertAdjacentHTML(
                "beforeend",
                newHTML
            );
        }

    });
}

function updatePlayerCardGrade(playerId){

    const player = players.find(p => p.id === playerId);
    if(!player) return;

    document
        .querySelectorAll(`.player-card[data-player-id="${playerId}"]`)
        .forEach(card => {
            console.log(card.innerHTML);
            const gradeContainer = card.querySelector(".card-grade-container");

            if(!gradeContainer) return;

            console.log(player);
            console.log(renderCardGrade(player));
            console.log(calculateOverallGrade(player));
            gradeContainer.innerHTML = renderCardGrade(player);

        });
}

function saveEvaluations() {
    localStorage.setItem(
        "evaluations",
        JSON.stringify(evaluations)
    );
}

function saveGradeFormulas() {
    localStorage.setItem(
        "gradeFormulas",
        JSON.stringify(gradeFormulas)
    );
}

// =====================================================
// NOTES STORAGE
// =====================================================

Object.assign(playerNotes,
    JSON.parse(localStorage.getItem("playerNotes") || "{}")
);
