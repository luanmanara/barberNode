window.onload = () => {
    const telefoneCliente = document.getElementById('clienteTelefone');
    const diasEl = document.getElementById('dias');

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

    if(diasEl){
        diasEl.addEventListener('click', (e) => {
            let dia;
           if(e.target.parentElement.classList.contains('cursor-pointer') || e.target.classList.contains('cursor-pointer')){
                if(e.target.nodeName == 'SPAN') {
                    dia = e.target.id;
                }else {
                    dia = e.target.childNodes[1].id;
                }
                location.href = '/agendamentos/calendario/' + dia;
            }
        });
    }

}