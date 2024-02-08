function renderCard(){

    for (let i = 0; i < 4; i++) {
        const id = document.getElementById(`${i}`);
        
        if (i == 0) {
            for (let j = 0; j <= 1; j++) {
                const id = document.getElementById(`${i}`);
                id.innerHTML += templateCard(); 
            }
        }else{
            id.innerHTML = templateCard();
        }
    }
}