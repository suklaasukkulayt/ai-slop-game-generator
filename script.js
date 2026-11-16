const startForm = document.getElementById("startprompt");
const output = document.getElementById("output");
const followupForm = document.getElementById("followupprompt");

startForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const startFormData = new FormData(startForm);
    const gameidea = startFormData.get('gameidea');
    const waybetter = startFormData.get('1000timesbetter');
    const extrafunny = startFormData.get('extrafunny');
    const nomistakes = startFormData.get('nomistakes');
    const clanguage = startFormData.get('clanguage');

    if (gameidea != "" && clanguage != "") {
    output.value = "Make a game in " + clanguage + " coding language themed around " + gameidea;

    if (waybetter) {
        output.value += ", also make it 1000 times better"
    }
    if (extrafunny) {
        output.value += ", also make it extra funny"
    }
    if (nomistakes) {
        output.value += " and make no mistakes."
    }

    } else {
        output.value = "Atleast game idea and coding language are required!!"
    }
})

followupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const followupFormData = new FormData(followupForm);
    const featureidea = followupFormData.get('featureidea');
    const addfeatureidea = followupFormData.get('newfeature');
    const waybetter = followupFormData.get('1000timesbetter');
    const extrafunny = followupFormData.get('extrafunny');
    const nomistakes = followupFormData.get('nomistakes');
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