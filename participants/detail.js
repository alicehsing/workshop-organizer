import {
    logout,
    getWorkshops,
    updateParticipant,
    deleteParticipant
} from '../fetch-utils.js';


const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    //dynamically fill in the workshop drop-downs from supabase
    //grab the <select> HTML element from the DOM
    const dropdown = document.querySelector('select');
    const deleteButtonEl = document.querySelector('.delete');
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

        //stretch goal: add a delete button to delete a participant from workshop/supabase
        deleteButtonEl.addEventListener('click', async() => {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            await deleteParticipant(id); 
        });
    }
});

//on submit, update a participant's workshop in supabase
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(form);
    const workshopId = data.get('workshop-id');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    //use updateParticipant() to update a participant's workshop id 
    await updateParticipant(workshopId, id);
    
    form.reset();
});