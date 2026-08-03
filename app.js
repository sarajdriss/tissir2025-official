 /* =========================================================
    TISSIR 2025
    QMS TRAINING MODE - APP.JS
    Audit Readiness Learning Portal
    ========================================================= */


/* ===============================
   GLOBAL INITIALIZATION
================================ */

document.addEventListener("DOMContentLoaded", () => {

    initializeCounters();

    initializeScrollAnimation();

    initializeChecklist();

    initializeTrainingMode();

    initializeFAQ();

    initializeTopButton();

});


/* ===============================
   KPI COUNTERS
================================ */


function initializeCounters(){

    const counters = document.querySelectorAll(".counter");


    counters.forEach(counter=>{

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = target / 80;


        const update = ()=>{

            if(count < target){

                count += speed;

                counter.textContent =
                Math.ceil(count);

                requestAnimationFrame(update);

            }

            else{

                counter.textContent = target;

            }

        };


        update();

    });

}



/* ===============================
   SCROLL ANIMATION
================================ */


function initializeScrollAnimation(){


    const elements =
    document.querySelectorAll(
        ".card, .feature-box, .document-card, .timeline-item"
    );


    const observer =
    new IntersectionObserver(entries=>{


        entries.forEach(entry=>{


            if(entry.isIntersecting){

                entry.target.style.opacity="1";

                entry.target.style.transform="translateY(0)";

            }


        });


    },
    {
        threshold:0.15
    });



    elements.forEach(el=>{


        el.style.opacity="0";

        el.style.transform="translateY(40px)";

        el.style.transition="all .6s ease";


        observer.observe(el);


    });


}




/* ===============================
   QMS TRAINING MODE
================================ */


function initializeTrainingMode(){


    const modules = document.querySelectorAll(".training-module");


    if(!modules.length){

        return;

    }


    modules.forEach(module=>{


        const button =
        module.querySelector(".complete-btn");


        if(button){


            button.addEventListener("click",()=>{


                module.classList.add("completed");


                button.innerHTML =
                "✓ Formation terminée";


                updateTrainingProgress();


            });


        }


    });



}



function updateTrainingProgress(){


    const total =
    document.querySelectorAll(".training-module").length;


    const completed =
    document.querySelectorAll(".training-module.completed").length;



    const progress =
    Math.round(
        (completed / total) * 100
    );


    const bar =
    document.querySelector(".training-progress");


    if(bar){

        bar.style.width =
        progress + "%";

    }


    const text =
    document.querySelector(".progress-text");


    if(text){

        text.innerHTML =
        "Progression formation QMS : "
        + progress
        + "%";

    }


}




/* ===============================
   AUDIT READINESS CHECKLIST
================================ */


function initializeChecklist(){


    const checks =
    document.querySelectorAll(
        ".checklist input"
    );


    checks.forEach((check,index)=>{


        const saved =
        localStorage.getItem(
            "qms_check_" + index
        );


        if(saved==="true"){

            check.checked=true;

        }



        check.addEventListener(
            "change",
            ()=>{


                localStorage.setItem(
                    "qms_check_"+index,
                    check.checked
                );


                calculateReadiness();


            }
        );


    });


    calculateReadiness();


}




function calculateReadiness(){


    const checks =
    document.querySelectorAll(
        ".checklist input"
    );


    if(!checks.length){

        return;

    }



    let completed=0;


    checks.forEach(check=>{


        if(check.checked){

            completed++;

        }


    });



    const score =
    Math.round(
        (completed/checks.length)*100
    );



    const result =
    document.querySelector(
        ".audit-score"
    );


    if(result){

        result.innerHTML =
        score+"%";

    }



}



/* ===============================
   FAQ
================================ */


function initializeFAQ(){


    const faq =
    document.querySelectorAll(
        ".faq-item h3"
    );


    faq.forEach(question=>{


        question.style.cursor="pointer";


        question.addEventListener(
            "click",
            ()=>{


                const answer =
                question.nextElementSibling;


                if(answer.style.display==="block"){

                    answer.style.display="none";

                }

                else{

                    answer.style.display="block";

                }


            }
        );


    });


}




/* ===============================
   BACK TO TOP
================================ */


function initializeTopButton(){


    const btn =
    document.getElementById(
        "topBtn"
    );


    if(!btn){

        return;

    }



    window.addEventListener(
        "scroll",
        ()=>{


            if(window.scrollY>400){

                btn.style.display="block";

            }

            else{

                btn.style.display="none";

            }


        }
    );



    btn.addEventListener(
        "click",
        ()=>{


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }
    );


}



/* ===============================
   QMS TRAINING DATA MODEL
================================ */


const QMS_Modules = [


{

title:
"Introduction au Système Management Qualité",

objective:
"Comprendre les principes fondamentaux du QMS."

},


{

title:
"Gestion documentaire",

objective:
"Maîtriser procédures, instructions et enregistrements."

},


{

title:
"Contrôle qualité production",

objective:
"Assurer la conformité des produits."

},


{

title:
"Traçabilité matières",

objective:
"Garantir l'identification et le suivi des composants."

},


{

title:
"Audit interne",

objective:
"Préparer les équipes aux exigences auditeurs."

},


{

title:
"Actions correctives CAPA",

objective:
"Analyser les causes et améliorer les performances."

}


];



console.log(
"TISSIR QMS Training Loaded",
QMS_Modules
);
