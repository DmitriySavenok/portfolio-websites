let background = document.querySelector('.tabs-background');
let pomodoroCountSpan = document.querySelector('.current-count');

let timer = document.getElementById('timer');

let startBtn = document.getElementById('startBtn');
let pauseBtn = document.getElementById('pauseBtn');
let nextBtn = document.getElementById('nextBtn');
let resetBtn = document.getElementById('resetBtn');
let stopBtn = document.getElementById('stopBtn');

let taskAddBtn = document.getElementById('taskAddBtn');

let timerMinusBtn = document.getElementById('timerMinusBtn');
let timerPlusBtn = document.getElementById('timerPlusBtn');

let setCyclesBtn = document.getElementById('setCyclesBtn');

let pomodoroTabButton = document.getElementById('pomodoro');
let shortTabButton = document.getElementById('short-break');
let longTabButton = document.getElementById('long-break');

let tasksCount = 1;
clearInputs ();
if (tasksCount > 1) {
  completingTasks();
  deleteTask()
}

let minutesDefault = 25;

let pomodoroMinutes = 25;
let shortBreakMinutes = 5;
let longBreakMinutes = 15;

let necessaryCycles = 4;

let seconds = 0;
let minutes = 0;
let interval;
let timerStart = false;
let pomodoroCount = 1;
updateCountSpan();

let needRest = false;

pauseBtn.disabled = true;
resetBtn.disabled = true;
nextBtn.disabled = true;

taskAddBtn.addEventListener('click', () => {
  let taskName = document.querySelector('#inputTaskName').value;
  let taskCycle = document.querySelector('#inputTaskCycle').value;
  if(taskName !== '') {
    if(taskCycle >= 1 && taskCycle < necessaryCycles) {
      craeteTask(taskName, taskCycle);
    } else if (taskCycle == necessaryCycles){
      craeteTask(taskName, taskCycle);
    } else {
      alert('Значение может быть от 1 до ' + necessaryCycles);
    }
  } else {
    alert('Нужно указать название задачи');
  }
});

function clearInputs () {
  let taskName = document.querySelector('#inputTaskName').value ='';
  let taskCycle = document.querySelector('#inputTaskCycle').value ='';
}

function craeteTask(name, cycle) {
  document.getElementById('taskList').innerHTML += `<li class="tasks__list-item task" data-pomodoro-cycle="${cycle.toString()}" id="task-${tasksCount.toString()}"><input id="check-done-${tasksCount.toString()}" type="checkbox" class="task__checkbox-done"><label for="check-done-${tasksCount.toString()}">${name.toString()}</label><span class="task__cycle">${cycle.toString()} / ${necessaryCycles.toString()}</span><button id="deleteTask${tasksCount.toString()}" class="task__delete-button control-button"></button></li>`
  tasksCount++;
  completingTasks();
  deleteTask();
  clearInputs ();
}

function completingTasks() {
  document.querySelectorAll('.task__checkbox-done').forEach(el => {
    el.addEventListener('click', (e) => {
      checkboxId = e.target.id.toString();
      taskDoneId = "#task-"+ checkboxId.at(-1);
      elem = document.querySelector(taskDoneId).classList.toggle('task-done');
    })
  })
}

function deleteTask() {
  document.querySelectorAll('.task__delete-button').forEach(el => {
    el.addEventListener('click', (e) => {
      delButtonId = e.target.id.toString();
      delTaskId = "#task-"+ delButtonId.at(-1);
      delTask = document.querySelector(delTaskId);
      parentTasks = delTask.parentNode;
      parentTasks.removeChild(delTask);
      if (tasksCount > 1) {
        tasksCount--;
      } else if (tasksCount <= 1) {
        tasksCount = 1;
      }
    })
  })
}

function setDefaultMinutes() {
  pomodoroMinutes = 25;
  shortBreakMinutes = 5;
  longBreakMinutes = 15;
}

function updateCountSpan() {
  pomodoroCountSpan.textContent = pomodoroCount + ' / ' + necessaryCycles;
  document.getElementById('necessary-cycles-input').value = '';
}

