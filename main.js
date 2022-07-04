var timetable = {
  1: ['B', 'I', 'C', 'A', 'G'],
  2: ['D', 'B', 'I', 'C', 'G'],
  3: ['A', 'D', 'B', 'I', 'G'],
  4: ['K', 'A', 'D', 'B', 'G'],
  5: ['K', 'C', 'A', 'D', 'G'],
};
var labtime = {
  1: ['K', 'K', 'K'],
  2: ['F', 'K', 'K'],
  3: ['K', 'K', 'K'],
  4: ['I', 'K', 'K'],
  5: ['J', 'K', 'K'],
};
var alphaToCode = {
  A: 'EC206', //MICROPROCESSOR
  B: 'EC207', //EMT
  C: 'EC208', //DIGITAL SIGNAL PROCESSING
  D: 'EC209', //CONTROL SYSTEMS
  E: 'EC210', //MICROPROCESSOR LAB
  F: 'EC211', //DIGITAL SIGNAL PROCESSING LAB
  G: 'G', //Lunch time
  I: 'EC340', //COMPUTER ORGANISATION AND ARCHITECTURE
  J: 'EC280', //MINI PROJECT
  //L: 'MEL2020_TUTORIAL', //thermo tutorial
  K: 'K', //free time
};

var codeToCourse = {
  EC206: 'MICROPROCESSOR',
  EC207: 'EMT',
  EC208: 'DIGITAL SIGNAL PROCESSING',
  EC209: 'CONTROL SYSTEMS',
  EC210: 'MICROPROCESSOR LAB',
  EC211: 'DIGITAL SIGNAL PROCESSING LAB',
  EC340: 'COMPUTER ORGANISATION AND ARCHITECTURE',
  EC280: 'MINI PROJECT',
};

