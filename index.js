const URL_BASE ="https://pokeapi.co/api/v2/pokemon/";
const formulario = document.getElementById('miFormulario');
const numeroInput = document.getElementById('numeroInput');
const contenedor = document.getElementById('contenedor');




const APIconsulta =async(e)=>{
    e.preventDefault();
    pedido(numeroInput.value);
    

}

const render = (info)=>{
    contenedor.innerHTML=
    `
    <div class="card">
        <h2>${info.name}</h2>
        <img src="${info.sprites.front_shiny}" alt="${info.name} image">
        <div class ="types">
            ${info.types.map(type=>`<span class="${type.type.name}">${type.type.name}</span>`).join('')}
        </div>
        <div class="peso-altura">
            <span>Altura: ${info.height/10}M.</span>
            <span>Peso: ${info.weight/10}Kg.</span>
        </div>
    </div>
    `;
}

const pedido = async(id) =>{
    try {
        const POKEMON = await fetch(`${URL_BASE}${id}`);

        if (POKEMON.status === 200) {
            const data = await POKEMON.json();
            render(data);
        } else {
            throw new Error("No se encontró el Pokémon");
        }
    } catch (error) {
        contenedor.innerHTML = `
        <div class="error-message">
            <h2>Hubo un error al realizar la consulta: ${error.message}</h2>
            <p>Intenta con otra ID.</p>
            </div>`;
    }
    formulario.reset();
}   


const init =()=>{
    formulario.addEventListener('submit',APIconsulta);
}

init();