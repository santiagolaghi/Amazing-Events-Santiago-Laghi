const containerDetails = document.getElementById('containerDetails');
const details = location.search;
const eventUrl = new URLSearchParams(details);
const eventName = eventUrl.get('name');

fetch('https://mindhub-xj03.onrender.com/api/amazing')  
  .then(response => response.json())
  .then(data => {
    const event = data.events.find(event => event.name === eventName);
    console.log(event)
    containerDetails.innerHTML =
      `<div class="card mb-3">
        <div class="detailsdiv d-flex flex-row">
          <div>
            <img src="${event.image}" class="img-fluid rounded-start object-fit-cover" alt="${event.name}">
          </div>
          <div class="col-sm-6">
            <div class="card-body">
              <h3 class="card-title text-center">${event.name}</h3>
              <p class="fs-5 card-text">${event.description}</p>
              <p class="fs-5 card-text">Date: ${event.date}</p>
              <p class="fs-5 card-text">Place: ${event.place}</p>
              <p class="fs-5 card-text">Capacity: ${event.capacity}</p>
              <p class="fs-5 card-text">Assistance: ${(event.estimate) ? "Estimate: " + event.estimate : "Assistance: " + event.assistance}</p>
              <p class="fs-5 card-text">Price: ${event.price}</p>
            </div>
          </div>
        </div>
      </div>`;
  })
  .catch(error => {
    containerDetails.innerHTML = '<p>Error fetching event details.</p>';
  });
