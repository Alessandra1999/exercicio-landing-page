document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
})

function loadContent(tabId) {

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const tab = document.getElementById(tabId);
    tab.classList.add('active');

    fetch(`${tabId}.html`)
        .then(response => response.text())
        .then(data => {
            tab.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo da página:', error);
            tab.innerHTML = 'Erro ao carregar o conteúdo.';
        })
}


class Review {
    constructor(nome, produto, comentario) {
        this.nome = nome;
        this.produto = produto;
        this.comentario = comentario;
    }

    validateData() {
        for (let i in this) {
            if(this[i] === undefined || this[i] === "") {
                return false;
            }
        }
        return true;
    }
}

class Database {
    constructor() {
        const id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    loadReviews() {
        const reviews = Array();

        const id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            const review = JSON.parse(localStorage.getItem(i));

            if (review === null) {
                continue;
            }

            review.id = i;
            reviews.push(review);
        }

        return reviews;
    }

    createReview(review) {
        const id = getNextId();
        localStorage.setItem(id, JSON.stringify(review));
        localStorage.setItem('id', id);
    }

    removeReview(id) {
        localStorage.removeItem(id);
    }
}

const database = new Database();

function getNextId() {
    const nextId = localStorage.getItem('id');
    return parseInt(nextId) + 1;
}

function registerReview() {
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const comentario = document.getElementById('comentario').value;

    const review = new Review(nome, produto, comentario);

    if (review.validateData()) {
        database.createReview(review);
    }
}

function loadReviews(reviews) {
    if (reviews === undefined) {
        reviews = database.loadReviews();
    }

    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';

    reviews.forEach((r) => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('.col-4');
        reviewCard.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${r.nome}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${r.produto}</h6>
                            <p class="card-text">${r.comentario}</p>
                        </div>
                    </div>
                    `;

                    const btnDelete = document.createElement('button');

                    btnDelete.className = 'btn btn-danger';
                    btnDelete.id = r.id;
                    btnDelete.innerHTML = 'Excluir';
                    btnDelete.onclick = () => {
                        const id = r.id;
                        database.removeReview(id);
                        window.location.reload();
                    }
                    
                    reviewCard.appendChild(btnDelete);
        reviewsContainer.appendChild(reviewCard);
    });
}
