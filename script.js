document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formCadastro');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const lista = document.getElementById('listaUsuarios');
    const pesquisa = document.getElementById('pesquisa');
    const btnLimpar = document.getElementById('limparCampos');
    const btnExcluirTodos = document.getElementById('excluirTodos');

    function salvarLista(dados) {
        localStorage.setItem('usuarios', JSON.stringify(dados));
    }

    function carregarLista() {
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    function renderizarLista(dados) {
        lista.innerHTML = '';
        dados.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${usuario.data} - ${usuario.nome} (${usuario.email})
                <button onclick="excluir(${index})">Excluir</button>`;
            lista.appendChild(li);
        });
    }

    window.excluir = function(index) {
        const usuarios = carregarLista();
        usuarios.splice(index, 1);
        salvarLista(usuarios);
        renderizarLista(usuarios);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const data = new Date().toLocaleString();

        const usuarios = carregarLista();
        usuarios.push({ nome, email, data });
        salvarLista(usuarios);
        renderizarLista(usuarios);

        form.reset();
    });

    btnLimpar.addEventListener('click', () => {
        form.reset();
    });

    btnExcluirTodos.addEventListener('click', () => {
        localStorage.removeItem('usuarios');
        renderizarLista([]);
    });

    pesquisa.addEventListener('input', () => {
        const termo = pesquisa.value.toLowerCase();
        const usuarios = carregarLista();
        const filtrados = usuarios.filter(u =>
            u.nome.toLowerCase().includes(termo) || u.email.toLowerCase().includes(termo)
        );
        renderizarLista(filtrados);
    });

    renderizarLista(carregarLista());
});
