import G from "generatorics";
import fs from "fs";
import { getOnlyName, sortCardOrder, getJustDeck } from "./helperFunctions.js";

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

export default function findStrongest(sevenCards) {
  let comb = sevenCards.sevenCards;
  let onylNameOfSevenCards = getOnlyName(comb);
  let everyCardsWithoutBoard = getJustDeck(everyCards, onylNameOfSevenCards);
  if (onylNameOfSevenCards.length == 7) {
    return createStrongest(createCombinations(onylNameOfSevenCards))
  } else if (onylNameOfSevenCards.length == 6) {
    let turnCombination = [];
    for (let comb of everyCardsWithoutBoard) {
      turnCombination.push(createStrongest(createCombinations(onylNameOfSevenCards.concat(comb))))
    }
    return turnCombination;
  } else if (onylNameOfSevenCards.length == 5) {
    let flopCombinationsValue = [];
    for (let i = 0; i < everyCardsWithoutBoard.length; i++) {
      for (let j = i + 1; j < everyCardsWithoutBoard.length; j++) {
        flopCombinationsValue.push(createStrongest(createCombinations(onylNameOfSevenCards.concat(everyCardsWithoutBoard[i], everyCardsWithoutBoard[j]))));
      }
    }
    return flopCombinationsValue;
  } else if (onylNameOfSevenCards.length == 2) {
    return calcPreflopChance(onylNameOfSevenCards)
  }
}

//Megkap egy tömböt, amiben 7 lap van, legenerálja a 7 alatt az 5-öt(=21).
function createCombinations(sevenCards) {
  let allCombinations = [];
  for (let comb of G.combination(sevenCards, 5)) {
    allCombinations.push(comb.slice());
  }
  return allCombinations;
}

//Megkap 21x5 lapot és kiválasztja belőle a legerősebbet.
function createStrongest(combinations){
  let rawdata = fs.readFileSync("data.json");
  let strenghtOrder = JSON.parse(rawdata);
  let result =  [];
  for (let combination of combinations) {
    let nameString = "";
    let colors = { C: 0, S: 0, H: 0, D: 0 };
    for (let card of combination) {
      nameString += card[0];
      colors[card[1]] += 1;
    }
    let ordered = sortCardOrder(nameString, colors);
    result.push(strenghtOrder.cardStrenght[ordered]);
  }
  return Math.min(...result);
}

function calcPreflopChance(cards){
  let rawdata = fs.readFileSync("PreflopData.json");
  let chances = JSON.parse(rawdata);
  let cardCheck;
  let reversed;

  if(cards[0][1] == cards[1][1]){
    cardCheck = cards[0][0] + cards[1][0] + 'f';
    reversed = cards[1][0] + cards[0][0] + 'f'
  } else {
    cardCheck = cards[0][0] + cards[1][0]
    reversed = cards[1][0] + cards[0][0] 
  }

  if(chances['preflopStrenght'][cardCheck]){
    return chances['preflopStrenght'][cardCheck]
  } else {
    return chances['preflopStrenght'][reversed]
  }
}