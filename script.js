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
        const players = await response.json(); //a promise, not the actual data. The data needs to be extracted
        return players.data.players; //the actual player array in the promise object
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}/`);
        const player = await response.json();
        return player.data.player; //the actual player in the promise object
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
                /*   body: JSON.stringify({
                       name: playerObj.name,
                       id: playerObj.id,
                       breed: playerObj.breed,
                       status:playerObj.status,
                       imageUrl: playerObj.imageUrl,
                       createdAt: playerObj.createdAt,
                       teamId: playerObj.teamId,
                       cohortId: playerObj.cohortId
                   })*/
                body: JSON.stringify(playerObj)
            });
        const newPlayer = await response.json();
        console.log(typeof (newPlayer))
        return newPlayer;
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}/`,
            {
                method: 'DELETE'
            });
        const player = await response.json();
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

// render a single player by id
const renderSinglePlayerById = async (id) => {
    try {
        //fetch player details from server
        const player = await fetchSinglePlayer(id);

        //create a new HTML element to display player details
        const playerDetailsElememt = document.createElement('div');
        playerDetailsElememt.classList.add('player-details'); //for styling purposes
        playerDetailsElememt.innerHTML = `
            <h1>${player.name}</h1>
            <p><img src = ${player.imageUrl}></p>
            <p><strong>ID:</strong> ${player.id}</p>
            <p><strong>Breed:</strong> ${player.breed}</p>
            <p><strong>Status:</strong> ${player.status}</p>
            <p><strong>Created at:</strong> ${player.createdAt}</p>
            <p><strong>Updated at:</strong> ${player.updatedAt}</p>
            <p><strong>Team ID:</strong> ${player.teamId}</p>
            <p><strong>Cohort ID:</strong> ${player.cohortId}</p>
            <button class="close-button">Close</button>
        `;

        playerContainer.appendChild(playerDetailsElememt);

        // add event listener to close button
        const closeButton = playerDetailsElememt.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            playerDetailsElememt.remove();
            togglePlayerListVisibility('flex');
        });
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
        //   console.log(playerList);
        playerContainer.innerHTML = '';
        playerList.forEach((player) => {
            const playerElement = document.createElement('div');
            playerElement.classList.add('player'); //class for styling purposes
            playerElement.innerHTML = `
            <h1>${player.name}</h1>
            <p><img src = ${player.imageUrl}></p>
            <p><strong>ID:</strong> ${player.id}</p>
            <p><strong>Breed:</strong> ${player.breed}</p>
            <p><strong>Status:</strong> ${player.status}</p>
            <p><strong>Created at:</strong> ${player.createdAt}</p>
            <p><strong>Updated at:</strong> ${player.updatedAt}</p>
            <p><strong>Team ID:</strong> ${player.teamId}</p>
            <p><strong>Cohort ID:</strong> ${player.cohortId}</p>
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
        return playerContainer;
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
        //createdAt and updatedAt should be created by the app, not the user. exclude them from the form
        let form = `
        <form>
            Name: <input type="text" name="name" placeholder="" required><br><br>
            ID: <input type="number" name="id" placeholder="" required><br><br>
            Breed: <input type="text" name="breed" placeholder="" required><br><br>
            Status: <input type="text" name="status" placeholder="" required><br><br>
            ImageUrl: <input type="text" name="imageUrl" placeholder="" required><br><br>
            TeamId: <input type="number" name="teamId" placeholder="" required><br><br>
            CohortId: <input type="number" name="cohortId" placeholder="" required><br><br>

            <button class="addPlayer-button" type="button">Add New Player</button>
        </form>
        `
        newPlayerFormContainer.innerHTML = form;

        //add a new player button that takes name, id, breed, status, imageurl, createdAt, updatedAt, teamId, and cohortId
        const newPlayerButton = newPlayerFormContainer.querySelector('.addPlayer-button');
        newPlayerButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const name = document.getElementsByName('name')[0].value;
            const id = document.getElementsByName('id')[0].value;
            const breed = document.getElementsByName('breed')[0].value;
            const status = document.getElementsByName('status')[0].value;
            const imageUrl = document.getElementsByName('imageUrl')[0].value;

            //createdAt and updateAt should be created by the app
            const createdAt = new Date().getTime();

            //updatedAt should be the same as createdAt when adding a new player. Change updatedAt if the player is edited and saved
            const updatedAt = createdAt;

            const teamId = document.getElementsByName('teamId')[0].value;
            const cohortId = document.getElementsByName('cohortId')[0].value;

            const newPlayer = {
                id,
                name,
                breed,
                status,
                imageUrl,
                createdAt,
                updatedAt,
                teamId,
                cohortId
            }

            await addNewPlayer(newPlayer);
            console.log(newPlayer);
            await window.location.reload();
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    //console.log(players);
    //console.log(typeof(players));
    //console.log(Array.isArray(players));
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();