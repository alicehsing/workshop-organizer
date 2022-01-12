import {
    createParticipant,
    checkAuth,
    logout,
    getWorkshops
} from '../fetch-utils.js';

const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const workshopId = data.get('workshop-id');
    
    //use createParticipant() to create a participant with the name and workshop id
    await createParticipant({
        name: name,
        workshop_id: workshopId
    });
    
    form.reset();
});

//on load, fetch the workshops. Use these workshops to create the dropdown to allow user add a participant to a workshop
window.addEventListener('load', async() => {
    //dynamically fill in the workshop dropdowns from supabase
    //grab the <select> HTML element from the DOM
    const dropdown = document.querySelector('select');
    //get the workshops from supabase
    const workshops = await getWorkshops();
    //for each workshop
    for (let workshop of workshops) {
        //create an option tag
        const optionEl = document.createElement('option');
        //set the option's value and text content
        //what the computer sees
        optionEl.value = workshop.id;
        //what the user sees
        optionEl.textContent = workshop.name;
        //append the options to the <select> in the DOM
        dropdown.append(optionEl);

    }
});

checkAuth();