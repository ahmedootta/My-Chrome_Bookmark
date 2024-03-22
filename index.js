const inputEl = document.getElementById("input")
const ulEl = document.getElementById("list")
const saveBtn = document.getElementById("ff")
const clearBtn = document.getElementById("cc")
const deleteBtn = document.getElementById("dd")
const tabBtn = document.getElementById("tt")


let leads = []
let localLeads = JSON.parse(localStorage.getItem("leads"))
if (localLeads){
   leads = localLeads
   render(leads)
}
// variable to allow save-btn work..
s = true

// clear function...
clearBtn.addEventListener("click", function (){
   s = true
   inputEl.value = ""
})

// save function
saveBtn.addEventListener("click", function(){
   for (var i in leads){
      if (inputEl.value == leads[i]){
         inputEl.value = "This Lead Already Saved!"
         s =false

      }else if (!inputEl.value){
         inputEl.value = "Please Enter Your Lead!"
         s =false
      }
   }
   if(s){
      leads.push(inputEl.value)
      localStorage.setItem("leads", JSON.stringify(leads))
      inputEl.value = ""
      render(leads)
   }
})

//save current tab..
tabBtn.addEventListener("click", function(){
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      leads.push(tabs[0].url)
      localStorage.setItem("leads", JSON.stringify(leads))
      console.log(tabs[0].url)
      render(leads)
    })

})

// delete function..
deleteBtn.addEventListener("click", function (){
   leads = []
   render(leads)
   localStorage.clear()
   s = true
})


function render(leads){
   let list_text = ""
   for(let i = 0; i < leads.length; i++){
      list_text += `<li> <a href="${leads[i]}" target="_blank"> ${leads[i]} </a></li>`
   }
      ulEl.innerHTML = list_text
}

