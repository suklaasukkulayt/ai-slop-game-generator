import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0';

const startForm = document.getElementById("startprompt");
const output = document.getElementById("output");
const followupForm = document.getElementById("followupprompt");
const submit1 = document.getElementById("submit1");
const submit2 = document.getElementById("submit2");
let generator;

async function initializeAi() {
      output.value = "AI initializing..."
    generator = await pipeline('text-generation', 'HuggingFaceTB/SmolLM2-360M-Instruct', {
        dtype: 'q4',
      });

      submit1.disabled = false;
      submit2.disabled = false;
      output.value = "READY! Output prompt will appear here..."
}

async function generateText(content) {
    output.value = "Thinking..."
    submit1.disabled = true;
    submit2.disabled = true;

    const messages = [
        { 
            role: 'user', 
            content: 'Give me 20 keywords and 2 short sentences for a game about: pirates in space' 
        },
        { 
            role: 'assistant', 
            content: 'keywords: laser, spaceship, treasure, asteroid, galaxy, bounty, alien, chase, cannon, warp.\n Sentences: Captain Nova steered the rusty cruiser through the asteroid belt. A hidden alien treasure waited on the edge of the dark nebula.' 
        },
        { 
            role: 'user', 
            content: `Give me 20 keywords and 2 short sentences for a game about: ${content}` 
        }
    ];

    const response = await generator(messages, {
        max_new_tokens: 85,
        temperature: 0.8,
        do_sample: true,
      });

    const generatedText = response[0].generated_text.at(-1).content;

    submit1.disabled = false;
    submit2.disabled = false;
    startPrompt(generatedText);
}

initializeAi();

startForm.addEventListener('submit', (event) => {
    if (gameidea != "" && clanguage != "" && dimension != "") {
    const startFormData = new FormData(startForm);
    const gameidea = startFormData.get('gameidea');
    event.preventDefault();
    startForm.disabled = true;
    generateText(gameidea);
    } else {
        output.value = "Atleast game idea, dimension and coding language are required!!"
    }
})

function startPrompt(generatedText){
    const startFormData = new FormData(startForm);
    const gameidea = startFormData.get('gameidea');
    const waybetter = startFormData.get('1000timesbetter');
    const extrafunny = startFormData.get('extrafunny');
    const nomistakes = startFormData.get('nomistakes');
    const clanguage = startFormData.get('clanguage');
    const dimension = startFormData.get('dimension');

    output.value = "Make a " + dimension + " game in " + clanguage + " coding language themed around this: " + gameidea + " and these " + generatedText + "The game has to inlude everything I just said.";

    if (waybetter) {
        output.value += ", also make it 1000 times better"
    }
    if (extrafunny) {
        output.value += ", also make it extra funny"
    }
    if (nomistakes) {
        output.value += " and make no mistakes."
    }

    startForm.disabled = false;
}

followupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    generateText(featureidea);
    const followupFormData = new FormData(followupForm);
    const featureidea = followupFormData.get('featureidea');
    const addfeatureidea = followupFormData.get('newfeature');
    const waybetter = followupFormData.get('1000timesbetter2');
    const extrafunny = followupFormData.get('extrafunny2');
    const nomistakes = followupFormData.get('nomistakes2');
    const fixbugs = followupFormData.get('fixbugs');
    const morefeatures = followupFormData.get('morefeatures');
    const commit = followupFormData.get('commit');
    const repolink = followupFormData.get('repolink');

    if(!addfeatureidea && !waybetter && !extrafunny && !nomistakes && !fixbugs && !morefeatures && !commit) {
        output.value = "Atleast some changes are required!"
    } else {
    output.value = "Now do these changes: \n";

    if (addfeatureidea && featureidea != ""){
        output.value += "Add these features: " + featureidea;
    } 

    if (waybetter) {
        if (output.value === "Now do these changes: \n"){
            output.value += "make it 1000 times better"
        } else {
            output.value += ", make it 1000 times better"
        }
    }
    if (extrafunny) {
        if (output.value === "Now do these changes: \n"){
            output.value += "make it even more funny"
        } else {
            output.value += ", make it even more funny"
        }
    }
    if (fixbugs) {
        if (output.value === "Now do these changes: \n"){
            output.value += "fix every single bug in the game"
        } else {
            output.value += ", fix every single bug in the game"
        }
    
    }
    if (morefeatures) {
        if (output.value === "Now do these changes: \n"){
            output.value += "add EVEN MORE features"
        } else {
            output.value += ", add EVEN MORE features"
        }
    }
    }
    if (commit) {
        if (output.value === "Now do these changes: \n"){
            if (repolink != ""){
            output.value += "commit this to GitHub: " + repolink;
        }
        } else {
            if (repolink != ""){
            output.value += ", commit this to GitHub: " + repolink;
        }
        }
        
    }
    if (nomistakes) {
        output.value += " and make no mistakes."
    }

})

