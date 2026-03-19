const timeToMins = (dayStart, dayEnd, meetStart, meetDuring) => {
  const timeArray = [dayStart, dayEnd, meetStart, meetDuring];
  const splitTimeArray = timeArray.slice(0, -1).map((stringTime) => stringTime.split(':'));
  const mins = splitTimeArray.map ((innerTime) => (parseInt(innerTime[0], 10) * 60) + parseInt(innerTime[1], 10));
  mins.push(parseInt(timeArray[timeArray.length - 1], 10));
  return (mins[2] >= mins[0] && mins[2] < mins[1] && (mins[2] + mins[3]) <= mins[1]);
};

timeToMins('08:00', '17:30', '14:00', 90);
timeToMins('8:0', '10:0', '8:0', 120);
timeToMins('08:00', '14:30', '14:00', 90);
timeToMins('14:00', '17:30', '08:0', 90);
timeToMins('8:00', '17:30', '08:00', 900);

//   console.log(timeToMins('08:00', '17:30', '14:00', 90));
//   console.log(timeToMins('8:0', '10:0', '8:0', 120));
//   console.log(timeToMins('08:00', '14:30', '14:00', 90));
//   console.log(timeToMins('14:00', '17:30', '08:0', 90));
//   console.log(timeToMins('8:00', '17:30', '08:00', 900));
