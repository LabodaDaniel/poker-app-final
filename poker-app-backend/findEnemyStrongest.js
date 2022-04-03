import fs from "fs";
import G from "generatorics";
import { sortCardOrder, removeItemOnce, getOnlyName, getJustDeck } from './helperFunctions.js';

const everyCards = [
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "TC",
  "JC",
  "QC",
  "KC",
  "AC",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "TD",
  "JD",
  "QD",
  "KD",
  "AD",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "TH",
  "JH",
  "QH",
  "KH",
  "AH",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "TS",
  "JS",
  "QS",
  "KS",
  "AS",
];

export default function findEnemyStrongest(sevenCards) {
  let inSevenCards = sevenCards.sevenCards;
  let sevenCardsName = getOnlyName(inSevenCards);
  let inEveryCards = getJustDeck(everyCards, sevenCardsName)
  let result = [];
  if (inSevenCards.length == 7) {
    let eCombination = createEnemysPossibleHands(inEveryCards, sevenCardsName);
    for (const comb of eCombination) {
      result.push(findStrongestOfEnemysCards(comb));
    }
    return result;
  } else if (inSevenCards.length == 6) {
    let inEveryCardsWithoutBoard = [...inEveryCards];
    for(let comb of inEveryCards){
      let turnCombination = createEnemysPossibleHands(removeItemOnce(inEveryCardsWithoutBoard, comb), sevenCardsName.concat(comb.toString()));
      for(let combi of turnCombination){
        result.push(findStrongestOfEnemysCards(combi));
      }
      inEveryCardsWithoutBoard = [...inEveryCards];
    }
    return result;
  }else if (inSevenCards.length == 5){
    let inEveryCardsWithoutBoard = [...inEveryCards];
    for(let i=0;i<inEveryCards.length;i++){
      for(let j=i+1;j<inEveryCards.length;j++){
        let remove = removeItemOnce(inEveryCardsWithoutBoard, inEveryCards[i])
        remove = removeItemOnce(inEveryCardsWithoutBoard, inEveryCards[j])
        let turnCombination = createEnemysPossibleHands(remove, sevenCardsName.concat(inEveryCards[i], inEveryCards[j]));
        for(let combi of turnCombination){
          result.push(findStrongestOfEnemysCards(combi));
        }
        inEveryCardsWithoutBoard = [...inEveryCards];
      }
    }
    return result;
  }
}

//Megkapja az összes kártyát és a lent lévő kártyákat. Visszaadja az ellenfél lehetséges kombinációit (maradék lap alatt a 2).
function createEnemysPossibleHands(allCards, sevenCardsName) {
  let eCombination = [];
  let everyCards = [...allCards];
  let allCombinations = [];
  for (let comb of G.combination(everyCards, 2)) {
    allCombinations.push(comb.slice());
  }
  for (let comb of allCombinations) {
    eCombination.push(comb.concat(sevenCardsName.slice(2, 7)));
  }
  return eCombination;
}

//Megkap egy tömböt, amiben 7 lap van, legenerálja a 7 alatt az 5-öt(=21).
function createEnemysCombinations(enemyComb) {
  let onlyName = [];
  let allCombinations = [];
  for (let card of enemyComb) {
    onlyName.push(card);
  }
  for (let comb of G.combination(onlyName, 5)) {
    allCombinations.push(comb.slice());
  }
  return allCombinations;
}

//A createEnemysCombinations-tól kapott 21 5-ös kombinációból kiválasztja a legerősebbet.
function findStrongestOfEnemysCards(combi) {
  let rawdata = fs.readFileSync("data.json");
  let strenghtOrder = JSON.parse(rawdata);
  let combinations = createEnemysCombinations(combi);
  let combinationsName = [];
  let ordered = "";
  let result = [];

  for (let combination of combinations) {
    let nameString = "";
    let colors = { C: 0, S: 0, H: 0, D: 0 };
    for (let card of combination) {
      nameString += card[0];
      colors[card[1]] += 1;
    }
    ordered = sortCardOrder(nameString, colors);
    combinationsName.push(ordered);
    result.push(strenghtOrder.cardStrenght[ordered]);
  }
  return Math.min(...result);
}