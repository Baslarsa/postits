let colors = ["lightskyblue", "greenyellow", "fuchsia", "yellow"]
let container = document.querySelector(".container")
let sortBtn = document.querySelector("#sortBtn")
let postIt = document.querySelector(".postIt")
let addBtn = document.querySelector("#addBtn")
let deleteBtn = document.querySelector(".deleteIcon")
let selectedPost = null;



sortBtn.addEventListener("click", function(event){
    container.classList.toggle("list")
})

function renderColorPalette(element, colors){
    for (let color of colors){
        let colorDot = document.createElement("div")
        colorDot.style.backgroundColor = color
        colorDot.className = "colorDot"
        element.appendChild(colorDot)
        colorDot.addEventListener("click", function(event){
            element.parentNode.style.backgroundColor = color
            let colorDots = element.querySelectorAll(".colorDot")
            for (let dot of colorDots){
                dot.remove()
            }
        })
    }
}

function randomColor(){
    let rand = Math.random()
    let numberOfColors = colors.length
    let randomIndex = Math.floor(rand * numberOfColors)
    let randomColor = colors[randomIndex]
    return randomColor
}

function clonePostIt(value,color){
    let clone = postIt.cloneNode([true])
    clone.className = "clone"
    clone.style.backgroundColor = color
    clone.style.transform = "rotate" + "(" + randomAngle() + "deg" + ")"
    let textArea = document.createElement("textarea")
    textArea.className = "textArea"
    textArea.value = value
    clones.push(clone)
    container.appendChild(clone)
    clone.appendChild(textArea)
    clone.addEventListener("mouseenter", function(event){
        clone.querySelector(".deleteIcon").style.visibility = "visible"
        clone.querySelector(".colorIcon").style.visibility = "visible"
    })
    clone.addEventListener("mouseleave", function(event){
        clone.querySelector(".deleteIcon").style.visibility = "hidden"
        clone.querySelector(".colorIcon").style.visibility = "hidden"
    })
    clone.querySelector(".deleteIcon").addEventListener("click", function(event){
        clone.remove()
        saveData()
    })
    clone.querySelector(".colorIcon").addEventListener("click", function(event){
        let element = clone.querySelector(".colorPad")
        let dots = clone.querySelector(".colorDot")
        if (dots == undefined){
        renderColorPalette(element, colors)
        }
    })
    textArea.addEventListener("focusout", () => saveData())
}



function saveData(){
    let saveData = document.querySelectorAll('textarea');
    let tempArray = [];
    for(let data of saveData){
        tempArray.push(data.value)
    }
    saveData = tempArray
    saveData = JSON.stringify(saveData)
    localStorage.setItem("notes", saveData)
}

function loadData(){
    if(localStorage.notes != undefined){
    let loadData = localStorage.notes
    loadData = JSON.parse(loadData)
    console.log(loadData)
    for(data of loadData){
        clonePostIt(data,randomColor())
    }
    }
}


let clones = []



addBtn.addEventListener("click", function(event){
    clonePostIt("",randomColor())

})

function removeClone(clone){
    clone.remove()
}

function randomAngle(){
    let rand = Math.random()
    let positiveValue = Math.floor(rand * 3)
        if (positiveValue % 2 == 0){
            positiveValue = positiveValue * (-1)
    }   return positiveValue
}
loadData()
// // let list = [1,2,3,4]
// // let obj = {
// //     "a": 1,
// //     b: 3,
// //     1337: 0,

// //     myFunc: function(){
// //         console.log("omgomg")
// //     }
// // }
// // obj["a"]
// // obj[1337]
// // obj.b

// // function MyObject(){
// //     return {
// //         firstName: 'Olof',
// //         lastName: 'Olofsson',
// //         getFullName: function(){
// //             return this.firstName + " " + this.lastName
// //         }
// //     }
// // }

// class PostIt{
//     constructor(content){
//         let element = postIt.cloneNode(true)
//         element.classList.add("clone")
        
//         this.content = content,
//         this.color = colors[Math.floor(Math.random()*colors.length)],
//         this.element = element
//     }

//     showIcons(){
//         this.element.querySelector(".deleteIcon").style.visibility = "visible"
//     }
//     hideIcons(){
//         this.element.querySelector(".deleteIcon").style.visibility = "hidden"
//     }

//     render(){
//         this.element.querySelector(".content").innerText = this.content
//         this.element.style.backgroundColor = this.color

//     }
// }


// // function PostIt(content){
// //     let element = postIt.cloneNode(true)
// //     element.classList.add("clone")

    
// //     return {
// //         content,
// //         color: colors[Math.floor(Math.random()*colors.length)],
// //         element,
        
// //         showIcons(){
// //             this.element.querySelector(".deleteIcon").style.visibility = "visible"
// //         },
// //         hideIcons(){
// //             this.element.querySelector(".deleteIcon").style.visibility = "hidden"
// //         }
// //     }
// // }
// let postits = []
// for(let i = 0; i < 3; i++){
//     let temp = new PostIt("omgomgomg")
//     postits.push(temp)
//     container.append(temp.element)
//     temp.render()
//     temp.element.addEventListener("mouseenter", function() {
//         temp.showIcons()
//     })
//     temp.element.addEventListener("mouseleave", function() {
//         temp.hideIcons()
//     })
// }
// // console.log(postits)