function updateTime() {
  timerStart = true;
  seconds--;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }
  if (minutes === minutesDefault) {
    minutes--;
  }

  if (minutes < 1) {
    minutes = 0;
  }

  if (minutes == 0 && seconds == 0 && background.classList.contains('pomodoro-background')) {
    if (pomodoroCount < necessaryCycles) {
      nextStage('short-break-background');
    }
    if (pomodoroCount == necessaryCycles) {
      nextStage('long-break-background');
    }
  }

  if (minutes == 0 && seconds == 0) {
    if (background.classList.contains('short-break-tab-background')) {
      nextStage('short-to-pomodoro-background');
    } else if (background.classList.contains('long-break-tab-background')) {
      nextStage('lont-to-pomodoro-background');
    }
  }

  timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (background.classList.contains('pomodoro-background')) {
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} осталось работать`;
  } else if (background.classList.contains('short-break-tab-background')) {
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} до конца перерыва`;
  } else if (background.classList.contains('long-break-tab-background')) {
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} времени отдыха осталось`;
  }
}

function resetTime() {
  clearInterval(interval);
  minutes = minutesDefault;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  nextBtn.disabled = true;
  timerMinusBtn.disabled = false;
  timerPlusBtn.disabled = false;
  tabsEnable();
}

function startTime() {
  minutes = minutesDefault;
  interval = setInterval(updateTime, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  nextBtn.disabled = false;
  timerMinusBtn.disabled = true;
  timerPlusBtn.disabled = true;
  tabsDisable();
}

function nextStage(targetStage) {
  if (targetStage == 'short-break-background') {
    alert('Необходимо сделать перерыв');
    resetTime();
    needRest = true;
    tabsEnable();
    shortTabButton.click();
  }
  if (targetStage == 'long-break-background') {
    alert('Необходимо отдохнуть');
    resetTime();
    needRest = true;
    tabsEnable();
    shortTabButton.disabled = true;
    longTabButton.click();
  }
  if (targetStage == 'short-to-pomodoro-background') {
    alert('Перерыв окончен');
    pomodoroCount++;
    updateCountSpan();
    needRest = false;
    resetTime();
    tabsEnable();
    pomodoroTabButton.click();
  }
  if (targetStage == 'lont-to-pomodoro-background') {
    alert('Отдых окончен');
    resetTime();
    needRest = false;
    pomodoroCount = 1;
    updateCountSpan();
    tabsEnable();
    pomodoroTabButton.click();
  }
}

function tabsDisable() {
  pomodoroTabButton.disabled = true;
  shortTabButton.disabled = true;
  longTabButton.disabled = true;
}

function tabsEnable() {
  pomodoroTabButton.disabled = false;
  shortTabButton.disabled = false;
  longTabButton.disabled = false;
}

timerMinusBtn.addEventListener('click', () => {
  if (background.classList.contains('pomodoro-background')) {
    if(pomodoroMinutes > 5) {
      pomodoroMinutes = pomodoroMinutes-5;
      timer.textContent = `${pomodoroMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (pomodoroMinutes == 5) {
      pomodoroMinutes = 1;
      timer.textContent = `${pomodoroMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  if (background.classList.contains('short-break-tab-background')) {
    if(shortBreakMinutes > 1) {
      shortBreakMinutes = shortBreakMinutes-1;
      timer.textContent = `${shortBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (shortBreakMinutes == 1) {
      shortBreakMinutes = 1;
      timer.textContent = `${shortBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  if (background.classList.contains('long-break-tab-background')) {
    if(longBreakMinutes > 5) {
      longBreakMinutes = longBreakMinutes-5;
      timer.textContent = `${longBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (longBreakMinutes == 5) {
      longBreakMinutes = 5;
      timer.textContent = `${longBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
});

timerPlusBtn.addEventListener('click', () => {
  if (background.classList.contains('pomodoro-background')) {
    if(pomodoroMinutes == 1) {
      pomodoroMinutes = 5;
      timer.textContent = `${pomodoroMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if(pomodoroMinutes < 60 && pomodoroMinutes != 1) {
      pomodoroMinutes = pomodoroMinutes+5;
      timer.textContent = `${pomodoroMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (pomodoroMinutes == 60) {
      pomodoroMinutes = 60;
      timer.textContent = `${pomodoroMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  if (background.classList.contains('short-break-tab-background')) {
    if(shortBreakMinutes >= 1 && shortBreakMinutes < 30) {
      shortBreakMinutes = shortBreakMinutes+1;
      timer.textContent = `${shortBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (shortBreakMinutes == 30) {
      shortBreakMinutes = 30;
      timer.textContent = `${shortBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  if (background.classList.contains('long-break-tab-background')) {
    if(longBreakMinutes < 60) {
      longBreakMinutes = longBreakMinutes+5;
      timer.textContent = `${longBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (longBreakMinutes == 60) {
      longBreakMinutes = 60;
      timer.textContent = `${longBreakMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
});

function findCurrentTask(cycle) {
  taskAttribute = `[data-pomodoro-cycle="${pomodoroCount}"]`;
  taskList = [];
  tasks = document.querySelectorAll(taskAttribute).forEach(el => {
    elem = el.querySelector('label');
    taskList.push(elem.textContent)
  })
  if (taskList.length > 0) {
    alert("Необходимо выполнить следующие задачи: \n" + taskList)
  }
}

startBtn.addEventListener('click', () => {
  if (background.classList.contains('pomodoro-background')) {
    minutesDefault = pomodoroMinutes;
  } else if (background.classList.contains('short-break-tab-background')) {
    minutesDefault = shortBreakMinutes;
  } else if (background.classList.contains('long-break-tab-background')) {
    minutesDefault = longBreakMinutes;
  }

  if (background.classList.contains('pomodoro-background') && needRest == false) {
    startTime();
    findCurrentTask(pomodoroCount);
  } else if (background.classList.contains('pomodoro-background') && needRest == true && pomodoroCount < necessaryCycles) {
    alert('Необходимо сделать перерыв');
  } else if (background.classList.contains('pomodoro-background') && needRest == true && pomodoroCount == necessaryCycles) {
    alert('Необходимо отдохнуть');
  } else if (needRest == false && background.classList.contains('short-break-tab-background')) {
    alert('Чтобы сделать перерыв, нужно поработать');
  } else if (needRest == false && pomodoroCount > 1 && background.classList.contains('short-break-tab-background')) {
    startTime();
  } else if (needRest && pomodoroCount < necessaryCycles && background.classList.contains('short-break-tab-background')) {
    startTime();
  } else if (needRest && pomodoroCount == necessaryCycles && background.classList.contains('long-break-tab-background')) {
    startTime();
  } else if (pomodoroCount != necessaryCycles && background.classList.contains('long-break-tab-background')) {
    alert('Чтобы уйти на долгий отдых, нужно завершить ' + necessaryCycles + ' цикла');
  } else if (needRest == false && pomodoroCount == necessaryCycles && background.classList.contains('long-break-tab-background')) {
    alert('Чтобы отдыхать, нужно завершить последний цикл');
  }
});

pauseBtn.addEventListener('click', () => {
  clearInterval(interval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} на паузе`;
});

resetBtn.addEventListener('click', () => {
  resetTime()
  seconds = 0;
  timer.textContent = `${minutes.toString()}:00`;
  document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerStart = false;
});

nextBtn.addEventListener('click', () => {
  if (background.classList.contains('pomodoro-background')) {
    if (pomodoroCount < necessaryCycles) {
      nextStage('short-break-background');
    } else if (pomodoroCount == necessaryCycles) {
      nextStage('long-break-background');
    }
  } else if (background.classList.contains('short-break-tab-background')) {
    nextStage('short-to-pomodoro-background');
  } else if (background.classList.contains('long-break-tab-background')) {
    nextStage('lont-to-pomodoro-background');
  }
});

stopBtn.addEventListener('click', () => {
  if (confirm('Вы уверены, что хотите полностью завершить работу?') == true) {
    resetTime();
    needRest = false;
    pomodoroCount = 1;
    necessaryCycles = 4;
    setDefaultMinutes()
    updateCountSpan();
    tabsEnable();
    pomodoroTabButton.click();
    document.title = 'Pomodoro'
  }
});

setCyclesBtn.addEventListener('click', () => {
  let necessaryCyclesInput = document.getElementById('necessary-cycles-input').value;
  if (necessaryCyclesInput >= pomodoroCount) {
    if(necessaryCyclesInput >= 1 && necessaryCyclesInput <= 100) {
      necessaryCycles = necessaryCyclesInput;
    } else {
      alert('Значение может быть от 1 до 100')
    }
  }
  updateCountSpan();
});

function trackingButtonClicks() {
  document.querySelectorAll('.tab-activation-button').forEach(el => {
    el.addEventListener('click', (e) => {

      if (e.target.id === 'pomodoro') {
        pomodoroTabsActive();
        pomodoroTabButton.classList.add('active-tab');
        shortTabButton.classList.remove('active-tab');
        longTabButton.classList.remove('active-tab');
      } else if (e.target.id === 'short-break') {
        shortTabsActive();
        pomodoroTabButton.classList.remove('active-tab');
        shortTabButton.classList.add('active-tab');
        longTabButton.classList.remove('active-tab');
      } else if (e.target.id === 'long-break') {
        longTabsActive();
        pomodoroTabButton.classList.remove('active-tab');
        shortTabButton.classList.remove('active-tab');
        longTabButton.classList.add('active-tab');
      }
    })
  })
}

function pomodoroTabsActive() {
  seconds = 0;
  minutes = pomodoroMinutes;
  timer.textContent = `${minutes.toString()}:00`;
  timerStart = false;
  background.classList.add('pomodoro-background');
  background.classList.remove('short-break-tab-background');
  background.classList.remove('long-break-tab-background');
  document.title = 'Работа'
}

function shortTabsActive() {
  seconds = 0;
  minutes = shortBreakMinutes;
  timer.textContent = `${minutes.toString()}:00`;
  timerStart = false;
  background.classList.remove('pomodoro-background');
  background.classList.add('short-break-tab-background');
  background.classList.remove('long-break-tab-background');
  document.title = 'Короткий перерыв'
}

function longTabsActive() {
  seconds = 0;
  minutes = longBreakMinutes;
  timer.textContent = `${minutes.toString()}:00`;
  timerStart = false;
  background.classList.remove('pomodoro-background');
  background.classList.remove('short-break-tab-background');
  background.classList.add('long-break-tab-background');
  document.title = 'Отдых'
}

trackingButtonClicks();