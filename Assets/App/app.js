
/*
    Declaring Variables
*/

let myDoc = document.querySelector('html');
let body = document.querySelector('body');

let header = document.querySelector('header');
    let navList = document.querySelectorAll('nav ul li');
    let navListSpan = document.querySelectorAll('nav ul li span');
        let homeTab = document.querySelector('.homeTab');
        let servicesTab = document.querySelector('.servicesTab');
        let contactTab = document.querySelector('.contactTab');
        let aboutTab = document.querySelector('.aboutTab');


let content = document.querySelector('.content');
    let preserveHeight = document.querySelector('#preserveHeight');
    let pages = document.querySelectorAll('.content .page');

    let workContent = document.querySelector('.workContent');
        let player = document.querySelector('.player');
            let videoPlayer = document.querySelector('.videoPlayer');
            let playerInfo = document.querySelector('.playerInfo');
                let playerItemTitle = document.querySelector('.playerItemTitle');
                let playerDescription = document.querySelector('.playerDescription');
            let closeBtn = document.querySelector('.close');

        let videoGallery = document.querySelector('.videoGallery');
            let items = document.querySelectorAll('.item');
                let itemVideo = document.querySelectorAll('.item video');
                let itemInfo = document.querySelectorAll('.item .info');
                    let itemTitle = document.querySelectorAll('.item .info .videoTitle');
                    let itemDescription = document.querySelectorAll('.item .info .videoDescription');

    let services = document.querySelector('.services');

    let contact = document.querySelector('.contact');

    let about = document.querySelector('.about');

let footer = document.querySelector('Footer');

let iFrames = ['<iframe src="https://drive.google.com/file/d/1Hkrjunqu0Pi3QY8zyptSUZoSMV3X__yA/preview" allow="autoplay"></iframe>','<iframe src="https://drive.google.com/file/d/1VMRjBV3nOstG9XO9HhEJTI80lJrrqpqY/preview" allow="autoplay"></iframe>', '<iframe src="https://drive.google.com/file/d/1Hu66_VwE0d_2BysH-O0MPCnIuy9ircJx/preview" allow="autoplay"></iframe>', '<iframe src="https://drive.google.com/file/d/1JpWTZKQU98Vt3MuvEv-SQt6KnMO0DBUR/preview" allow="autoplay"></iframe>']


/*
    End of Variable decleration
*/


/*
    Functionalities
*/



//To avoid initial scrolling when reload
setTimeout(_ => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
}, 500)
window.onload = function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
}
setTimeout(_ => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
}, 1500)




/* (1) => hovering over the videos */

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

//event listener when the pointer leaves each video
for(i=0;i<items.length;i++) {
    items[i].addEventListener('pointerleave', 
    (evt) =>{
        let myItem = evt.target;
        myItem.querySelector('video').pause();
        myItem.querySelector('video').currentTime = 2;
        myItem.classList.remove("activeItem");
        myItem.classList.add("inactiveItem");
    })
}




/* (2) => clicking on a video to activate the player */

//clicking on a video to open
for(i=0;i<items.length;i++) {
    items[i].addEventListener('click', 
    (evt) =>{
        window.scrollTo({
            top: 300,
            left: 0,
            behavior: 'smooth'
        });
        
        let myHeight = player.clientHeight + videoGallery.clientHeight + 250;
        workContent.style.height = myHeight.toString() + 'px';

        videoGallery.classList.add('inactiveGallery');
        videoGallery.classList.remove('activeGallery');
        setTimeout( _ => {
            player.classList.add('activePlayer');
            player.classList.remove('inactivePlayer');
        }, 1000)
        
        let myItem = evt.target.closest('.item');
        let index = Array.from(items).indexOf(myItem);
        
        playerItemTitle.textContent = itemTitle[index].textContent;
        playerDescription.textContent = itemDescription[index].textContent;
        
        setTimeout(_ => {
            videoPlayer.innerHTML = iFrames[index];
        }, 2000)
    })
}

//closing a video
function closeVideo() {
    player.classList.remove('activePlayer');
    player.classList.add('inactivePlayer');
    setTimeout(_ => {
        videoGallery.classList.remove('inactiveGallery');
        videoGallery.classList.add('activeGallery');

        let myHeight = videoGallery.clientHeight + 250;
        workContent.style.height = myHeight.toString() + 'px';
    },1000)

    videoPlayer.innerHTML = '<iframe src="https://drive.google.com/file/d/1Hkrjunqu0Pi3QY8zyptSUZoSMV3X__yA/preview" allow="autoplay"></iframe>';
    playerItemTitle.textContent = '';
    playerDescription.textContent = '';
}

closeBtn.addEventListener('click', () =>{
    closeVideo();               //must write the function this way in an event listener
})





/* (3) => sticky footer */

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




/* (4) => switching between TABS / Pages */

//function for activating
function activateTab(index) {
    navList[index].classList.add('activeTab');
    navList[index].classList.remove('inactiveTab');
    pages[index].classList.remove('transparent');

    pages[index].classList.add('activePage');
    pages[index].classList.remove('inactivePage');
}