function readTextFile(file, rollno) {
  var rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allData = rawFile.responseText;
        let args = allData.split('\n');
        let found = false;
        for (let i = 0; i < args.length; i++) {
          let breaked = args[i].split(' ');
          if (breaked[0] == rollno) {
            localStorage.setItem('lastroll', rollno);

            let le = breaked.length;
            let nalias = breaked.splice(1, le - 1);
            var alias = nalias.join(' ');

            const mydate = new Date();
            let day = mydate.getDay();

            document.getElementById('en').innerHTML = '';
            let chosenCustomDay = document.getElementById('customday').value;

            if (chosenCustomDay == '0') {
              if (day == 0) {
                document.getElementById('en').innerHTML =
                  "Today's free.<br>Tommorow's Time Table:";
                day = 1;
              } else if (day == 6) {
                document.getElementById('en').innerHTML =
                  'Today and Tommorow are free.<br>Monday Time Table:';
                day = 1;
              } else {
                let currHour = new Date().getHours();
                if (currHour < 17) {
                  document.getElementById('en').innerHTML =
                    "Today's Time Table:";
                } else {
                  if (day == 5) {
                    document.getElementById('en').innerHTML =
                      "Today's classes are over.<br>Monday Time Table:";
                    day = 1;
                  } else {
                    document.getElementById('en').innerHTML =
                      "Today's classes are over.<br>Tommorow's Time Table:";
                    day++;
                  }
                }
              }
              document.getElementById('en').innerHTML += '<br>';
              if (day == 1)
                document.getElementById('en').innerHTML += '(Monday)';
              else if (day == 2)
                document.getElementById('en').innerHTML += '(Tuesday)';
              else if (day == 3)
                document.getElementById('en').innerHTML += '(Wednesday)';
              else if (day == 4)
                document.getElementById('en').innerHTML += '(Thursday)';
              else if (day == 5)
                document.getElementById('en').innerHTML += '(Friday)';
            } else {
              day = Number(chosenCustomDay);
              document.getElementById('en').innerHTML += 'Custom Day<br>';
              if (day == 1)
                document.getElementById('en').innerHTML += '(Monday)';
              else if (day == 2)
                document.getElementById('en').innerHTML += '(Tuesday)';
              else if (day == 3)
                document.getElementById('en').innerHTML += '(Wednesday)';
              else if (day == 4)
                document.getElementById('en').innerHTML += '(Thursday)';
              else if (day == 5)
                document.getElementById('en').innerHTML += '(Friday)';
            }
            document.getElementById('tslot1').innerHTML = '08:00 AM - 08:50 AM';
            document.getElementById('tslot2').innerHTML = '09:00 AM - 09:50 AM';
            document.getElementById('tslot3').innerHTML = '10:00 AM - 10:50 AM';
            document.getElementById('tslot4').innerHTML = '11:00 AM - 11:50 AM';
            document.getElementById('tslot5').innerHTML = '12:30 PM - 02:45 PM';
            document.getElementById('tslot6').innerHTML = '03:00 PM- 04:00 PM';
            document.getElementById('tslot7').innerHTML = '04:00 PM - 05:00 PM';
            document.getElementById('tslot8').innerHTML = '05:00 PM - 05:50 PM';

            var slots = [
              'dslot1',
              'dslot2',
              'dslot3',
              'dslot4',
              'dslot5',
              'dslot6',
              'dslot7',
              'dslot8',
            ];
            var m_slots = [
              'mslot1',
              'mslot2',
              'mslot3',
              'mslot4',
              'mslot5',
              'mslot6',
              'mslot7',
              'mslot8',
            ];
            for (let i = 0; i < timetable[day].length; i++) {
              let ClassCode = alphaToCode[timetable[day][i]];
              if (day % 2 != 0 && ClassCode != 'G' && ClassCode != 'K') {
                document.getElementById(slots[i]).innerHTML =
                  'Lecture class -- ' +
                  codeToCourse[ClassCode] +
                  ' (' +
                  ClassCode +
                  ')';
                document.getElementById(m_slots[i]).innerHTML =
                  'Click to join ' +
                  codeToCourse[ClassCode] +
                  ' (' +
                  ClassCode +
                  ')';
              } else if (day % 2 == 0 && ClassCode != 'G' && ClassCode != 'K') {
                document.getElementById(slots[i]).innerHTML =
                  'Lecture class -- ' +
                  codeToCourse[ClassCode] +
                  ' (' +
                  ClassCode +
                  ')';
                document.getElementById(m_slots[i]).innerHTML =
                  'Click to join ' +
                  codeToCourse[ClassCode] +
                  ' (' +
                  ClassCode +
                  ')';
              } else if (ClassCode == 'G') {
                document.getElementById('dslot5').innerHTML = 'LUNCH BREAK!';
              } else {
                document.getElementById(slots[i]).innerHTML = 'FREE!';
              }
            }
            for (let i = 0; i < labtime[day].length; i++) {
              let ClassCode = alphaToCode[labtime[day][i]];
              if (ClassCode != 'K' && ClassCode != 'L') {
                document.getElementById(slots[i + 5]).innerHTML =
                  'Lab Lecture -- ' +
                  codeToCourse[ClassCode] +
                  ' (' +
                  ClassCode +
                  ')';
                document.getElementById(m_slots[i + 5]).innerHTML =
                  'Click to join ' +
                  codeToCourse[ClassCode] +
                  ' (' +
                  ClassCode +
                  ')';
              } else {
                document.getElementById(slots[i + 5]).innerHTML = 'FREE!';
              }
            }
            document.getElementById('alias').innerHTML =
              alias + '<br>' + "Today's Time-Table";
            show();
            found = true;
            break;
          }
        }
        if (!found) {
          alert('Entered roll number is incorrect.');
        }
      }
    }
  };
  rawFile.send(null);
}

function func() {
  var inp = document.getElementById('in');
  var tinp = inp.value;
  if (tinp === '') {
    alert('You think I am a fool?! I mean, enter your roll no already~');
  } else {
    readTextFile('groupings.txt', tinp);
  }
}

function show() {
  var res = document.getElementById('result');
  res.style.display = 'block';
  setTimeout(() => {
    res.style.transform = 'scale(1)';
  }, 100);
  var my = document.getElementById('myself');
  my.style.transform = 'scale(0)';
  my.style.display = 'none';
}

function hide() {
  var res = document.getElementById('result');
  res.style.transform = 'scale(0)';
  setTimeout(() => {
    res.style.display = 'none';
  }, 1005);
  var my = document.getElementById('myself');
  my.style.transform = 'scale(1)';
  my.style.display = 'block';
}

window.onload = function () {
  let lastrn = localStorage.getItem('lastroll');
  if (lastrn) {
    document.getElementById('in').value = lastrn;
  }
};
