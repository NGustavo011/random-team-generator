function generateTeams() {
    const teamQuantity = document.querySelector("#team-quantity-input").value
    const players = document.querySelector("#players-input").value
    if(teamQuantity=="" || teamQuantity<=1){
        alert(`Quantidade de times inválido.\nPor favor preencha com valores acima de 1.`)
        return;
    }
    const playersArray = players.toString().split(/\r?\n/);
    const playersObjectArray = []
    for(const playerData of playersArray){
        if(playerData=="" || playerData.trim()=="Lista") continue;
        if(!playerData.includes("/")){
            alert(`Formato de jogador inválido: ${playerData}.\nPor favor preencha no formato (%nome/%nível) como: Gustavo/1.`)
            return;
        }
        const regex = /\d+\ *\-/
        const name = playerData.split("/")[0].replace(regex, "").trim()
        const level = playerData.split("/")[1].trim()
        playersObjectArray.push({
            name,
            level
        })
    }
    shuffleArray(playersObjectArray)
    const playersObjectArraySorted = playersObjectArray.sort((a, b)=> {
        if (a.level > b.level) {
            return -1;
        }
        if (a.level < b.level) {
            return 1;
        }
        return 0;
    })
    console.log(playersObjectArraySorted)
    const teams = []
    for(let i=0; i<teamQuantity; i++){
        teams.push([])
    }
    let contador = 0;
    let order = "cresc"
    for(const player of playersObjectArraySorted){ 
        if(order==="cresc"){
            teams[contador++].push(player.name.toUpperCase())
        } else {   
            teams[--contador].push(player.name.toUpperCase())
        }
        if(contador==teamQuantity){
            order="desc"
        } else if(contador==0) {
            order="cresc"
        }
    }
    outputResult(teams)
}

function outputResult(teams){
    teams = teams.sort((a, b)=> {
        if (a.length > b.length) {
            return -1;
        }
        if (a.length < b.length) {
            return 1;
        }
        return 0;
    })
    const resultDiv = document.querySelector("#result")
    removeAllChildNodes(resultDiv)
    const teamTitle = document.createElement("h2")
    resultDiv.append(teamTitle)
    teamTitle.append("Times")
    let contador = 0;
    for(const team of teams) {
        const teamDiv = document.createElement("div")
        resultDiv.append(teamDiv)
        const titleDiv = document.createElement("h4")
        teamDiv.append(titleDiv)
        titleDiv.append(`Time ${++contador}`)
        for(const player of team) {
            const playerSpan = document.createElement("span")
            teamDiv.append(playerSpan)
            playerSpan.append(player)
        }
    }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}