
/*
Declarimg variables
*/

let body = document.querySelector('html');
let header = document.querySelector("header");
let workTab = document.querySelector("a.work");
let contactTab = document.querySelector("a.contact");

let videoBox = document.querySelector(".videoBox");
    let playerBox = videoBox.querySelector("video");
    let playerInfo = videoBox.querySelector(".playerInfo");
        let playerItemTitle = playerInfo.querySelector(".playerItemTitle");
        let playerDescription = playerInfo.querySelector(".playerDescription");
    let close = document.querySelector(".close span");

let CV = document.querySelector(".workContent");
    let items = document.querySelectorAll(".item");
        let itemVideo = document.querySelectorAll(".item video");
        let itemInfo = document.querySelectorAll(".item .info");
            let itemTitle = Array.from(document.querySelectorAll(".item .info .itemTitle"));
            let itemDescription = Array.from(document.querySelectorAll(".item .info .description"));

let contactBox = document.querySelector(".contactMain");

let footer = document.querySelector("footer");


/*
End pf variable declaration
*/


/*
Functionalities
*/



//To avoid initial scrolling when reload
window.onload = function() {
    window.scrollTo({
        top: -300,
        left: 0,
        behavior: 'auto'
    });
}



//event listener when the pointer enters each video
for(i=0;i<itemVideo.length;i++) {
    itemVideo[i].addEventListener('pointerenter', 
    (evt) =>{
        let myItem = evt.target.closest('div');
        myItem.querySelector('video').play();
        myItem.classList.add("activeItem");
        myItem.classList.remove("inactiveItem");
    })
}

//event listener when th pointer leaves each video
for(i=0;i<items.length;i++) {
    items[i].addEventListener('pointerleave', 
    (evt) =>{
        let myItem = evt.target;
        myItem.querySelector('video').pause();
        myItem.querySelector('video').currentTime = 2;
        myItem.classList.add("inactiveItem");
        myItem.classList.remove("activeItem");
    })
}




//Switching to work Tab
workTab.addEventListener('click',
    (evt) => {
        let myTab = evt.target.closest('a');
        if(! (Array.from(myTab.classList).find(i => i == 'active') ) ) {
            myTab.classList.add('active');
            myTab.classList.remove('inactive');
            
            contactTab.classList.remove('active');
            contactTab.classList.add('inactive');


            CV.classList.remove('inactiveContent');
            CV.classList.add('activeContent');

            contactBox.classList.remove('activeContact');
            contactBox.classList.add('inactiveContact');
        }
    }
)

//Switching to contact Tab
contactTab.addEventListener('click',
    (evt) => {
        let myTab = evt.target.closest('a');
        if(! (Array.from(myTab.classList).find(i => i == 'active') ) ) {
            myTab.classList.add('active');
            myTab.classList.remove('inactive');
            
            workTab.classList.remove('active');
            workTab.classList.add('inactive');


            CV.classList.add('inactiveContent');
            CV.classList.remove('activeContent');

            contactBox.classList.add('activeContact');
            contactBox.classList.remove('inactiveContact');
        }
    }
)




//clicking on a video
for(i=0;i<items.length;i++) {
    items[i].addEventListener('click', 
    (evt) =>{
        window.scrollTo({
            top: 300,
            left: 0,
            behavior: 'smooth'
        });
        
        CV.classList.add('CVunavailable');
        CV.classList.remove('CVavailable');
        videoBox.classList.add('activeBox');
        videoBox.classList.remove('inactiveBox');
        
        let myItem = evt.target.closest('.item');
        let index = Array.from(items).indexOf(myItem);
        
        playerBox.querySelector('source').setAttribute('src',
        itemVideo[index].querySelector('source').getAttribute('src'));
        playerBox.setAttribute('controls', 'false');
        playerBox.load();
        
        playerItemTitle.textContent = itemTitle[index].textContent;
        playerDescription.textContent = itemDescription[index].textContent;

        setTimeout(() => {playerBox.play();}, 1000)

    })
}

//closing a video
close.addEventListener('click', 
(evt) =>{
    playerBox.pause();
    playerBox.currentTime = 2;
    playerBox.querySelector('source').setAttribute('src','');
    playerBox.setAttribute('controls', 'false');

    CV.classList.remove('CVunavailable');
    CV.classList.add('CVavailable');
    videoBox.classList.remove('activeBox');
    videoBox.classList.add('inactiveBox');
    
    playerItemTitle.textContent = '';
    playerDescription.textContent = '';
})




//sticky footer

window.onscroll = function () {
        if (window.innerHeight + 200 < body.scrollHeight) {
        if (window.scrollY >= 150) {
            footer.classList.add('activeFooter');
            footer.classList.remove('inactiveFooter');
        } else {
            footer.classList.add('inactiveFooter');
            footer.classList.remove('activeFooter');
            }
        }
    }

setInterval( _ => {
        if (window.innerHeight + 200 > body.scrollHeight) {
            footer.classList.add('activeFooter');
            footer.classList.remove('inactiveFooter');
    }
    } 
    ,100)





