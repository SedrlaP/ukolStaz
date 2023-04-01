function vytvorPole(vstup) {

    // odstraní ze vstupu mezery
    vstup = vstup.replace(/\s/g, "")

    // vypočítá velikost jedné strany čtvercového pole
    const velikost = Math.ceil(Math.sqrt(vstup.length))

    // vytvoří nové pole dané velikosti a naplní je hodnotami
    const novePole = new Array(velikost)
    for (let i = 0; i < velikost; i++) {
        novePole[i] = new Array(velikost)
        for (let j = 0; j < velikost; j++) {
            novePole[i][j] = Number(vstup[i * velikost + j])
        }
    }
    return novePole
}

function najdiViditelneStromy(rada) {
    const viditelneStromy = []

    // hodnota začíná -1, kvůli možnosti výška prvního stromu === 0
    let predchoziHodnota = -1 
    for (let idx = 0; idx < rada.length; idx++) { 

        // pokud je výška v řadě na daném
        // indexu větší než výška předchozího stromu (predchoziHodnota)
        // uloží výšku do predchoziHodnota a přidá do celkové hodnoty stromu co vidím 1
        // jinak výšku přeskočí
        if (rada[idx].vyska > predchoziHodnota) {
            predchoziHodnota = rada[idx].vyska
            const obj = {
                souradnice : rada[idx].souradnice, vyska: rada[idx].vyska
            }
            viditelneStromy.push(obj)
        }
    } 
    return viditelneStromy
}

function ulozDoRady(x, y, pole) {

    // uloží strom do objektu ve tvaru souradnice : XY, vyska : číslo
    const obj = {
        souradnice : String(x) + String(y), vyska: pole[x][y]
    }
    
    return obj
}

function spocitejStromy(pole) {
    const vsechnyStromy = [] 

    // vodorovně
    for (let x = 0; x < pole.length; x++) {
        let rada = []

        // doprava  
        for (let y = 0; y < pole.length; y++) {
            
            // objekt uloží do řady
            rada.push(ulozDoRady(x, y, pole))
        }
        vsechnyStromy.push(...najdiViditelneStromy(rada))
    
        // doleva 
        rada = []
        for (let y = pole.length - 1 ; y >= 0; y--) {

            // objekt uloží do řady
            rada.push(ulozDoRady(x, y, pole))
        }
        vsechnyStromy.push(...najdiViditelneStromy(rada)) 
     
    }

    // svisle
    for (let y = 0; y < pole.length; y++) {
        let rada = []

        // dolu
        for (let x = 0; x < pole.length; x++) {

            // objekt uloží do řady
            rada.push(ulozDoRady(x, y, pole))
        }
        vsechnyStromy.push(...najdiViditelneStromy(rada))

        // nahoru
        rada = []
        for (let x = pole.length - 1 ; x >= 0; x--) {

            // objekt uloží do řady
            rada.push(ulozDoRady(x, y, pole))
        }
        vsechnyStromy.push(...najdiViditelneStromy(rada)) 
    }

    // vyfiltruje stromy, které jsou vidět z více stran 
    // ze stromů, které jsou v poli uloženy více než jednou, udělá jeden záznam
    const celkemStromu = vsechnyStromy.filter((item, index) => {
        return !vsechnyStromy.slice(index+1).some(obj => obj.souradnice === item.souradnice && obj.vyska === item.vyska)
    })

    // vystupní hodnota (délka pole stromů je rovna počtu viditelných stromů)
    const vysledek = celkemStromu.length
    return vysledek
}

// přečte mapu, ze souboru mapa.txt
 fetch("mapa.txt")
    .then(x => x.text())
    .then((text) => {
        const pole = vytvorPole(text)
        const vysledek = spocitejStromy(pole)
        const div = document.getElementById("vysledek")
        div.textContent = "Celkový počet viditelných stromů: " + vysledek
        }
    )


