<template>
    <Navigation />
  <div class="flex-container">

  <div class="flex-child">
    <h2>A Texas Hold'Em szabálya</h2>
    <p> Hétlapos póker változat. Minden résztvevő alaptétet helyez a közös bankba, majd 2-2 kártyát kap zártan. Később fokozatosan még 5 lap kerül az asztalra nyitottan, melyből hármat bármelyik játékos felhasználhat póker kombinációja kialakításához. Két játékosnak még osztás előtt licitálnia kell. Az osztótól balra ülő beteszi a kisvak licitet, a következő pedig a nagy vak licitet. A játékosok két saját lapjuk ismeretében dönthetnek részvételükről. Aki játszani akar, behelyezi a hívott összeget, aki nem, eldobja kártyáit. A játékos minden licitkörben tarthat, emelhet vagy eldobhatja lapjait. Az első licitkör után az osztó 3 kártyát tesz nyitottan az asztalra. A második licitkör befejezése után még egy lap, a harmadik után újabb lap kerül nyitottan az asztalra. A licitkörökben a még aktív játékosok vesznek részt. Ha bármelyik licitkörben egy hívott tétet senki nem ad meg, a hívó viheti el lapjai megmutatása nélkül a bankot. A licitálás befejezése után az aktív játékosok összehasonlítják lapjaikat és a póker kombinációk rangsorában magasabb kéz nyeri a bankot. Egyenlőségnél a nagyobb semleges lap minősége dönt. </p>
  </div>
  
  <div class="flex-child">
    <h2>Az alkalmazás lényege</h2>
    <p> A Simulate Game fülre kattintva tudod szimulálni a játékot. Figyelned kell, hogy az élő játéknál mi van a kezedben, ezt megadod az oldalon, majd azt is, hogy mi lesz az asztalon flopp-nál, turn-nél, és river-nél. Ezek alapján az oldal kiszámolja a nyerési esélyeidet, valamint más értékeket is, amelyek segítenek meghozni a döntésedet. FIGYELEM! Az oldal nem képes megmondani, hogy esetleg valaki blöfföl, vagy hogy jobb lapokat kapott a kezébe, mint te. Csak a matematikai esélyeket számolja, ezért nem is fogsz minden partyt megnyerni, viszont minél többet játszol, annál többször fogsz nyerni, azaz, ha a lejátszott partyk száma tart a végtelenben, akkor mindig nyerni fogsz.</p>
  </div>
  
</div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import firebase from 'firebase/app';
import Navigation from "../components/Navigation.vue";

export default {
  components: {
    Navigation,
  },

  setup() {
    const name = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split('@') [0];
      }
    });
  },
}
</script>

<style scoped>
p { 
  font-family: "Open Sans";
  color: #eff2fa;
  padding-top: 75px;
  text-align: justify;
  line-height: 30px;
  background-color: black;
  padding: 0.5rem;
  
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.flex-container {
    display: flex;
    margin: 100px;
}

.flex-child {
    flex: 1;
}  

.flex-child:first-child {
    margin-right: 20px;
}

h2 {
  font-family: "Open Sans";
  text-transform: uppercase;
  color: #e35b5a;
  background-color: black;
}

html {
  overflow: hidden;
}

</style>
