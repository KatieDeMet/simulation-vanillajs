// const { default: axios } = require("axios");

const form = document.querySelector('form')
const expenses = document.getElementById("expenses");
const budgetTotalBox = document.getElementById("budgetTotal");
const baseURL = "http://localhost:7777/api/users";
let id = 0;

const displayCallback = (res) => {
  expenses.innerHTML = ``
  budgetTotalBox.innerHTML = `Budget Total: $`
  let billTotal = 0
  let billsArr = res.data
  for(let i = 0; i < billsArr.length; i++) {
    const listItem = document.createElement("tr")
    const nameElement = document.createElement("td")
    const amountElement = document.createElement("td")
    const imgElement = document.createElement("td")
    const trashIcon = document.createElement("img")

    nameElement.innerHTML = billsArr[i].name
    amountElement.innerHTML = +billsArr[i].amount
    trashIcon.setAttribute("src", "assets/trash_can.svg")
    trashIcon.classList.add("trashIcon")
    trashIcon.id = +billsArr[i].id
    trashIcon.addEventListener("click", removeItem)
    listItem.classList.add("listItem")

    imgElement.appendChild(trashIcon)
    listItem.appendChild(nameElement)
    listItem.appendChild(amountElement)
    listItem.appendChild(imgElement)
    expenses.appendChild(listItem)

    billTotal += parseInt(billsArr[i].amount)
        
  }
  budgetTotalBox.innerHTML = `Budget Total: $${billTotal}`
}

function addBill(e) {
  e.preventDefault()

  const billName = document.getElementById('name')
  const billAmountField = document.getElementById('amount')
  const billAmount = parseInt(billAmountField.value)

  if(isNaN(billAmount) || billAmount == undefined) {
    alert("Please enter a valid number")
    billAmountField.value = ``
  } else {
      
    let billObj = {
      id: id,
      name: billName.value,
      amount: billAmount
    }

    id++

    axios.post(baseURL, billObj)
      .then(displayCallback)
     .catch(err => console.log(err))
  
    billName.value = ''
    amount.value = ''
  } 
}

let removeItem = (e) => {
  let imgID = +e.target.id
  axios.delete(`${baseURL}/${imgID}`)
    .then(displayCallback)
    .catch(err => console.log(err))
}

form.addEventListener('submit', addBill);