//function for deactivating
function deactivateTab(index) {
    navList[index].classList.remove('activeTab');
    navList[index].classList.add('inactiveTab');

    pages[index].classList.remove('activePage');
    pages[index].classList.add('inactivePage');
}

//function for adjusting content height
function adjustHeight(index) {
    setTimeout(() => {
        let mainHeight = pages[index].clientHeight + 200;
        content.style.height = mainHeight.toString() + 'px';
    }, 1000)
}


//EventListeners for the tabs
navListSpan.forEach(Tab => {
    Tab.addEventListener('click', evt => {
        let myTab = evt.target.closest('li');
        let tabIndex = Array.from(navList).indexOf(myTab);

        if (player.classList.contains('activePlayer') === true) {
            closeVideo();
        }
    
        for(i=0;i<navList.length;i++) {
            if(i === tabIndex){
                let x = i; //to store its value for 1000ms later
                setTimeout(() => {
                    activateTab(x);
                    adjustHeight(x);
                },500)
            } else {
                deactivateTab(i);
            }
        }
    })
})




// homeTab.addEventListener('click', () => {
//     if (player.classList.contains('activePlayer') === true) {
//         closeVideo();
//     }

//     for(i=0;i<navList.length;i++) {
//             if(i === 0){
//                 let x = i; //to store its value for 1000ms later
//                 setTimeout(() => {
//                     activateTab(x);
//                     adjustHeight(x);
//                 },500)
//             } else {
//                 deactivateTab(i);
//             }
//     }
// })

// servicesTab.addEventListener('click', () => {
//     if (player.classList.contains('activePlayer') === true) {
//         closeVideo();
//     }

//     for(i=0;i<navList.length;i++) {
//         if(i === 1){
//             let x = i; //to store its value for 1000ms later
//             setTimeout(() => {
//                 activateTab(x);
//                 adjustHeight(x);
//             },500)
//         } else {
//             deactivateTab(i);
//         }
//     }
// })

// contactTab.addEventListener('click', () => {
//     if (player.classList.contains('activePlayer') === true) {
//         closeVideo();
//     }

//     for(i=0;i<navList.length;i++) {
//         if(i === 2){
//             let x = i; //to store its value for 1000ms later
//             setTimeout(() => {
//                 activateTab(x);
//                 adjustHeight(x);
//             },500)
//         } else {
//             deactivateTab(i);
//         }
//     }
// })

// aboutTab.addEventListener('click', () => {
//     if (player.classList.contains('activePlayer') === true) {
//         closeVideo();
//     }

//     for(i=0;i<navList.length;i++) {
//         if(i === 3){
//             let x = i; //to store its value for 1000ms later
//             setTimeout(() => {
//                 activateTab(x);
//                 adjustHeight(x);
//             },500)
//         } else {
//             deactivateTab(i);
//         }
//     }
// })




// //function for activating
// function activateTab(index) {
//     navList[index].classList.add('activeTab');
//     navList[index].classList.remove('inactiveTab');
//     pages[i].classList.remove('transparent');

//     pages[index].classList.add('activePage');
//     pages[index].classList.remove('inactivePage');
//     console.log(index);
// }

// //function for deactivating
// function deactivateTab(index) {
//     navList[index].classList.remove('activeTab');
//     navList[index].classList.add('inactiveTab');

//     pages[index].classList.remove('activePage');
//     pages[index].classList.add('inactivePage');
// }

// //function for adjusting content height
// function adjustHeight(index) {
//     let mainHeight = pages[index].clientHeight + 400;
//     content.style.height = mainHeight.toString() + 'px';
// }

// //EventListeners for the tabs
// homeTab.addEventListener('click', () => {
//     for(i=0;i<navList.length;i++) {
//             if(i === 0){
//                 activateTab(i);
//                 adjustHeight(i);
//             } else {
//                 deactivateTab(i);
//             }
//     }
// })

// servicesTab.addEventListener('click', () => {
//     if (player.classList.contains('activePlayer') === true) {
//         closeVideo();
//     }

//     for(i=0;i<navList.length;i++) {
//         if(i === 1){
//             activateTab(i);
//             adjustHeight(i);
//         } else {
//             deactivateTab(i);
//         }
//     }
// })

// contactTab.addEventListener('click', () => {
//     if (player.classList.contains('activePlayer') === true) {
//         closeVideo();
//     }

//     for(i=0;i<navList.length;i++) {
//         if(i === 2){
//             activateTab(i);
//             adjustHeight(i);
//         } else {
//             deactivateTab(i);
//         }
//     }
// })

// aboutTab.addEventListener('click', () => {
//     if (player.classList.contains('activePlayer') === true) {
//         closeVideo();
//     }

//     for(i=0;i<navList.length;i++) {
//         if(i === 3){
//             activateTab(i);
//             adjustHeight(i);
//         } else {
//             deactivateTab(i);
//         }
//     }
// })


