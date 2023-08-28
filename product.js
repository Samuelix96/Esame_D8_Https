const Url = "https://striveschool-api.herokuapp.com/api/"

const container = document.getElementById('product-details');

const params = new URLSearchParams(location.search)
const id = params.get("id")


async function fetchOneProduct(id) {
    try {

    
    
        const response = await fetch(`${Url}product/${id}`, {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVhMWUyODUxNWY0MTAwMTQ2OTc5OTQiLCJpYXQiOjE2OTMwNjQ3NDQsImV4cCI6MTY5NDI3NDM0NH0.unfgWsztbeHWcIAUbPP1iGJTDyExsF4OTodeIhTla5g"
          }
        });
    
        const data = await response.json();
        
        setTimeout( () => {
          document.querySelector('.spinner-container').classList.add('d-none');
          printFormProduct(data)
        }, 800)
        
        return data; 
    
        
      } catch (error) {
        throw new Error('Errore nel recupero dei prodotti: ' + error);
      }
}


const printFormProduct = (product) => {

    const nome = decodeURIComponent(product.name)
    const descrizione = decodeURIComponent(product.description)
    const brand = decodeURIComponent(product.brand)
    const immagine = decodeURIComponent(product.imageUrl)
    const prezzo = decodeURIComponent(product.price)
    const id = decodeURIComponent(product._id)

    container.innerHTML = `
    <div class="row g-0" id="basket">
    <div class="col-md-4">
        <img src="${immagine}"  alt="...">


        <div class="glow"></div>
    </div>
    
</div>
<div class="card-body">
    <h1 class="card-title">${brand} - ${nome}</h1>
    <p class="card-text price-text"><small class="text-body-light"><span class="price-text">Prezzo:</span> ${prezzo} €</small></p>
    <p class="description-title">Descrizione</p>
    <p class="card-text">${descrizione}</p>
    <p class="card-text">ID:${id}</p>
    

    </div>
        `
};




fetchOneProduct(id)