const ATTACK_VALUE = 20;
const STRONG_ATTACK_VALUE = 30;
const MONSTER_ATTACK_VALUE = 24;
const HEAL_VALUE = 25;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Maximum life for you and the monster.", "100");

let choseMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(choseMaxLife) || choseMaxLife <= 0) {
  choseMaxLife = 100;
}

let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBonusLife = true;

adjustHealthBars(choseMaxLife);

function writeToLog(event, value, monsterHealth, PlayerHealth) {
  let logEntry;
  if (event == LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerhealth: PlayerHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerhealth: PlayerHealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerhealth: PlayerHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerhealth: PlayerHealth,
    };
  } else if (event === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerhealth: PlayerHealth,
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = choseMaxLife;
  currentPlayerHealth = choseMaxLife;
  resetGame(choseMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert("You would be dead but the bonus life saved you!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("Your won");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "YOU LOST",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You have a draw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(attackType) {
  let maxDamage;
  let logEvent;
  if (attackType === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster();
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= choseMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health");
    healValue = choseMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log("--------------");
  }
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  // let j = 0;
  // while (j < 3) {
  //   console.log("----------");
  //   j++;
  // }

  let i = 0;
  for (const el of battleLog) {
    console.log(`#${i}`);
    for (const key in el) {
      console.log(key);
      console.log(el[key]);
    }
    i++;
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
