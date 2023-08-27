const API_URL = "https://striveschool-api.herokuapp.com/api/"


async function fetchProducts() {
  try {

    


    const response = await fetch(`${API_URL}product/`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
      }
    });

    const data = await response.json();
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
    console.log(userId)

    const row = `
    <div class="card  my-3 " >
      <img src="${immagine}" class="img-fluid">
      <div class="card-body">
        <h5 class="card-title">${nome}</h5>
        <p class="card-text">${descrizione}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${marca}</li>
        <li class="list-group-item">${prezzo}</li>
        <li class="list-group-item">${userId}</li>
      </ul>
      <button class="btn btn-primary my-1" onclick="editUser('${userId}')">Modifica </button>
      <button class="btn btn-primary" onclick="deleteUser('${userId}')">Cancella </button> 
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
  window.location.href = `user-page.html?id=${userId}`
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
  }, 3000)
}
showAlert()






// async function fetchUsers() {

//   try {
//     const response = await fetch(`${API_URL}product/`, {
//       headers: {
//         "Authorization":
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
//       }
//     });


//     const data = await response.json();
//     console.log(data);

//     // AGGIUNGERE UTENTI ALLA TABELLA
    

//   } catch (error) {
//     console.log('Errore nel recupero degli utenti: ', error);
//   }
// }
// fetchUsers()



// function display(product) {

//   const rowProducts = document.getElementById('box-products');
//   console.log(rowProducts);
//   rowProducts.innerHTML = ''

  

//   product.forEach(elemento => { 

//     const nome  = decodeURIComponent(elemento.name)
//     const descrizione = decodeURIComponent(elemento.description)
//     const marca = decodeURIComponent(elemento.brand)
//     const immagine = decodeURIComponent(elemento.imageUrl)
//     const prezzo = decodeURIComponent(elemento.price)
//     const id = decodeURIComponent(elemento._id)

//     const row = `
//     <div class="card" style="width: 18rem;">
//     <img src=" ${immagine} " class= alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${nome} </h5>
//       <p class="card-text">${descrizione}</p>
//     </divproducts
//     <ul class="list-group list-group-flush">
//       <li class="list-group-item">${marca}</li>
//       <li class="list-group-item">${prezzo}</li>
//     </ul>
//     `

//     rowProducts.innerHTML += row
    
//   });

  

// }

// display(product)
