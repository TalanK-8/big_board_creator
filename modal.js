// =====================================================
// MODAL STATE / ELEMENTS
// =====================================================

const modal = document.getElementById("player-modal");
const profileCard = modal.querySelector(".profile-card");
const notesArea = document.getElementById("player-notes");
const saveBtn = document.getElementById("save-notes");
const closeBtn = document.getElementById("modal-close");

let currentPlayerId = null;


// =====================================================
// INIT MODAL EVENTS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    setupModalEvents();
});

function setupModalEvents() {
    if (!modal || !closeBtn) return;

    closeBtn.onclick = closeModal;

    modal.onclick = (event) => {
        if (event.target === modal) closeModal();
    };
}


// =====================================================
// OPEN / CLOSE MODAL
// =====================================================

function openPlayerModal(player) {
    currentPlayerId = player.id;

    renderPlayerProfile(player);
    setupProfileButtons(player);

    notesArea.value = playerNotes[player.id] || "";

    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    currentPlayerId = null;
}


// =====================================================
// PROFILE RENDERING (ONLY UI)
// =====================================================

function renderPlayerProfile(player) {
    profileCard.innerHTML = `
        <img src="${player.logo}" class="school_logo">
        <div class="player-info">
            <h3>${player.name}</h3>
            <p>${player.height} | ${player.weight} lbs</p>
            <p>${player.stats}</p>
        </div>
    `;
}


// =====================================================
// PROFILE BUTTONS (FAVORITE / BUST / REVIEW)
// =====================================================

function setupProfileButtons(player) {
    const starBtn = document.createElement("button");
    const bustBtn = document.createElement("button");
    const reviewBtn = document.createElement("button");

    starBtn.className = "favorite-btn";
    bustBtn.className = "bust-btn";
    reviewBtn.className = "review-btn";

    const isFav = favorites.has(player.id);
    const isBust = busts.has(player.id);
    const isReview = reviews.has(player.id);

    starBtn.innerHTML = isFav ? "★" : "☆";
    bustBtn.innerHTML = isBust ? "▼" : "▽";
    reviewBtn.innerHTML = isReview ? "⚑" : "⚐";

    starBtn.classList.toggle("active", isFav);
    bustBtn.classList.toggle("active", isBust);
    reviewBtn.classList.toggle("active", isReview);

    starBtn.onclick = () => toggleFavorite(player.id);
    bustBtn.onclick = () => toggleBust(player.id);
    reviewBtn.onclick = () => toggleReview(player.id);

    profileCard.appendChild(reviewBtn);
    profileCard.appendChild(bustBtn);
    profileCard.appendChild(starBtn);
}


// =====================================================
// NOTES SYSTEM (PROFILE ONLY)
// =====================================================

saveBtn.onclick = () => {
    if (!currentPlayerId) return;

    playerNotes[currentPlayerId] = notesArea.value;
    localStorage.setItem("playerNotes", JSON.stringify(playerNotes));
};