import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0';

const startForm = document.getElementById("startprompt");
const output = document.getElementById("output");
const followupForm = document.getElementById("followupprompt");
const submit1 = document.getElementById("submit1");
const submit2 = document.getElementById("submit2");
const initializeButton = document.getElementById("initialize");
const aiProgressFill = document.getElementById("aiProgressFill");
const aiProgressTrack = document.getElementById("aiProgressTrack");
let generator;

function setAiProgress(percent) {
    const progress = Math.max(0, Math.min(100, Math.round(percent)));
    aiProgressFill.style.width = progress + "%";
    aiProgressTrack.setAttribute("aria-valuenow", progress);
}

async function initializeAi() {
        output.value = "AI initializing..."
        generator = await pipeline(
            'text-generation',
            'HuggingFaceTB/SmolLM2-360M-Instruct',
            {
                dtype: 'q4',
                progress_callback: (info) => {
                    if (info.status === "progress_total" && Number.isFinite(info.progress)) {
                        setAiProgress(info.progress);
                    } else if (typeof info.progress === "number") {
                        setAiProgress(info.progress);
                    } else if (info.status === "initiate") {
                        setAiProgress(0);
                    }
                }
            }
        );
        setAiProgress(100);
        submit1.disabled = false;
        submit2.disabled = false;
        initializeButton.textContent = "AI Ready";
        output.value = "READY! Output prompt will appear here..."
}

async function generateText(content ,either) {
    output.value = "Thinking..."
    submit1.disabled = true;
    submit2.disabled = true;

    const messages = [
        { 
            role: 'user', 
            content: 'Give me 15 keywords and 2 short sentences for a game about: pirates in space' 
        },
        { 
            role: 'assistant', 
            content: 'keywords: laser, spaceship, treasure, asteroid, galaxy, bounty, alien, chase, cannon, warp, caught, collider, police, exciting, fast.\n Sentences: Captain Nova steered the rusty cruiser through the asteroid belt. A hidden alien treasure waited on the edge of the dark nebula.' 
        },
        { 
            role: 'user', 
            content: `Give me 15 keywords and 2 short sentences for a game about: ${content}` 
        }
    ];

    const response = await generator(messages, {
        max_new_tokens: 100,
        temperature: 0.8,
        do_sample: true,
      });

    const generatedText = response[0].generated_text.at(-1).content;

    submit1.disabled = false;
    submit2.disabled = false;

    if (either === "start"){
        startPrompt(generatedText);
    } else {
        followupPrompt(generatedText);
    }
    
}

initializeButton.addEventListener('click', () => {
    if (output.value === "Output prompt will appear here...") {
        initializeAi();
        initializeButton.disabled = true;
    } else {
        initializeButton.disabled = true;
    }
    
})

startForm.addEventListener('submit', (event) => {
    const startFormData = new FormData(startForm);
    const gameidea = startFormData.get('gameidea');
    const clanguage = startFormData.get('clanguage');
    if (gameidea != "" && clanguage != "") {
    event.preventDefault();
    startForm.disabled = true;
    generateText(gameidea, "start");
    } else {
        output.value = "Atleast a game idea and the coding language are required!!"
    }
})

function startPrompt(generatedtext){
    const startFormData = new FormData(startForm); 
    const gameidea = startFormData.get('gameidea');
    const waybetter = startFormData.get('1000timesbetter');
    const extrafunny = startFormData.get('extrafunny');
    const nomistakes = startFormData.get('nomistakes');
    const clanguage = startFormData.get('clanguage');
    const dimension = startFormData.get('dimension');
    const gamegenre = startFormData.get('gamegenre');
    const artstyle = startFormData.get('artstyle');
    const levelcount = startFormData.get('levelcount');
    const crazyfeatures = startFormData.get('crazyfeatures');
    const sloplevel = startFormData.get('sloplevel');
    const gametype = startFormData.get('gametype');
    const cameraperspective = startFormData.get('cameraperspective');
    const platform = startFormData.get('platform');
    const noaiui = startFormData.get('noaiui');

    output.value = "Make a " + dimension + " " + gametype + " game in " + clanguage + " coding language themed around this: " + gameidea + " and these " + generatedtext + " The game has to inlude everything I just said";

    if (waybetter) {
        output.value += ", also make it 1000 times better";
    }
    if (extrafunny) {
        output.value += ", also make it extra funny";
    }
    if (nomistakes) {
        output.value += " and make no mistakes.";
    }
    if (gamegenre != "") {
        output.value += " The game's genre is " + gamegenre + ".";
    }
    if (artstyle != "") {
        output.value += " The game's artstyle is " + artstyle + ".";
    }
    if (levelcount != "") {
        output.value += " The game has " + levelcount + " levels.";
    }
    if (cameraperspective != "") {
        output.value += " The game's camera perspective is " + cameraperspective + ".";
    }
    if (platform != "") {
        output.value += " The game's main platform is " + platform + ".";
    }
    if (crazyfeatures) {
        output.value += " Also include 10 to 30 CRAZY and super funny features!";
    }
    if (noaiui) {
        output.value += " Also make sure that the UI doesn't look AI generated, make it look human, but still fitting in the theme.";
    }

    output.value += " The game has a 'slop' value of " + sloplevel + ". Higher number means more slop, more crazy features and less realistic.";

    startForm.disabled = false;
}

followupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const followupFormData = new FormData(followupForm);
    const featureidea = followupFormData.get('featureidea');
    const addfeatureidea = followupFormData.get('newfeature');

    if (featureidea != "" && addfeatureidea){
        generateText(featureidea, "follow");
    } else {
        followupPrompt();
    }
})

function followupPrompt(generatedtext) {
    const followupFormData = new FormData(followupForm);
    const featureidea = followupFormData.get('featureidea');
    const addfeatureidea = followupFormData.get('newfeature');
    const waybetter = followupFormData.get('1000timesbetter2');
    const extrafunny = followupFormData.get('extrafunny2');
    const nomistakes = followupFormData.get('nomistakes2');
    const fixbugs = followupFormData.get('fixbugs');
    const morefeatures = followupFormData.get('morefeatures');
    const morelevels = followupFormData.get('morelevels');
    const commit = followupFormData.get('commit');
    const repolink = followupFormData.get('repolink');

    if(!addfeatureidea && !waybetter && !extrafunny && !nomistakes && !fixbugs && !morefeatures && !commit) {
        output.value = "Atleast some changes are required!"
    } else {
    output.value = "Now do these changes: \n";

    if (generatedtext != ""){
        output.value += "Add these features: " + featureidea + " With these " + generatedtext;
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
    if (morelevels) {
        if (output.value === "Now do these changes: \n"){
            output.value += "add more levels and content"
        } else {
            output.value += ", add more levels and content"
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
}

const copiedDiv = document.getElementById("copiedDiv");
const copiedTxt = document.getElementById("copiedTxt");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

document.getElementById('output').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(output.value);
        copiedDiv.classList.remove("closing");
        copiedDiv.classList.add("open");
        copiedDiv.style.display = "flex";
        copiedTxt.textContent = "Copied!";

        if(copiedDiv.style.display != "none") {
            await wait(2000);
            copiedDiv.classList.remove("open");
            copiedDiv.classList.add("closing");
            await wait(300);
            copiedDiv.style.display = "none";
        }
    } catch (err) {
        console.error('Failed to copy:', err);
    }
});

document.getElementById("closeBtn").addEventListener('click', () => {
    copiedDiv.classList.remove("open");
    copiedDiv.classList.add("closing");
    setTimeout(() => {
        copiedDiv.style.display = "none";
    }, 500);
})