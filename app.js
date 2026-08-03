/* =========================================================
   TISSIR 2025
   Audit Readiness & QMS Training Platform
   JavaScript
========================================================= */


/* =========================
   EMERGENCY LOADER RELEASE
========================= */

setTimeout(() => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

}, 4000);





/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }

});






/* =========================
   MOBILE MENU
========================= */


const menuBtn = document.getElementById("menuBtn");

const nav = document.querySelector(".nav-links");


if(menuBtn && nav){

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}





/* =========================
   CLOSE MOBILE MENU
========================= */


document.querySelectorAll(".nav-links a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        if(nav){

            nav.classList.remove("active");

        }

    });

});






/* =========================
   SMOOTH SCROLL
========================= */


document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{


anchor.addEventListener("click",function(e){


const target=document.querySelector(
this.getAttribute("href")
);


if(target){

    e.preventDefault();

    target.scrollIntoView({

        behavior:"smooth"

    });

}


});


});






/* =========================
   BACK TO TOP
========================= */


const topBtn=document.getElementById("topBtn");


if(topBtn){


topBtn.style.display="none";


window.addEventListener("scroll",()=>{


if(window.scrollY>400){

    topBtn.style.display="block";

}

else{

    topBtn.style.display="none";

}


});



topBtn.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}







/* =========================
   SCROLL ANIMATION
========================= */


if("IntersectionObserver" in window){


const observer=new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

    entry.target.classList.add("show");

}


});


},{

threshold:0.15

});



document.querySelectorAll(

".card, .about-card, .document-card, .planning-card, .timeline-item"

)
.forEach(element=>{

observer.observe(element);

});


}








/* =========================
   AUDIT CHECKLIST MEMORY
========================= */


const checklist=document.querySelectorAll(

".checklist input[type='checkbox']"

);



function updateProgress(){


const total=document.querySelectorAll(

".checklist input"

).length;


const completed=document.querySelectorAll(

".checklist input:checked"

).length;



if(total){


const percentage=Math.round(

(completed/total)*100

);



const progress=document.querySelector(

".progress-fill"

);



if(progress){

progress.style.width =
percentage+"%";

}



const text=document.querySelector(

".progress-container p"

);



if(text){

text.textContent =
"Progression Audit Readiness : "
+ percentage
+"%";

}


}


}





if(checklist.length){


checklist.forEach((item,index)=>{


let saved;


try{

saved=localStorage.getItem(

"audit_check_"+index

);

}

catch(e){}



if(saved==="true"){

item.checked=true;

}



item.addEventListener("change",()=>{


try{


localStorage.setItem(

"audit_check_"+index,

item.checked

);


}

catch(e){}



updateProgress();


});


});


}



updateProgress();







/* =========================
   QMS TRAINING MODULE
========================= */


let qmsModules=[


{

name:"Fondamentaux QMS",

completed:false

},


{

name:"Gestion documentaire",

completed:false

},


{

name:"Audit interne",

completed:false

},


{

name:"Amélioration continue",

completed:false

}


];





function saveTrainingProgress(){


localStorage.setItem(

"QMS_training",

JSON.stringify(qmsModules)

);


}






function loadTrainingProgress(){


const saved =
localStorage.getItem(
"QMS_training"
);



if(saved){


qmsModules =
JSON.parse(saved);


}


}



loadTrainingProgress();







function completeModule(id){


if(qmsModules[id]){


qmsModules[id].completed=true;


saveTrainingProgress();


alert(

"Module QMS validé avec succès"

);


}


}





/* =========================
   CONTACT FORM
========================= */


const contactForm=document.querySelector(

".contact-form"

);



if(contactForm){


contactForm.addEventListener("submit",(e)=>{


e.preventDefault();


alert(

"Merci pour votre message. Notre équipe vous contactera prochainement."

);


contactForm.reset();


});


}






/* =========================
   READY MESSAGE
========================= */


console.log(

"TISSIR 2025 QMS Training Platform loaded successfully"

);

/* =========================
   APP.JS SUPPORT
========================= */


.nav-links.active {

display:flex;

flex-direction:column;

position:absolute;

top:90px;

left:0;

right:0;

background:white;

padding:25px;

}



.card,
.about-card,
.document-card,
.planning-card,
.timeline-item {

opacity:0;

transform:translateY(30px);

transition:.6s;

}



.show {

opacity:1;

transform:translateY(0);

}
