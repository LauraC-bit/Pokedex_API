const main = () => {
  let pokedexDiv = document.getElementById("pokedex-div");
  let ulPokemon = document.createElement("ul");
  let liPokemon = document.createElement("li");
  let dataPokemons = [];

  const handlePokemon = async (url) => {
    const pokemon = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const check = pokemon.status;
    const data = await pokemon.json();
    return { check, data };
  };

  let callIt = async () => {
    let dataPokemon = null;
    for (let i = 1; i < 11; i++) {
      try {
        dataPokemon = await handlePokemon(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        console.log(dataPokemon);
        dataPokemons.push(dataPokemon.data);
      } catch (e) {
        console.log(e);
      }
    }

    console.log(dataPokemons);

    // for (const name in dataPokemon) {
    //   console.log(`${data.name}: ${dataPokemon[data.name]}`);
    // }

    // return dataPokemon;
  };
  callIt();

  let push = async () => {
    await callIt();
    pokedexDiv.push(ulPokemon);
    ulPokemon.push(liPokemon);
    liPokemon.push(dataPokemons);
    console.log("here");
  };
};

window.addEventListener("load", main);
