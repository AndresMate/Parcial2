document.getElementById('btnShowAll').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/characters');
        const characters = await response.json();
        displayResults(characters);
        showMessage('Ruta utilizada: GET /api/characters');
    } catch (error) {
        console.error('Error al obtener todos los personajes:', error);
    }
});

document.getElementById('btnSearchId').addEventListener('click', async () => {
    const id = document.getElementById('searchId').value.trim();
    if (id) {
        try {
            const response = await fetch(`/api/characters/${id}`);
            if (response.ok) {
                const character = await response.json();
                displayResults([character]);
                showMessage(`Ruta utilizada: GET /api/characters/${id}`);
            } else {
                alert('Personaje no encontrado o error en la búsqueda.');
                clearMessage();
            }
        } catch (error) {
            console.error('Error al buscar por ID:', error);
        }
    } else {
        alert('Por favor, ingresa un ID válido.');
        clearMessage();
    }
});

document.getElementById('btnSearchName').addEventListener('click', async () => {
    const name = document.getElementById('searchName').value.trim();
    if (name) {
        try {
            const response = await fetch(`/api/characters/name/${name}`);
            if (response.ok) {
                const characters = await response.json();
                displayResults(characters);
                showMessage(`Ruta utilizada: GET /api/characters/name/${name}`);
            } else {
                alert('Personaje no encontrado o error en la búsqueda.');
                clearMessage();
            }
        } catch (error) {
            console.error('Error al buscar por nombre:', error);
        }
    } else {
        alert('Por favor, ingresa un nombre válido.');
        clearMessage();
    }
});

function displayResults(characters) {
    const results = document.getElementById('results');
    results.innerHTML = ''; // Limpia los resultados previos
    characters.forEach(character => {
        const row = `<tr>
          <td>${character._id}</td>
          <td>${character.name}</td>
          <td>${character.height}</td>
          <td>${character.gender}</td>
          <td>${character.homeworld}</td>
          <td>${character.species}</td>
        </tr>`;
        results.innerHTML += row;
    });
}
function showMessage(message) {
    document.getElementById('message').innerText = message;
}

function clearMessage() {
    document.getElementById('message').innerText = '';
}