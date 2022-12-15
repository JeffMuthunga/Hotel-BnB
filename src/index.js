const template = document.querySelector(".place-here") 
const searchInput = document.getElementById("search")
const cardTemplate = document.querySelector("[data-template]")


let hotels = []


document.addEventListener("DOMContentLoaded", () =>{

 

   fetchData().then((data)=> {
    hotels = data.record.map((element) => {
        const card = cardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector(".header")
        const body = card.querySelector(".body")
        header.textContent = element.title
        body.textContent = element.city

        template.appendChild(card)
        card.addEventListener("click", (e) => {
            console.log(e)

        })
        return {destination: element.title, city: element.city, cardElement: card }
        
    })
   
   })
    
   searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value
    console.log(hotels)
    hotels.forEach((hotel) => {
        const displayHotel = hotel.destination.includes(searchValue) || hotel.city.includes(searchValue)
        hotel.cardElement.classList.toggle("hide", !displayHotel)
    }) 
    
   })


})

//get data from server
function fetchData(){
return fetch("https://api.jsonbin.io/v3/b/6399fda8dfc68e59d5681ece")
.then(res => res.json())
.then(data => data)
}

//creating the template
// const createTemplate = (destinations) => {
//     let hotelCard = document.createElement("div")
//     let cardHeader = document.createElement("div")
//     let cardBody = document.createElement("div")

//     hotelCard.className = "hotel-card"
//     cardHeader.className = "header"
//     cardBody.className = "body"

//     cardHeader.textContent = destinations.title
//     cardBody.textContent = destinations.price

    
//     hotelCard.appendChild(cardHeader)
//     hotelCard.appendChild(cardBody)
//     template.appendChild(hotelCard)
//     return { destination: destinations.city, title: destinations.title, cardElement: hotelCard }
// }

// // display the data in templates
// function displayData() {
//     fetchData().then((data) => { 
//         hotels = data.record.map(element => {
//             return createTemplate(element)
            
//         });
//     }) 
// }
