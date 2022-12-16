const template = document.querySelector(".place-here") 
const searchInput = document.getElementById("search")
const cardTemplate = document.querySelector("[data-template]")

const cardImg = document.querySelector(".card img")
const cardTitle = document.querySelector(".card-body h5")
const cardDescription =document.querySelector(".card-text")
const cardPrice = document.querySelector(".price-span")

let hotels = []

const form = document.getElementById("add-form")
const btn = document.querySelector(".btn2")

let id
let totalSpots
let spots = 0



document.addEventListener("DOMContentLoaded", () =>{

   fetchData().then((data)=> {
    hotels = data.map((element) => {
        const card = cardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector(".header span")
        const body = card.querySelector(".body")
        header.textContent = element.title
        body.textContent = element.city
        
        card.addEventListener("click", (e) => {
            cardImg.src = element.image
            cardTitle.textContent = element.title
            cardDescription.textContent = element.description
            cardPrice.textContent =element.price
            id = element.id
        })
        template.appendChild(card)
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

   form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log()
    const nameInput = e.target["input-name"].value
    const cityInput = e.target["input-city"].value
    const priceInput = e.target["input-price"].value
    const descriptionInput = e.target["input-description"].value
    const urlInput = e.target["input-url"].value
    const capacityInput = e.target["input-capacity"].value
    
    fetch(" http://localhost:3000/hotels", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({

            "title": nameInput,
            "city" : cityInput,
            "total-spots": capacityInput,
            "spots-filled": 0,
            "price": priceInput,
            "description": descriptionInput,
            "image": urlInput 
        })
    })
    form.reset()
   })
   
   btn.addEventListener("click", (e) => {
        fetchData().then(data =>{
            data
        })

    fetch(`http://localhost:3000/hotels/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                    },
                body: JSON.stringify({
                    "spots-filled": totalSpots
                    })
                })


   })

   



})



//get data from server
function fetchData(){
return fetch(" http://localhost:3000/hotels")
.then(res => res.json())
.then(data => data)
}


