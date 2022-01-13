export function renderParticipant(participant) {
    //create an anchor tag element <a>
    const participantLink = document.createElement('a');
    //on click, update participant's workshop
    participantLink.href = `../participants/?id=${participant.id}`;

    const participantEl = document.createElement('p');
    participantEl.classList.add('participant');
    participantEl.textContent = participant.name;
    //wrap each participant inside the anchor tag
    participantLink.append(participantEl);

    return participantLink;
}