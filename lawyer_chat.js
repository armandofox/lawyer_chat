LC = {
  hourlyRate: 500.0,
  updateIntervalMs: 50.0,
  targetSelId: 'dollarCount',
  targetTimeId: 'timeCount',
  rateFieldId: 'hourlyRate',
  start: Date.now(),
  timeout: null,
  secondsTimeout: null
};

LC.update = function() {
  var elapsed = Date.now() - LC.start;
  var cost = LC.hourlyRate * (elapsed / 1000.0 / 3600.0);
  document.getElementById(LC.targetSelId).textContent = cost.toFixed(2);
  // reschedule self
  LC.timeout = setTimeout(LC.update, LC.updateIntervalMs);
}

LC.updateTime = function() {
  var elapsed = Date.now() - LC.start;
  var sec = parseInt(elapsed / 1000.0);
  var min = parseInt(sec / 60.0);
  var hour = parseInt(min / 60.0);
  document.getElementById(LC.targetTimeId).textContent =
    hour.toString() + ':' + (min < 10 ? '0' : '') + min.toString() + ':' + (sec < 10 ? '0' : '') + sec.toString();
  LC.secondsTimeout = setTimeout(LC.updateTime, 1000);
}


LC.start = function() {
  LC.hourlyRate = parseFloat(document.getElementById(LC.rateFieldId).value);
  LC.start = Date.now();
  LC.timeout = setTimeout(LC.update, LC.updateIntervalMs);
  LC.secondsTimeout = setTimeout(LC.updateTime, 1000);
}

LC.stop = function() {
  clearTimeout(LC.timeout);
  clearTimeout(LC.secondsTimeout);
}

LC.setup = function() {
  document.getElementById('startCounter').addEventListener('click', LC.start);
  document.getElementById('stopCounter').addEventListener('click', LC.stop);
}

