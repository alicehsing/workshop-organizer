// IMPORT MODULES under test here:
import { renderParticipant } from '../render-utils.js';

const test = QUnit.test;

test('renderParticipant function should take in a participant argument consisted of a name, then return a DOM node with a <p> element', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const participant = {
        name: 'Lila',
    };

    const expected = `<p class="participant">Lila</p>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderParticipant(participant);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected, 'returns a DOM node consisted of a <p> element');
});
