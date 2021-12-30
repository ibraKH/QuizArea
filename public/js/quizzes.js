function ach(){
    document.getElementById("achBanner").classList.remove("hide")

    let counter = JSON.parse(localStorage.getItem('counter'));

    let details = document.getElementsByClassName("details");
    let medalImages = document.getElementsByClassName("levels");
    if(counter.name.length > 4){
        for(let i = 0; i < details.length; i++){
            details[i].classList.add("hide");
            medalImages[i].classList.add("earned")
        }
        document.getElementById("l1").src = '/medals/level1.png'
        document.getElementById("l2").src = '/medals/level2.png'
        document.getElementById("l3").src = '/medals/level3.png'
        document.getElementById("l4").src = '/medals/level4.png'
        document.getElementById("l5").src = '/medals/level5.png'
    }else{
        switch(counter.name.length) {
            case 1:
                document.getElementById("l1").src = '/medals/level1.png'
                details[4].classList.add("hide");
                medalImages[4].classList.add("earned")
              break;
            case 2:
                document.getElementById("l1").src = '/medals/level1.png'
                document.getElementById("l2").src = '/medals/level3.png'
                details[4].classList.add("hide");
                medalImages[4].classList.add("earned")
                details[3].classList.add("hide");
                medalImages[3].classList.add("earned")
                break;
            case 3:
                document.getElementById("l1").src = '/medals/level1.png'
                document.getElementById("l2").src = '/medals/level2.png'
                document.getElementById("l3").src = '/medals/level3.png'
                for(let i = 4; i > 1; i--){
                    details[i].classList.add("hide");
                    medalImages[i].classList.add("earned")
                }
              break;
            case 4:
                document.getElementById("l1").src = '/medals/level1.png'
                document.getElementById("l2").src = '/medals/level2.png'
                document.getElementById("l3").src = '/medals/level3.png'
                document.getElementById("l4").src = '/medals/level4.png'
                for(let i = 4; i > 0; i--){
                    details[i].classList.add("hide");
                    medalImages[i].classList.add("earned")
                }
              break;
          }
    }
}

document.getElementById("closeMedals").addEventListener("click",function(){
    document.getElementById("achBanner").classList.add("hide")
})

