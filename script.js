'use strict'

const calculator          =   document.getElementsByClassName('calculator')[0]
const heading             =   document.getElementsByClassName('heading')[0]
const attribution         =   document.getElementsByClassName('attribution')[0]

const buttons             =   [...document.getElementsByClassName('left__button')]
const billAmount          =   document.getElementsByClassName('left__bill_input')[0]
const totalPeoples        =   document.getElementsByClassName('left__total_peoples_input')[0]
const custom_button       =   document.getElementsByClassName('left__button_custom')[0]
const custom_input        =   document.getElementsByClassName('left__custom_input')[0]
const message             =   [...document.getElementsByClassName('left__message')]
const right__tip_amount   =   document.querySelector('.right__tip_amount h1')
const right__total_amount =   document.querySelector('.right_total_amount h1')


// For animation.

 const  Animation = [calculator,heading,attribution]
 Animation.forEach((element)=>{
     element.style.transform = 'translateY(0)'
     element.style.opacity = '1'

 })

buttons.forEach(ele => {

    // Adding click event to all buttons.

    ele.addEventListener('click',(e)=>{
        if(ele.innerHTML == 'Custom'){
            return
        }
        const next = check()
        if(next){
            
            removeSecondaryClass()
            ele.classList.add('left__button--secondary')

            const percentage = ele.innerHTML.substr(0,ele.innerHTML.length-1)  // Getting inner values of buttons without percentage symbol.
        
            calculate(percentage)
        }
    })
});

//Removing secondary class from all buttons.


function removeSecondaryClass() {
    buttons.forEach((e)=>{
        e.classList.remove('left__button--secondary')
    })
}

// Changing custom button to input to take custom perceatage.


custom_button.onclick = (e)=>{
    custom_button.style.display = 'none'
    custom_input.style.display = 'block'
}

// For changing custom Input again to button.


function changeInputToButton() {
    custom_button.style.display = 'flex'
    custom_input.style.display = 'none'
}

//Calculating percentage of custom input on enter click.


window.onkeydown = (e)=>{
    if (e.keyCode == 13) {
         check()

        
        if ((custom_input.value !='' || custom_input.value != 0)  ) {
            removeSecondaryClass()
            calculate(custom_input.value)
        }
    }
}

// For validating inputs.


function check (ele) {
    message.forEach((E)=>{
        setTimeout(() => {
            E.innerHTML= ""
        }, 4000);
    })

    if((totalPeoples.value == '' || totalPeoples.value == 0)   ){
            message[1].innerHTML= "can't be zero"
            return false
        }
        
        if(billAmount.value =='' || billAmount.value == 0){
            message[0].innerHTML = "can't be zero"
            return false
        }
        
        
    return true

}

// For setting all values to DOM.


function setToPage(per_person,total) {
    right__tip_amount.innerHTML = "$"+per_person 
    right__total_amount.innerHTML = "$"+total  
}

// For calculaing percentage.

function calculate(percentage) {
    let tip_per_person = (billAmount.value/100) * parseInt(percentage)  // calculating percentage per person.

    tip_per_person = (Math.round(tip_per_person * 100) / 100).toFixed(2) // Only taking 2 digits after decimal.

    const total_tip = tip_per_person * totalPeoples.value // Calculating total tip.

    const tip = (Math.round(total_tip * 100) / 100).toFixed(2) // Onlyu taking 2 digits after decimal.

    setToPage(tip_per_person,tip) 
}

//  For reset button.


const reset = () => {
    right__tip_amount.innerHTML = '$'+'0.00' 
    right__total_amount.innerHTML = '$'+'0.00'  
    changeInputToButton()
    removeSecondaryClass()
    totalPeoples.value = ''
    billAmount.value = ''


}