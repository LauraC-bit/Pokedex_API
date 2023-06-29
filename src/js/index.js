const main = () => {
  let body = document.getElementById("body");
  let ulPokemon = document.createElement("ul");
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
    for (let i = 0; i < 10; i++) {
      try {
        dataPokemon = await handlePokemon(
          `https://pokeapi.co/api/v2/pokemon/${i + 1}`
        );
        console.log(dataPokemon);
        dataPokemons.push(dataPokemon.data);
      } catch (e) {
        console.log(e);
      }
    }

    console.log(dataPokemons);
  };

  let push = async () => {
    await callIt();

    let extract = () => {
      for (let i = 0; i < dataPokemons.length; i++) {
        let liPokemon = document.createElement("li");
        let pName = document.createElement("p");
        let pId = document.createElement("p");
        let pHeight = document.createElement("p");
        let pWeight = document.createElement("p");
        let pStats = document.createElement("p");
        let divImg = document.createElement("div");
        let keys = null;
        let value = null;
        let statsPoke = dataPokemons[i].stats;
        pName.innerHTML = "Name: " + dataPokemons[i].name;
        pId.innerHTML = "ID: " + dataPokemons[i].id;
        pHeight.innerHTML = "Height: " + dataPokemons[i].height;
        pWeight.innerHTML = "Weight: " + dataPokemons[i].weight;
        divImg.style.backgroundImage = `url(
          ${dataPokemons[i].sprites.front_default}
        )`;

        statsPoke.forEach((props) => {
          let keys = Object.keys(props);

          keys.forEach((key) => {
            let stat = "";
            let value = "";
            let span = document.createElement("span");
            if (key === "stat") {
              stat = props[key].name;
            }
            if (key === "base_stat") {
              value = props[key];
              console.log(value);
            }
            if (key === "stat" || key === "base_stat") {
              span.innerHTML = stat + " " + value;
              pStats.prepend(span);
            }
          });
        });

        liPokemon.append(pHeight);
        liPokemon.append(pWeight);
        liPokemon.append(pStats);
        liPokemon.prepend(pName);
        liPokemon.prepend(pId);
        liPokemon.prepend(divImg);
        ulPokemon.append(liPokemon);
      }
    };

    console.log(dataPokemons);
    extract();

    body.append(ulPokemon);
  };

  push();
};

window.addEventListener("load", main);
