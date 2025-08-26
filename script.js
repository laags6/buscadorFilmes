// 1. PEGAR OS ELEMENTOS DO HTML
const pesquisador = document.getElementById('pesquisador');
const formulario = document.querySelector('form');
const filmeTitulo = document.getElementById('filmTitulo');
const avaliacao = document.getElementById('avaliacao');
const descricao = document.getElementById('descricao');
const poster = document.getElementById('poster');

// 2. SUA CHAVE DA API
const apikey = '2e7a9eca';

// 3. QUANDO CLICAR NO BOTÃO OU DAR ENTER
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Não recarrega a página
    
    const nomeFilme = pesquisador.value;// Pega o que o usuário digitou

    // Primeiro: busca o filme
    const url = `https://www.omdbapi.com/?t=${nomeFilme}&apikey=${apikey}`;
    
    // Mostra que está carregando
    filmeTitulo.textContent = 'Buscando...';
    descricao.textContent = '';
    poster.src = '';
    avaliacao.textContent = '';
    
    if (nomeFilme == "") { 
        filmeTitulo.textContent = 'Favor digitar um nome válido.';
        descricao.textContent = '';
        poster.src = '';
        avaliacao.textContent = '';
    } else {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                // Encontrou o filme! Vamos mostrar na tela
                filmeTitulo.textContent = data.Title;
                avaliacao.textContent = `IMDB: ${data.imdbRating}/10`;
                descricao.textContent = data.Plot;
                poster.src = data.Poster;
            } else {
                // Não encontrou
                filmeTitulo.textContent = 'Filme não encontrado';
                avaliacao.textContent = '';
                descricao.textContent = 'Tente buscar outro nome e em inglês.';
                poster.src = '';
            }
        });
    };
    
});

console.log('Buscador carregado!');