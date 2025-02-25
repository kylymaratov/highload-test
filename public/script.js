"use strict";

const logsSocket = io("/logs");
const taskSocket = io("/tasks");

const monitorElement = document.getElementById("monitor");

let logs = "";
let inProcess = "";
let scheluded = "";

let activeScreen = "logs";

const showLogsScreen = () => {
  clearClass();
  monitorElement.innerHTML = logs;
  activeScreen = "logs";
  document.getElementById("log").classList.add("active");
};

const showInProcessScreen = () => {
  clearClass();
  monitorElement.innerHTML = inProcess;
  activeScreen = "process";
  document.getElementById("process").classList.add("active");
};

const showScheludedScreen = () => {
  clearClass();
  monitorElement.innerHTML = scheluded;
  activeScreen = "scheluded";
  document.getElementById("scheluded").classList.add("active");
};

const clearClass = () => {
  document.getElementById("scheluded").classList.remove("active");
  document.getElementById("process").classList.remove("active");
  document.getElementById("log").classList.remove("active");
};

logsSocket.on("log", ({ task, instanceId, status }) => {
  if (activeScreen === "logs") {
    monitorElement.innerHTML += `<li>Task ${task.name} | ${instanceId} | interval ${task.intervalSeconds}s | last run time ${task.lastRunTime} -- ${status}</li>`;
  } else {
    logs += `<li>Task ${task.name} | ${instanceId} | interval ${task.intervalSeconds}s | last run time ${task.lastRunTime} -- ${status}</li>`;
  }
});

taskSocket.on("stat", (tasks) => {
  for (let task of tasks.inProcess) {
    inProcess += `<li>Task ${task.name} | ${task.runningInstanceId} | interval ${task.intervalSeconds}s | last run time ${task.lastRunTime} -- InProcess</li>`;
  }

  for (let task of tasks.scheluded) {
    const lastRunTime = task.lastRunTime
      ? new Date(task.lastRunTime).getTime()
      : 0;
    const nextRunAfter = lastRunTime
      ? (task.intervalSeconds * 1000 - (Date.now() - lastRunTime)) / 1000
      : 0;

    scheluded += `<li>Task ${task.name} | interval ${
      task.intervalSeconds
    }s | last run time ${task.lastRunTime} -- next run :  ${formatTime(
      nextRunAfter
    )}</li>`;
  }
});

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${h}h ${m}m ${s}s`;
}

showLogsScreen();
