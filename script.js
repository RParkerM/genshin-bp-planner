// TODO: add in ability to see how many times we can complete it and the total amount of BP generated

// Reminder - BP resets at 4:00 am
// US -5 GMT
// EU +1 GMT
// AS +8 GMT

// 2021/07/21 06:00:00

const endTimeByTZ = {
  US: "2021-07-21T06:00:00.000+08:00",
  EU: "2021-06-26T03:59:59.000+01:00",
  AS: "2021-06-26T03:59:59.000+08:00",
};

const endTime = new Date(endTimeByTZ["US"]);

const curBEPEl = document.getElementById("curBp");
const curLvlEl = document.getElementById("curLvl");
const dailyMissionList = document.querySelector("#dailyMissions .missionList");
const weeklyMissionList = document.querySelector(
  "#weeklyMissions .missionList"
);
const periodMissionList = document.querySelector(
  "#periodMissions .missionList"
);
const missionLists = document.querySelectorAll(".missionList");

const goalBEPEl = document.querySelector("#goalBP .bepText");
const tabsContent = document.querySelectorAll(".tab");
const tabs = document.querySelectorAll(".missionTab");
const timeRemainingEl = document.getElementById("timeLeftContainer");

let remainingTime = endTime.getTime() - Date.now();

curBEPEl.addEventListener("change", bindInputWithinRange);
curLvlEl.addEventListener("change", bindInputWithinRange);
curBEPEl.addEventListener("change", updateGoalBep);
curLvlEl.addEventListener("change", updateGoalBep);

tabs.forEach((tab) => tab.addEventListener("click", (e) => selectTab(e)));

function selectTab(e) {
  tabs.forEach((tab) => tab.classList.remove("active"));
  e.target.classList.add("active");
  updateMissionListVisibility(e.target.id);
}

function updateMissionListVisibility(tab) {
  console.log(tab);
  missionLists.forEach((mission) =>
    mission.parentElement.classList.remove("active")
  );
  if (tab == "dailyMissionTab")
    dailyMissionList.parentElement.classList.add("active");
  else if (tab == "weeklyMissionTab")
    weeklyMissionList.parentElement.classList.add("active");
  else if (tab == "periodMissionTab")
    periodMissionList.parentElement.classList.add("active");
  console.log(missionLists);
}

function updateGoalBep() {
  let curLvl = curLvlEl.value;
  let curBEP = curBEPEl.value;

  let bpRemaining = (50 - curLvl) * 1000 - curBEP;

  goalBEPEl.innerHTML = Math.max(0, bpRemaining);
}

const dailyMissions = [
  ["Log in", 120],
  ["Complete 4 Daily Commissions", 150],
  ["Mine 10 items", 150],
  ["Use a total of 150 Original Resin", 225],
];

const weeklyMissions = [
  ["Cook 20 dishes", 360],
  ["Forge 20 items", 360],
  ["Collect 100 Mondstadt local specialties", 450],
  ["Collect 100 Liyue local specialties", 450],
  ["Complete 15 Domain Challenges", 450],
  ["Complete Ley Line deposit challenges 20 times", 450],
  ["Defeat boss enemies 10 times", 450],
  ["Spend a total of 500,000 Mora", 450],
  ["Complete 3 Requests", 450],
  ["Complete 3 Bounties", 450],
  ["Use a total of 1,200 Original Resin", 675],
  ["Complete the Stormterror Domain Challenge", 675],
  ["Complete the Wolf of the North Challenge", 675],
  ["Complete the Golden House Challenge", 675],
];

