document.getElementById("finishBtn").addEventListener('click', function(){
    let quizName = document.getElementById("quizNameInput").value;

    let available = JSON.parse(localStorage.getItem(`counter`));

    let storageValue = {
        "name": [quizName]
    }

    if(!(available)){
        localStorage.setItem("counter", JSON.stringify(storageValue))
    }else{
        let getLocal = JSON.parse(localStorage.getItem(`counter`));
        let on = 0;
        for(let i = 0; i < getLocal.name.length; i++){
            if(getLocal.name[i] === quizName){
                on = 1;
                break;
            }
        }

        if(on === 0){
            let finalStorage = {
                "name": [...getLocal.name, quizName]
            }
            localStorage.setItem("counter", JSON.stringify(finalStorage))
        }
    }

    //localStorage.removeItem("counter");
})