import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/bs'

dayjs.extend(localeData)

// 단축 월 리스트
export const MONTHS = dayjs.monthsShort()
// 단축 요일 리스트
export const WEEKDAY = dayjs.weekdaysMin()

export const calendarType = (selectedDay) => {
  const blanks = Array(selectedDay.startOf('month').day()).fill('')
  const dates = Array.from({ length: selectedDay.daysInMonth() }, (v, i) => i + 1)
  const shownDates = [...blanks, ...dates]

  const fromYear = Number(`${selectedDay.year()}`.slice(0, -1) + 0)

  return [
    {
      id: 'months',
      isDisabled: true,
      column: 4,
      needThead: false,
      arrowStandard: { unit: 'year', step: 1 },
      navi: [selectedDay.year()],
      tbodyData: MONTHS,
    },
    {
      id: 'years',
      isDisabled: true,
      column: 4,
      needThead: false,
      arrowStandard: { unit: 'year', step: 10 },
      navi: [`${fromYear}-${fromYear + 9}`],
      tbodyData: [...Array(10)].map((e, i) => fromYear + i),
    },
    {
      id: 'main',
      isDisabled: false,
      column: 7,
      needThead: true,
      arrowStandard: { unit: 'month', step: 1 },
      navi: [selectedDay.format('MMMM'), selectedDay.year()],
      tbodyData: shownDates,
    },
  ]
}

// // tbody에 들어갈 data 배열 정리
// let rowIdx = -1
// export const manufacturedTbodyData = (tbodyData, column) =>
//   tbodyData?.reduce((acc, cur, i, arr) => {
//     console.log('티바디 tbodyData', tbodyData, 'acc', acc, 'rowIdx', rowIdx, 'cur', cur)
//     if (!(i % column)) {
//       acc.push([cur])
//       rowIdx += 1
//       if (cur === tbodyData[tbodyData.length - 1]) arr.splice(1)
//     } else {
//       console.log('else acc', acc, 'rowIdx', rowIdx, 'cur', cur)
//       if (!acc.length && rowIdx > 0) arr.splice(1)

//       acc[rowIdx].push(cur)
//     }
//     return acc
//   }, [])

let rowIdx = -1
export const manufacturedTbodyData2 = (tbodyData2, column2) =>
  tbodyData2.reduce((acc, cur, i) => {
    if (!(i % column2)) {
      acc.push([cur])
      rowIdx += 1
    } else {
      acc[rowIdx].push(cur)
    }
    return acc
  }, [])