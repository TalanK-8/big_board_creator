// =====================================================
// MODAL STATE / ELEMENTS
// =====================================================

let modal;
let profileCard;
let closeBtn;

let currentPlayerId = null;
let currentProfilePlayer = null;

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
// GET INFO
// =====================================================

function getOverallRank(playerId) {
    const cards = document.querySelectorAll(".rank-list .player-card");

    const index = [...cards].findIndex(card => 
        card.dataset.playerId === playerId
    );

    return index === -1 ? "--" : index + 1;
}

function getPositionRank(playerId) {
    const player = players.find(p => p.id === playerId);
    if(!player) return "--";

    const cards = [...document.querySelectorAll(".rank-list .player-card")];

    let rank = 0;

    for (const card of cards) {
        const current = players.find(p => p.id === card.dataset.playerId);

        if (current.position === player.position) {
            rank++;

            if (current.id === playerId) return rank;
        }
    }

    return "--";
}

// =====================================================
// OPEN / CLOSE MODAL
// =====================================================

function openPlayerModal(player) {

    currentPlayerId = player.id;
    currentProfilePlayer = player;

    renderPlayerProfile(player);
    setupGradeEditor(player);
    setupProfileButtons(player);
    setupProfileTabs(player);

    modal.style.display = "flex";
}


// =====================================================
// PROFILE RENDERING (ONLY UI)
// =====================================================

function renderPlayerProfile(player) {
    const overallRank = getOverallRank(player.id);
    const positionRank = getPositionRank(player.id);

    profileCard.innerHTML = `
        <img src="${player.logo}" class="school_logo">

        <div class="player-info">
            <h3>${player.name} | ${player.position}</h3>
            <p>${player.height} | ${player.weight}lbs | ${player.age}yrs</p>

            <p class="player-ranks">
                OR: #${overallRank} | PR: #${positionRank}
            </p>
        </div>

        <div class="profile-grade-section">
            <h1 id="overall-grade">${calculateOverallGrade(player)?.toFixed(1) || "--"}</h1>

            <button id="edit-grade-btn">
                EDIT
            </button>
        </div>

        <div class="profile-actions"></div>
    `;
}

// =====================================================
// Grade edit button
// =====================================================

