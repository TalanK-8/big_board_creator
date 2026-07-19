// =====================================================
// MODAL STATE / ELEMENTS
// =====================================================

let modal;
let profileCard;
let closeBtn;

let currentPlayerId = null;

// =====================================================
// INIT MODAL EVENTS
// =====================================================
document.addEventListener("DOMContentLoaded", () => {

    modal = document.getElementById("player-modal");
    profileCard = modal.querySelector(".profile-card");
    closeBtn = document.getElementById("modal-close");

    setupModalEvents();

});

function setupModalEvents() {

    if (!modal || !closeBtn) return;

    closeBtn.onclick = closeModal;

    modal.onclick = (event) => {
        if(event.target === modal){
            closeModal();
        }
    };

    document.addEventListener("keydown",(event)=>{
        if(event.key === "Escape" && modal.style.display === "flex"){
            closeModal();
        }
    });
}

function closeModal(){
    modal.style.display = "none";
    currentPlayerId = null;
}

// =====================================================
// OPEN / CLOSE MODAL
// =====================================================

function openPlayerModal(player) {

    currentPlayerId = player.id;

    renderPlayerProfile(player);
    setupProfileButtons(player);
    setupProfileTabs(player);

    modal.style.display = "flex";
}


// =====================================================
// PROFILE RENDERING (ONLY UI)
// =====================================================

function renderPlayerProfile(player) {
    profileCard.innerHTML = `
        <img src="${player.logo}" class="school_logo">

        <div class="player-info">
            <h3>${player.name} | ${player.position}</h3>
            <p>${player.height} | ${player.weight}lbs | ${player.age}yrs</p>
        </div>

        <div class="profile-actions"></div>
    `;
}


// =====================================================
// PROFILE BUTTONS (FAVORITE / BUST / REVIEW)
// =====================================================

function setupProfileButtons(player) {

    const actionArea = profileCard.querySelector(".profile-actions");

    actionArea.innerHTML = "";

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


    starBtn.onclick = () => toggleFavorite(player.id);
    bustBtn.onclick = () => toggleBust(player.id);
    reviewBtn.onclick = () => toggleReview(player.id);


    actionArea.appendChild(reviewBtn);
    actionArea.appendChild(bustBtn);
    actionArea.appendChild(starBtn);
}

function setupProfileTabs(player) {

    const tabs = document.querySelectorAll(".profile-tab");
    const content = document.getElementById("profile-tab-content");

    tabs.forEach(tab => {

        tab.onclick = () => {

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const selectedTab = tab.dataset.tab;

            if (selectedTab === "notes") {
                content.innerHTML = `
                    <textarea 
                        id="player-notes"
                        placeholder="Write notes here..."
                    >${playerNotes[player.id] || ""}</textarea>
                `;

                const notes = document.getElementById("player-notes");

                notes.addEventListener("input", () => {
                    playerNotes[player.id] = notes.value;

                    localStorage.setItem(
                        "playerNotes",
                        JSON.stringify(playerNotes)
                    );
                });
            }


            if (selectedTab === "stats") {
                content.innerHTML = `
                    <h3>Stats</h3>
                    <p>${player.stats || "No stats yet"}</p>
                `;
            }


            if (selectedTab === "physicals") {
                content.innerHTML = `
                    <h3>Physicals</h3>
                    <p>${player.height}</p>
                    <p>${player.weight} lbs</p>
                `;
            }


            if (selectedTab === "traits") {
                content.innerHTML = `
                    <h3>Traits</h3>
                    <p>No traits added yet.</p>
                `;
            }
        };
    });


    // open Notes by default
    document.querySelector(".profile-tab[data-tab='notes']").click();
}