
const API_URL = "https://striveschool-api.herokuapp.com/api/"

const form = document.getElementById('user-form')
console.log(form);


const userIdInput = document.getElementById('user-id');
const nameInput = document.getElementById('name')
console.log(nameInput.value);
const descriptionInput = document.getElementById('description')
const brandInput = document.getElementById('brand')
const imageInput = document.getElementById('image')
const priceInput = document.getElementById('price')

let ON_EDITING = false

function onEditUser() {
  const qsParams = new URLSearchParams(window.location.search);
  const userId = qsParams.get('id')
  console.log(userId)
  ON_EDITING = !!userId
} 




    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const validation = handleFormValidation();
        if (!validation) return false;
    
        const product = {
            name: nameInput.value,
            description: descriptionInput.value,
            brand: brandInput.value,
            imageUrl: imageInput.value,
            price: priceInput.value
        }
    
        let response; 
        try {
            if (userIdInput.value) {
                response = await fetch(`${API_URL}product/${userIdInput.value}`, {
                    method: 'PUT',
                    body: JSON.stringify(product),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": 
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
                    }
                });
    
                if (response.ok) {
                    window.location.href = 'index.html';
                } else {
                    alert('Si è verificato un errore durante la modifica del prodotto.');
                }
            } else {
                response = await fetch(`${API_URL}product/`, {
                    method: 'POST',
                    body: JSON.stringify(product),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": 
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
                    }
                });
    
                if (response.ok) {
                    window.location.href = 'index.html';
                } else {
                    alert('Si è verificato un errore durante la creazione del prodotto.');
                }
            }
        } catch (error) {
            console.log('Errore durante la richiesta API:', error);
        }
    });
    






function handleFormValidation() {
    const validation = formValidation();
    let isValid = true;

    if (!validation.isValid) {

        for (const field in validation.errors) {
            const errorData = document.getElementById(`${field}-error`)
            errorData.textContent = '';
            errorData.textContent = validation.errors[field]
        }

        isValid = false
    }

    return isValid

}


function formValidation() {
    const errors = {}

    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const brand = document.getElementById('brand').value
    const image = document.getElementById('image').value
    const price = document.getElementById('price').value


    if (!name) errors.name = 'Il campo nome è oblligatorio'
    else errors.name = "";

    if (!description) errors.description = 'Il campo descrizione è oblligatorio'
    else errors.description = "";

    if (!brand) errors.brand = 'Il campo brand è oblligatorio'
    else errors.brand = "";

    if (!image) errors.image = 'Il campo image è oblligatorio'
    else errors.image = "";

    if (!price) errors.price = 'Il campo prezzo è oblligatorio'
    else errors.price = "";

    return {
        isValid: Object.values(errors).every(value => value === ''),
        errors
    }
}

function backToHome() {
    window.location.href = 'index.html';
}

function buildTitle(userId) {
    const pageTitle = document.getElementById('title-change');
    pageTitle.innerHTML = userId ? 'Modifica utente' : 'Crea nuovo utente';
}

async function getProductData() {
    const qsParams = new URLSearchParams(window.location.search);
    const userId = qsParams.get('id')

    buildTitle(userId)

    if(userId) {
        try {
            const response = await fetch(`${API_URL}product/${userId}`, {
                method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
            }
        })
            const user = await response.json(); 

            console.log(user);
            
            
            if (!('name' in user)) {
              console.log('L\'utente non esiste');
              return
            }
        
            userIdInput.value = user._id;
            nameInput.value = user.name;
            descriptionInput.value = user.description;
            brandInput.value = user.brand;
            imageInput.value = user.imageUrl;
            priceInput.value = user.price;
            
          } catch (error) {
            console.log('Errore nel recupero degli utenti: ', error);
          }
    }



}
getProductData()