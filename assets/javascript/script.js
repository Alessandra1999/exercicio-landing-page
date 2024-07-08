function enviar() {
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let texto = document.getElementById('texto').value;

    if (nome == '' || email == '' || texto == '') {
        alert("Você precisa preencher todos os campos!")
    } else {
        alert('Agradecemos o seu contato, responderemos em breve! 💞');
    }
}


const controls = document.querySelectorAll('.control');

let currentItem = 0;
const items = document.querySelectorAll('.item');
const maxItems = items.length;

controls.forEach(control => {
    control.addEventListener('click', () => {
        const isLeft = control.classList.contains('arrow-left');

        if (isLeft) {
            currentItem -= 1;
        } else {
            currentItem += 1;
        }

        if (currentItem >= maxItems) {
            currentItem = 0;
        }

        if (currentItem < 0) {
            currentItem = maxItems - 1;
        }

        items.forEach(item => item.classList.remove('current-item'));

        items[currentItem].scrollIntoView({
            inline: "center",
            behavior: "smooth",
        });

        items[currentItem].classList.add('current-item');
    });
});

