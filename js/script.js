const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonName = document.querySelector('.pokemon__name');
const inputSearch = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext= document.querySelector('.btn-next');
const form = document.querySelector('.form');
let searchPokemon = 1;

const fetchPokemon = async(pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async(pokemon) => {
    pokemonName.innerHTML = 'loading...';
    pokemonImage.style.display = 'block';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = '';
        searchPokemon = data.id;
    }else{  
        pokemonName.innerHTML = 'Not found!';
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});
btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);