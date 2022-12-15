const template = document.querySelector(".place-here") 
const searchInput = document.getElementById("search")
const cardTemplate = document.querySelector("[data-template]")

const cardImg = document.querySelector(".card img")
const cardTitle = document.querySelector(".card-body h5")
const cardDescription =document.querySelector(".card-text")
const cardPrice = document.querySelector(".price-span")

let hotels = []

const form = document.getElementById("add-form")




document.addEventListener("DOMContentLoaded", () =>{

 

   fetchData().then((data)=> {
    hotels = data.record.map((element) => {
        const card = cardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector(".header")
        const body = card.querySelector(".body")
        header.textContent = element.title
        body.textContent = element.city

        
        card.addEventListener("click", (e) => {
            cardImg.src = element.image
            cardTitle.textContent = element.title
            cardDescription.textContent = element.description
            cardPrice.textContent =element.price



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
    
    fetch(" http://localhost:3000/hotels", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({

            "title": nameInput,
            "city" : cityInput,
            "price": priceInput,
            "description": descriptionInput,
            "image": urlInput 
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

