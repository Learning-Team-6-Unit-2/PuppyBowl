const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


// helper function to toggle parties visibility
function togglePlayerListVisibility(displayVal,) {
    const playerElements = document.getElementsByClassName('player');
    for (const playerElement of playerElements) {
        playerElement.style.display = displayVal;
    }

    //also toggle the form
    newPlayerFormContainer.style.display = displayVal;
}

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}players/`);
        const players = response.json();
        console.log(players.players);
        return players.players; //the actual player array in the promise object
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}/`);
        const player = response.json();
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`${APIURL}players/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playerObj)
            });
        const newPlayer = await response.json();
        return newPlayer();
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};
/* const response = await fetch(`${PARTIES_API_URL}/${id}`, {
      method: 'DELETE'
    });
    const party = await response.json();
    return party;
    */
const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}/`,
            {
                method: 'DELETE'
            });
        const player = response.json();
        //not supposed to return anything
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

//optional. get an array of all the players on a specific team
const fetchAllTeams = async () => {
    try {
        const response = await fetch(`${APIURL}teams/`);
        const teams = await response.json();
        return teams;
    } catch (err) {
        console.error(`'Oh no, trouble fetching teams!`, err);
    }
}

// render a single party by id
const renderSinglePlayerById = async (id) => {
    try {

    } catch (err) {
        console.error(`Uh oh, trouble rendering player #${playerId}!`, err);
    }
}

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        playerContainer.innerHTML = '';
        playerList.forEach((player) => {
            const playerElement = document.createElement('div');
            playerElement.classList.add('player'); //class for styling purposes
            playerElement.innerHTML = `
            <h2>${player.name}</h2>
            <p>${player.id}</p>
            <p>${player.breed}</p>
            <p>${player.status}</p>
            <p>${player.imgUrl}</p>
            <p>${player.createdAt}</p>
            <p>${player.updatedAt}</p>
            <p>${player.teamId}</p>
            <p>${player.cohortId}</p>
            <button class="details-button" data-id="${player.id}">See details</button>
            <button class="delete-button" data-id="${player.id}">Remove from roster</button>
            `;

            playerContainer.appendChild(playerElement);

            //see details
            const detailsButton = playerElement.querySelector('.details-button');
            detailsButton.addEventListener('click', async (event) => {
                //hide the list of players (to create a clean slate for a detailed player to show)
                togglePlayerListVisibility('none');

                //show the details of the player clicked
                renderSinglePlayerById(event.target.dataset.id);
            });

            //delete player
            const deleteButton = playerElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', async (event) => {
                //refresh the page to show the remaining players after the deletion event
                await removePlayer(event.target.dataset.id);
                await window.location.reload();
            });
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {

    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();