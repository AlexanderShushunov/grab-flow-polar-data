async function shareTraining (id) {
  const response = await fetch(
    'https://flow.polar.com/api/sharing/token/create',
    {
      method: 'POST',
      body: JSON.stringify({
        contentId: id,
        contentType: 'TRAINING_SESSION'
      }),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-requested-with': 'XMLHttpRequest'
      },
    })
  const { token } = await response.json()
  return `https://flow.polar.com/shared/${token}`
}

function getFirstKey () {
  return Object.keys(exerciseTargetResults)[0]
}

function grabWorkingPhases () {
  const id = getFirstKey()
  return exerciseTargetResults[id]
    .exercisePhasedTargetData
    .filter(({ name }) => name === 'Работа')
}

function speedToPace (speed) {
  const paceInMinutes = 60 / speed
  const min = Math.floor(paceInMinutes)
  const sec = Math.round(60 * (paceInMinutes - min))
  return `${min}:${sec}`
}

function grabAvgPace () {
  const avgSpeed = grabWorkingPhases()
    .map(({ statistics }) => statistics.speed.avg)
    .reduce((acc, speed) => acc + speed, 0) / grabWorkingPhases().length
  return speedToPace(avgSpeed)

}

function formatMs (ms) {
  const min = Math.floor(ms / 1000 / 60)
  const sec = Math.round(ms / 1000 - (min * 60))
  return `${min}:${sec}`
}

function grabDurations () {
  return grabWorkingPhases()
    .map(({ duration }) => duration.millis)
    .map(formatMs)
    .join(', ')
}

function grabDayOfWeek() {
  const headerText = document.querySelector('#sportHeading').textContent
  const strings = headerText.split('\n')
  const lastString = strings[strings.length - 1].trim()
  return lastString.split(',')[0]
}

async function formatReport () {
  const link = await shareTraining(trainingSessionId)
  let work = 'Продолжительность'
  if (grabDurations().includes(',')) {
    work = 'Отрезки'
  }
  return `${grabDayOfWeek()} ${link} ${work}: ${grabDurations()}, Средний пейс: ${grabAvgPace()}`
}

function printReport () {
  formatReport().then( report => {
    window._report = report
    console.log(report)
  })
}

printReport()

// for test
exports.getFirstKey = getFirstKey
exports.grabWorkingPhases = grabWorkingPhases
exports.grabAvgPace = grabAvgPace
exports.grabDurations = grabDurations
