import { 
    checkAuth, 
    logout, 
    getWorkshops,
    //deleteParticipant
} from '../fetch-utils.js';
import { renderParticipant } from '../render-utils.js';

checkAuth();

//grab the DOM
const workshopListEl = document.querySelector('.workshop-list');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

//on load,fetch and display the workshops and its participants in supabase
window.addEventListener('load', async() => {
    fetchAndDisplayWorkshops();
});

//create a function that fetches and displays the workshops and its participants in supabase
async function fetchAndDisplayWorkshops() {
    //fetch the workshops from supabase
    const workshops = await getWorkshops();
    //clear out the workshopListEl
    workshopListEl.textContent = '';
    
    for (let workshop of workshops) {
        //create three elements for each workshop: one for the entire workshop, one to hold the workshop name, and one to hold the participant
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('a');
        const participantsEl = document.createElement('div');

        workshopEl.classList.add('workshop');
        participantsEl.classList.add('participants');
        nameEl.textContent = workshop.name;
        workshopEl.append(nameEl, participantsEl);

        //for each of the workshops's participants
        for (let participant of workshop.participants) {
            const newParticipantEl = renderParticipant(participant);

            //add an event listener to the new participant. On click, delete the participant, then re-fetch and re-display all workshops
            // newParticipantEl.addEventListener('click', async() => {
            //     // await deleteParticipant(participant.id);
            //     fetchAndDisplayWorkshops();
            // });

            //append this new participant to participantsEl
            participantsEl.append(newParticipantEl);

            //append participantsEl and nameEl to the workshopEl
            workshopEl.append(nameEl, participantsEl);
        }
    //append the workshopEl to the workshopListEl
        workshopListEl.append(workshopEl);
    }
}