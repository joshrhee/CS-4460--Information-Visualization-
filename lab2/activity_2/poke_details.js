// DOM #main div element
var main = document.getElementById('main');

// **** Your JavaScript code goes here ****

pokemonList = [{
    "name": "Bulbasaur",
    "type": "Grass",
    "final_evolution": "Venusaur",
    "hp": 80,
    "attack_power": 82,
},
{
    "name": "Charmander",
    "type": "Fire",
    "final_evolution": "Charizard",
    "hp": 78,
    "attack_power": 84,
},
{
    "name": "Squirtle",
    "type": "Water",
    "final_evolution": "Blastoise",
    "hp": 79,
    "attack_power": 83,
}]

// document is the DOM, select the #main div
var main = document.getElementById("main");

// Create a new DOM element
var header = document.createElement("h3");
// Append the newly created <h3> element to #main
main.appendChild(header);
// Set the textContent to:
header.textContent = "Pokemon Starters";

// Create a new <div> element	
var div1 = document.createElement("div");
// Append the newly created <div> element to #main
main.appendChild(div1);

// // Create a new <h5> element
// var name1 = document.createElement("h5");
// // Append the newly created <h5> element to your new div
// div1.appendChild(name1);
// // Set the textContent to the first pokemon's name
// name1.textContent = pokemonList[0]["name"];

// // Create a new <p> element
// var type1= document.createElement("p");
// // Append the newly created <p> element to your new div
// div1.appendChild(type1);
// // Set the textContent to the first pokemon's type.
// type1.textContent = "Type: " +pokemonList[0]["type"];


const FAVORIT_POKEMON = "Squirtle";

function halfHP(pokemon) {
    return pokemon.hp / 2;
}

function debugPoke() {
    pokemonList.map((pokemon, _) => {
        console.log("pokemon name: " + pokemon.name, " new hp: " + pokemon.hp);
    })
}

function changingDom() {
    const filterdArray = pokemonList.filter((pokemon, _) => {
        return pokemon.name !== FAVORIT_POKEMON
    })
    .map((pokemon, i) => {
        pokemonList[i].hp = halfHP(pokemonList[i]);

        const pokemonName = pokemon.name;
        const pokemonType = pokemon.type;
        const pokemonFinalEvolution = pokemon.final_evolution;
        const pokemonHP = pokemon.hp;
        const pokemonAttackPower = pokemon.attack_power;

        let div = document.createElement("div");
        div.className = "pokemon-div";
        main.appendChild(div);

        let name = document.createElement("h5");
        name.textContent = pokemonName;
        name.className = "pokemon-name";
        div.appendChild(name);

        let type = document.createElement("p");
        type.textContent = "Type: " + pokemonType;
        div.appendChild(type);

        let finalEvolution = document.createElement("p");
        finalEvolution.textContent = "Final evolution: " + pokemonFinalEvolution;
        div.appendChild(finalEvolution);

        let hp = document.createElement("p");
        hp.textContent = "HP: " + pokemonHP;
        div.appendChild(hp);

        let attackPower = document.createElement("p");
        attackPower.textContent = "Attack power: " + pokemonAttackPower;
        div.appendChild(attackPower);
    })

    console.log("filterered array: ", filterdArray);
}

changingDom();
debugPoke();