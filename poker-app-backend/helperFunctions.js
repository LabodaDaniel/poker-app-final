//Megkap egy tömböt és egy értéket. Kitörli a tömbből azt az értéket, amit megkap.
export function removeItemOnce(arr, value) {
    let arrCopy = arr;
    var index = arrCopy.indexOf(value);
    if (index > -1) {
      arrCopy.splice(index, 1);
    }
    return arrCopy;
}

//Sorba rendezi a lapokat, hogy meg tudjuk keresni az értékét a data.json-ben.
export function sortCardOrder(string, colors){
    let ordered = string;
    if(colors['C'] == 5){
      ordered+='F'
    } else if(colors['H'] == 5){
      ordered+='F'
    } else if(colors['S'] == 5){
      ordered+='F'
    } else if(colors['D'] == 5){
      ordered+='F'
    }
    return ordered.split('').sort().join('');
}

//Egy object-ből kiszedi a kártyák neveit.
export function getOnlyName(sevenCards){
    let sevenCardsName = [];
    for (let card of sevenCards) {
      sevenCardsName.push(card.name);
    }
    return sevenCardsName;
}

//Kitörli a lent lévő lapokat a pakliból.
export function getJustDeck(everyCards, sevenCards){
    let everyCardsWithoutBoard = [...everyCards];
    for (let card of sevenCards) {
      everyCardsWithoutBoard = removeItemOnce(everyCardsWithoutBoard, card);
    }
    return everyCardsWithoutBoard;
}