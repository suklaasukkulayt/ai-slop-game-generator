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