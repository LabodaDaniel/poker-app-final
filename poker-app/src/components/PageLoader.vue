<template>
<div class="main">
  <img class="one" src="@/assets/spades.png">
  <img class="two" src="@/assets/hearts.png">
  <img class="three" src="@/assets/clubs.png">
  <img class="four" src="@/assets/diamonds.png">
</div>
</template>

<style>
.main {
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  position: absolute;
} 

.main img {
  margin: 0px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}

.one {
  animation-name: load-one;
}

@keyframes load-one {
  20% {
     transform: translateY(-50%);
  }
}

.two {
  animation-name: load-two;
}

@keyframes load-two {
  40% {
     transform: translateY(-50%);
  }
}

.three {
  animation-name: load-three;
}

@keyframes load-three {
  60% {
     transform: translateY(-50%);
  }
}

.four {
  animation-name: load-four;
}

@keyframes load-four {
  80% {
     transform: translateY(-50%);
  }
}
</style>