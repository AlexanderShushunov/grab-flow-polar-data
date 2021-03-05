const { getFirstKey, grabWorkingPhases, grabAvgPace, grabDurations } = require('./index')
global.exerciseTargetResults = require('./exerciseTargetResults')

describe('getFirstKey', () => {
  test('grab training id', () => {
    expect(getFirstKey()).toEqual('5766469879')
  })
})

describe('grabWorkingPhases', () => {
  test('grab working phases', () => {
    expect(
      grabWorkingPhases()
        .map(({distance}) =>  distance)
        .join()
    ).toEqual('400,400,400,400,400,400,400,400,400,400')
  })
})

describe('grabWorkingPhases', () => {
  test('grab working phases', () => {
    expect(
      grabWorkingPhases()
        .map(({distance}) =>  distance)
        .join()
    ).toEqual('400,400,400,400,400,400,400,400,400,400')
  })
})

describe('grabAvgPace', () => {
  test('grab avg pace', () => {
    expect(
      grabAvgPace()
    ).toEqual('3:55')
  })
})

describe('grabDurations', () => {
  test('grab avg duration', () => {
    expect(
      grabDurations()
    ).toEqual('1:32, 1:35, 1:32, 1:35, 1:39, 1:35, 1:35, 1:38, 1:36, 1:30')
  })
})