const periodMissions = [
  ["Make a total of 50 wishes", 1500],
  ["Gain a total of 12 stars in the Spiral Abyss", 2250],
  ["[Event] Reach 2,600 points in Bullseye Balloons: Tower Waltz", 1500],
  ["[Event] Reach 3,000 points in Floral Freefall: Windrise", 1500],
  [
    "[Event] Reach 2,200 points in Ballads of Breeze: Fondest Strength on Pro Mode",
    1500,
  ],
  [
    "[Event] Complete all Peculiar Conqueror tasks in Peculiar Wonderland",
    2250,
  ],
  ['[Event] Completing all challenges in "Contending Tides"', 1500],
  ['[Event] Complete "Life Flows On (II)" and obtain Endora', 1200],
];

function bindInputWithinRange(e) {
  if (!e || !e.target || !e.target.min || !e.target.max) return;
  let max = e.target.max;
  let min = e.target.min;
  e.target.value = Math.min(Math.max(min, e.target.value), max);
}

function missionElement({ name, amount, chancesLeft }) {
  return `<li><small>${name}</small><div>${amount} x ${chancesLeft} = 
  <div class="bepCounter"><div class="bepText">${
    amount * chancesLeft
  }</div></div></div></li>`;
}

function initMissions() {
  const daysLeft = chancesLeft(remainingTime, "daily");
  dailyMissionList.innerHTML = `Days left = ${daysLeft}`;

  dailyMissions.forEach((mission) => {
    dailyMissionList.innerHTML += missionElement({
      name: mission[0],
      amount: mission[1],
      chancesLeft: daysLeft,
    });
    // let missionEl = document.createElement("li");
    // missionEl.innerHTML = `<small>${mission[0]}</small>
    //   <div class="bepCounter"><div class="bepText">${mission[1]}</div></div>`;
    // dailyMissionList.append(missionEl);
  });

  weeklyMissionList.innerHTML = `Weeks left = ${chancesLeft(
    remainingTime,
    "weekly"
  )}`;
  weeklyMissions.forEach((mission) => {
    let missionEl = document.createElement("li");
    missionEl.innerHTML = `<small>${mission[0]}</small>
      <div class="bepCounter"><div class="bepText">${mission[1]}</div></div>`;
    weeklyMissionList.append(missionEl);
  });

  initMissionList(periodMissionList, periodMissions);
}

function initMissionList(missionListElement, missionList) {
  missionListElement.innerHTML = `Times left = ${chancesLeft(
    remainingTime,
    "period"
  )}`;
  missionList.forEach((mission) => {
    let missionEl = document.createElement("li");
    missionEl.innerHTML = `<small>${mission[0]}</small>
      <div class="bepCounter"><div class="bepText">${mission[1]}</div></div>`;
    missionListElement.append(missionEl);
  });
}

function printTimeSeconds(myTime) {
  let msToSecond = 1000;
  let msToMinute = 60 * msToSecond;
  let msToHour = 60 * msToMinute;
  let msToDay = 24 * msToHour;

  let days = Math.floor(myTime / msToDay);
  let hours = Math.floor((myTime % msToDay) / msToHour);
  let minutes = Math.floor((myTime % msToHour) / msToMinute);
  let seconds = Math.floor((myTime % msToMinute) / msToSecond);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

initMissions();

setInterval(() => {
  // console.log(printTimeSeconds(endTime.getTime() - Date.now()));
  remainingTime = endTime.getTime() - Date.now();
  updateTimeLeft();
}, 1000);

function updateTimeLeft() {
  timeRemainingEl.innerHTML = `Current period ends in ${printTimeSeconds(
    remainingTime
  )}`;
}

function chancesLeft(time, missionType) {
  if (time < 0) return 0;
  if (missionType == "period") return 1;
  let msInDays = 1000 * 60 * 60 * 24;
  if (missionType == "daily") return Math.ceil(time / msInDays);
  let msInWeeks = msInDays * 7;
  if (missionType == "weekly") return Math.ceil(time / msInWeeks);
  return undefined;
}

// NEXT ACTION IS TO SHOW HOW MANY TIMES LEFT ON THE BUTTON
// THEN SHOW BASE BEP AND TOTAL BEP = BASE * TIMES
