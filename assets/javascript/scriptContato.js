document.getElementById('abrirModal').addEventListener('click', function() {
    const form = document.getElementById('formulario');

    if (form.checkValidity()) {
        $('#meuModal').modal('show');
    } else {
        form.reportValidity();
    }
}) 