const API_URL = "https://striveschool-api.herokuapp.com/api/"


async function fetchProducts() {
  try {

    handleAlertMessage()

    const response = await fetch(`${API_URL}product/`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
      }
    });

    const data = await response.json();

    setTimeout( () => {
      document.querySelector('.spinner-container').classList.add('d-none');
      displayProducts(data);
    }, 800)
    
    return data; 

    
  } catch (error) {
    throw new Error('Errore nel recupero dei prodotti: ' + error);
  }
}



function displayProducts(product) {
  const rowProducts = document.getElementById('box-products');
  rowProducts.innerHTML = '';

  product.forEach(elemento => { 
    const nome  = decodeURIComponent(elemento.name);
    const descrizione = decodeURIComponent(elemento.description);
    const marca = decodeURIComponent(elemento.brand);
    const immagine = decodeURIComponent(elemento.imageUrl);
    const prezzo = decodeURIComponent(elemento.price);
    const userId = decodeURIComponent(elemento._id);
    

    const row = `
    <div class="card  my-3 " >
      <img src="${immagine}" class="img-fluid">
      <div class="card-body">
        <h3 class="card-title">${nome}</h3>
        <p class="card-text">${descrizione}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${marca}</li>
        <li class="list-group-item">${prezzo} €</li>
        <li class="list-group-item d-none">${userId}</li>
      </ul>
      <button class="btn btn-success my-1" onclick="editUser('${userId}')">Modifica </button>
      <button class="btn btn-danger" onclick="deleteUser('${userId}')">Cancella </button> 
    </div>`;

    rowProducts.innerHTML += row;
  });
}



async function fetchAndDisplayProducts() {
  try {
    const products = await fetchProducts();
    displayProducts(products);
  } catch (error) {
    console.log(error);
  }
}

fetchAndDisplayProducts();


function Addmanga() {
  window.location.href = 'user-page.html';
}




async function deleteUser(userId) {

  if (confirm('Sei sicuro di voler eliminare questo utente?')) {
    try {
      await fetch(`${API_URL}product/${userId}`, { method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
    }
  })
      window.location.href = 'index.html?status=cancel-ok';
    } catch (error) {
      console.log('Errore nel\'eleminazione dell\'utente: ', error);
    }
  }
  
}


  function editUser(userId) {
    
    const updatedUrl = `user-page.html?id=${userId}&status=edit-ok`;
  
    window.location.replace(updatedUrl);
  }
  

function showAlert(actionType) {
  const alertCnt = document.getElementById('alert-container');
  alertCnt.classList.remove('d-none');
  alertCnt.innerHTML = actionType === 'create'
    ? 'Utente creato con successo'
    : actionType === 'update'
      ? 'Utente modificato con successo'
      : 'Utente eliminato con successo'

  setTimeout( () => {
    alertCnt.classList.add('d-none');
  }, 2000)

  
}


function handleAlertMessage() {

  const qsParams = new URLSearchParams(window.location.search);
  const status = qsParams.get('status')

  if (status && status === 'create-ok') showAlert('create');
  if (status && status === 'edit-ok') showAlert('update');
  if (status && status === 'cancel-ok') showAlert('cancel');

  clearQueryString()
}

function clearQueryString() {
  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, '', url.toString());
}



fetchProducts()







