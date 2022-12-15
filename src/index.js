const template = document.querySelector(".place-here") 


document.addEventListener("DOMContentLoaded", () =>{

    fetchData().then((data) => { 
        data.record.forEach(element => {
            createTemplate(element)
        });
    }) 



})


function fetchData(){
return fetch("https://api.jsonbin.io/v3/b/6399fda8dfc68e59d5681ece")
.then(res => res.json())
.then(data => data)
}

function createTemplate(destinations) {
    let hotelCard = document.createElement("div")
    let cardHeader = document.createElement("div")
    let cardBody = document.createElement("div")

    hotelCard.className = "hotel-card"
    cardHeader.className = "header"
    cardBody.className = "body"

    cardHeader.textContent = destinations.title
    cardBody.textContent = destinations.price

    
    hotelCard.appendChild(cardHeader)
    hotelCard.appendChild(cardBody)
    template.appendChild(hotelCard)
}
