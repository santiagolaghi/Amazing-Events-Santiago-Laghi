const containerDetails = document.getElementById('containerDetails')
const details = location.search
const eventUrl = new URLSearchParams(details)
const eventName = eventUrl.get('name')
function mostrarDetalles() {
  const event = data.events.find(event => event.name === eventName)
  containerDetails.innerHTML = 
  `<div class="card mb-3">
  <div class="detailsdiv d-flex flex-row">
    <div>
      <img src=${event.image}" class="img-fluid rounded-start h-100" alt="museum_filled_with_people">
    </div>
    <div class="col-sm-6">
      <div class="card-body">
        <h3 class="card-title text-center">${event.name}</h3>
        <p class="fs-5 card-text">${event.description}</p>
        <p class="fs-5 card-text">Date: ${event.date}</p>
        <p class="fs-5 card-text">Place: ${event.place}</p>
        <p class="fs-5 card-text">Capacity: ${event.capacity}</p>
        <p class="fs-5 card-text">Assistance: ${event.assistance}</p>
        <p class="fs-5 card-text">Price: ${event.price}</p>
      </div>
    </div>
  </div>
</div>`

}
mostrarDetalles()