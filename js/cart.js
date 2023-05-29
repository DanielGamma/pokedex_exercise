const cartContainer = document.querySelector(".cart-container");

const cart = JSON.parse(localStorage.getItem("cart"));

const deletePokemon = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const pokemonToDelete = cart.find(pokemon => pokemon.id === id);
    if (pokemonToDelete.quantity > 1) {
        pokemonToDelete.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        paintPokemons(cart);
    } else {
        const newCart = cart.filter(pokemon => pokemon.id !== id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        paintPokemons(newCart);
    }
}

const paintPokemons = (pokemons) => {
    if (!pokemons.length) {
        cartContainer.innerText = "No items in cart!"
    }
    else {
        cartContainer.innerHTML = "";
        pokemons.forEach(pokemon => {
            const div = document.createElement("div");

            div.innerHTML = `<span>${pokemon.id}</span>
                             <h3>${pokemon.name}</h3>
                             <img src=${pokemon.img} />
                             <div>
                                <span>Quantity: ${pokemon.quantity}</span>
                                <button onClick="deletePokemon('${pokemon.id}')">Delete</button>
                             </div>
                            `;

            cartContainer.append(div);
        });
    }
}

if (cart) {
    paintPokemons(cart, cartContainer);
}
else {
    cartContainer.innerText = "No items in cart!";
}