function setupGradeEditor(player){

    const editBtn = document.getElementById("edit-grade-btn");

    const editor = document.getElementById("grade-editor-modal");

    const close = document.getElementById("grade-editor-close");

    const addCharacteristicBtn = document.getElementById(
        "add-characteristic-btn"
    );

    editBtn.onclick = () => {
        const characteristicContainer = document.getElementById(
            "characteristic-container"
        );

        const weightContainer = document.getElementById(
            "weight-container"
        );

        characteristicContainer.innerHTML = "";
        weightContainer.innerHTML = "";

        const formula = gradeFormulas[player.position];

        if(!formula) return;

        for(const characteristic in formula){
            characteristicContainer.innerHTML += `
                <div class="grade-row" data-characteristic-row="${characteristic}">

                    <label>${characteristic}</label>

                    <input 
                        type="number"
                        class="characteristic-input"
                        data-characteristic="${characteristic}"
                        min="1"
                        max="99"
                        value="${evaluations[player.id]?.[characteristic] || 50}">
                    <button 
                        class="delete-characteristic-btn"
                        data-characteristic="${characteristic}">
                        X
                    </button>
                </div>`;

            weightContainer.innerHTML += `
                <div class="weight-row">
                    <label>${characteristic} %</label>

                    <input 
                        type="number"
                        class="weight-input"
                        data-characteristic="${characteristic}"
                        value="${formula[characteristic] * 100}"
                    ></div>`;
        }

        const weightInputs = document.querySelectorAll(".weight-input");

        weightInputs.forEach(input => {
            input.addEventListener("input", updateWeightTotal);
        });

        updateWeightTotal();

        editor.style.display = "flex";

        document.getElementById("grade-editor-title").textContent =
            `${player.name} Grade Editor`;
    };

    close.onclick = () => {
        editor.style.display = "none";
    };

    addCharacteristicBtn.onclick = () => {
        const nameInput = document.getElementById(
            "new-characteristic-name"
        );

        const name = nameInput.value.trim();

        if(!name) return;

        nameInput.value = "";

        const characteristicContainer = document.getElementById(
            "characteristic-container"
        );

        const weightContainer = document.getElementById(
            "weight-container"
        );

        characteristicContainer.innerHTML += `
            <div class="grade-row" data-characteristic-row="${name}">
                <label>${name}</label>
                <input 
                    type="number"
                    class="characteristic-input"
                    data-characteristic="${name}"
                    min="1"
                    max="99"
                    value="50">

                <button 
                    class="delete-characteristic-btn"
                    data-characteristic="${name}">
                    X
                </button>
            </div>`;

        weightContainer.innerHTML += `
            <div class="weight-row">

                <label>${name} %</label>

                <input 
                    type="number"
                    class="weight-input"
                    data-characteristic="${name}"
                    value="0"
                >

            </div>
        `;

        const newWeightInput = weightContainer.lastElementChild.querySelector(
            ".weight-input"
        );

        newWeightInput.addEventListener(
            "input",
            updateWeightTotal
        );

        updateWeightTotal();
    };

    document.addEventListener("click", (event) => {
        if(!event.target.classList.contains("delete-characteristic-btn")){
            return;
        }

        const characteristic = event.target.dataset.characteristic;

        // Remove characteristic row
        const row = document.querySelector(
            `[data-characteristic-row="${characteristic}"]`
        );

        if(row){
            row.remove();
        }

        // Remove matching weight row
        const weightInput = document.querySelector(
            `.weight-input[data-characteristic="${characteristic}"]`
        );

        if(weightInput){
            weightInput.closest(".weight-row").remove();
        }

        // Remove from saved data
        if(gradeFormulas[player.position]){
            delete gradeFormulas[player.position][characteristic];
        }

        if(evaluations[player.id]){
            delete evaluations[player.id][characteristic];
        }

        saveEvaluations();
        saveGradeFormulas();
        updateWeightTotal();
    });

    editor.onclick = (event)=>{
      if(event.target === editor){
            editor.style.display="none";
        }
    };

    const saveBtn = document.getElementById("save-grade-btn");

    saveBtn.onclick = () => {
        if(!evaluations[player.id]){
            evaluations[player.id] = {};
        }

        const inputs = document.querySelectorAll(
            ".characteristic-input"
        );

        inputs.forEach(input => {
            const characteristic = input.dataset.characteristic;
            evaluations[player.id][characteristic] = Number(input.value);
        });

        const weightInputs = document.querySelectorAll(
            ".weight-input"
        );

        let totalWeight = 0;
        weightInputs.forEach(input => {
            totalWeight += Number(input.value) || 0;
        });

        if (Math.abs(totalWeight - 100) > .01) {
            alert("Weights must total 100%.");
            return;
        }

        if(!gradeFormulas[player.position]){
            gradeFormulas[player.position] = {};
        }

        weightInputs.forEach(input => {
            const characteristic = input.dataset.characteristic;

            gradeFormulas[player.position][characteristic] =
                Number(input.value) / 100;
        });

        saveEvaluations();
        saveGradeFormulas();
        updateOverallGrade();

        editor.style.display = "none";
    };
}

function updateWeightTotal() {

    const weightInputs = document.querySelectorAll(".weight-input");

    let total = 0;

    weightInputs.forEach(input => {
        total += Number(input.value) || 0;
    });

    document.getElementById("weight-total").textContent = `${total}%`;
}

// =====================================================
// UPDATE GRADES
// =====================================================

function updateOverallGrade(){

    if(!currentProfilePlayer) return;

    const grade = document.getElementById("overall-grade");

    const newGrade = calculateOverallGrade(currentProfilePlayer);

    grade.textContent = newGrade
        ? newGrade.toFixed(1)
        : "--";
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