const template = document.querySelector(".place-here") 
const searchInput = document.getElementById("search")
const cardTemplate = document.querySelector("[data-template]")

const cardImg = document.querySelector(".card img")
const cardTitle = document.querySelector(".card-body h5")
const cardDescription =document.querySelector(".card-text")
const cardPrice = document.querySelector(".price-span")
const cardSpots = document.querySelector(".spots-span")
const h4 = document.querySelector("h4 span")

//Initialize an array to store fetched data
let hotels = []

const form = document.getElementById("add-form")
const btn = document.querySelector(".btn2")

let id
let leftSpots=0
let spots = 0


document.addEventListener("DOMContentLoaded", () =>{

    //creating the card template
   fetchData().then((data)=> {
    hotels = data.map((element) => {
        const card = cardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector(".header")
        const body = card.querySelector(".body span")
        header.textContent = element.title
        body.textContent = element.city
        
    //addEVent LIstener to the card
        card.addEventListener("click", (e) => {
            cardImg.src = element.image
            cardTitle.textContent = element.title
            cardDescription.textContent = element.description
            cardPrice.textContent =element.price
            h4.textContent = element.city 
            cardSpots.textContent = element["total-spots"] - element["spots-filled"]
            id = element.id
            btn.disabled = false
            btn.textContent = 'Book Spot'
        })
        template.appendChild(card)
        return {destination: element.title, city: element.city, cardElement: card }
        
    })
   })
    
   //searchbar event Listener
   searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value
    console.log(hotels)
    hotels.forEach((hotel) => {
        const displayHotel = hotel.destination.includes(searchValue) || hotel.city.includes(searchValue)
        hotel.cardElement.classList.toggle("hide", !displayHotel)
    }) 
    
   })

   //form Event Listener
   form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log()
    const nameInput = e.target["input-name"].value
    const cityInput = e.target["input-city"].value
    const priceInput = e.target["input-price"].value
    const descriptionInput = e.target["input-description"].value
    const urlInput = e.target["input-url"].value
    const capacityInput = e.target["input-capacity"].value
    

    //POST Method
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
   
   //Btn functionality
   btn.addEventListener("click", (e) => {
    fetchSpecificObject(id).then(data =>{
        if(data["total-spots"] === data["spots-filled"]) {
            btn.textContent = "BOOKED OUT"
            btn.disabled = true
            cardSpots.textContent = 0
        } else{
            leftSpots = data["spots-filled"] + 1
            fetch(`http://localhost:3000/hotels/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                    },
                body: JSON.stringify({
                    "spots-filled": leftSpots
                    })
                })
                cardSpots.textContent = data["total-spots"] - data["spots-filled"]
        }

    })
   
   })

})

//get data from server
function fetchData(){
return fetch(" http://localhost:3000/hotels")
.then(res => res.json())
.then(data => data)
}

//fetching specific data from the server
function fetchSpecificObject(id){
    return fetch(`http://localhost:3000/hotels/${id}`)
    .then(res => res.json())
    .then(data => data)
    }


