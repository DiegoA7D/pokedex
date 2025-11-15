let currentOffset = 0;
let currentPage = 0;

const typeColors = {
    'normal': 'type-normal',
    'fire': 'type-fire',
    'water': 'type-water',
    'electric': 'type-electric',
    'grass': 'type-grass',
    'ice': 'type-ice',
    'fighting': 'type-fighting',
    'poison': 'type-poison',
    'ground': 'type-ground',
    'flying': 'type-flying',
    'psychic': 'type-psychic',
    'bug': 'type-bug',
    'rock': 'type-rock',
    'ghost': 'type-ghost',
    'dragon': 'type-dragon',
    'dark': 'type-dark',
    'steel': 'type-steel',
    'fairy': 'type-fairy'
};

function showLoading() {
    $('#loading').removeClass('d-none');
    $('#pokemonGrid').html('');
}

function hideLoading() {
    $('#loading').addClass('d-none');
}

function displayPokemon(pokemons) {
    let html = '';
    pokemons.forEach(pokemon => {
        const types = pokemon.types.map(type => 
            `<span class="type-badge ${typeColors[type]}">${type}</span>`
        ).join('');
        
        html += `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="card pokemon-card" onclick="showPokemonDetail('${pokemon.name}')">
                    <div class="pokemon-image">
                        <img src="${pokemon.image}" alt="${pokemon.name}" onerror="this.src='https://via.placeholder.com/200'">
                    </div>
                    <div class="pokemon-info">
                        <p class="pokemon-id">#${pokemon.id}</p>
                        <p class="pokemon-name">${pokemon.name}</p>
                        <div>${types}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    if (pokemons.length === 0) {
        html = '<div class="no-results">No se encontraron resultados</div>';
    }
    
    $('#pokemonGrid').html(html);
}

function searchPokemon() {
    const query = $('#searchInput').val().trim();
    if (!query) {
        alert('Por favor ingresa un nombre o ID de Pokémon');
        return;
    }
    
    showLoading();
    
    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: {
            action: 'search',
            name: query
        },
        dataType: 'json',
        success: function(response) {
            hideLoading();
            if (response.success) {
                showPokemonDetailModal(response.data);
            } else {
                alert('Pokémon no encontrado: ' + response.message);
            }
        },
        error: function(xhr, status, error) {
            hideLoading();
            alert('Error al buscar: ' + error);
        }
    });
}

function loadPokemons(offset) {
    currentOffset = offset;
    currentPage = Math.floor(offset / 20);
    
    showLoading();
    
    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: {
            action: 'list',
            offset: offset
        },
        dataType: 'json',
        success: function(response) {
            hideLoading();
            if (response.success) {
                displayPokemon(response.data);
                
                // Update pagination buttons
                $('#prevBtn').prop('disabled', offset === 0);
                $('#nextBtn').prop('disabled', !response.next);
                
                // Clear search input
                $('#searchInput').val('');
            }
        },
        error: function(xhr, status, error) {
            hideLoading();
            alert('Error al cargar Pokémons: ' + error);
        }
    });
}

function nextPage() {
    loadPokemons(currentOffset + 20);
}

function previousPage() {
    if (currentOffset >= 20) {
        loadPokemons(currentOffset - 20);
    }
}

function showPokemonDetail(pokemonName) {
    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: {
            action: 'search',
            name: pokemonName.toLowerCase()
        },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                showPokemonDetailModal(response.data);
            }
        }
    });
}

function showPokemonDetailModal(pokemon) {
    $('#modalTitle').text(pokemon.name);
    $('#modalId').text(`#${pokemon.id}`);
    $('#modalImage').attr('src', pokemon.image);
    $('#modalHeight').text(`${pokemon.height / 10} m`);
    $('#modalWeight').text(`${pokemon.weight / 10} kg`);
    
    // Types
    let typesHtml = pokemon.types.map(type => 
        `<span class="type-badge ${typeColors[type]}">${type}</span>`
    ).join('');
    $('#modalTypes').html(typesHtml);
    
    // Abilities
    let abilitiesHtml = pokemon.abilities.map(ability => 
        `<span class="badge bg-info">${ability}</span> `
    ).join('');
    $('#modalAbilities').html(abilitiesHtml);
    
    // Stats
    let statsHtml = pokemon.stats.map(stat => `
        <div class="stat-bar">
            <div class="stat-name">${stat.name}</div>
            <div class="stat-value">${stat.value}</div>
            <div class="progress" style="height: 8px;">
                <div class="progress-bar" style="width: ${(stat.value / 150) * 100}%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
            </div>
        </div>
    `).join('');
    $('#modalStats').html(statsHtml);
    
    // Show modal
    new bootstrap.Modal(document.getElementById('pokemonModal')).show();
}

// Load initial pokemons when page loads
$(document).ready(function() {
    loadPokemons(0);
    
    // Allow Enter key to search
    $('#searchInput').keypress(function(e) {
        if (e.which === 13) {
            searchPokemon();
            return false;
        }
    });
});
