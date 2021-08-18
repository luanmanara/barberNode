window.onload = () => {
    const telefoneCliente = document.getElementById('clienteTelefone');

    if (telefoneCliente) {
        telefoneCliente.addEventListener('keypress', (e) => mascaraTelefone(e.target.value));
        telefoneCliente.addEventListener('change', (e) => mascaraTelefone(e.target.value));

        const mascaraTelefone = (valor) => {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
            telefoneCliente.value = valor;
        }
    }
}