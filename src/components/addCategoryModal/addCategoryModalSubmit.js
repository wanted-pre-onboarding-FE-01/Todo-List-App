import styles from './AddCategoryModal.module.scss'
import { useState } from 'react'

export default function Modalsubmit() {
  const [color, setColor] = useState('#ffffff')

  const colorArr = [
    { colorName: 'red', colorValue: '#d4697b' },
    { colorName: 'orange', colorValue: '#d27a56' },
    { colorName: 'yellow', colorValue: '#d1a345' },
    { colorName: 'green', colorValue: '#53a787' },
    { colorName: 'blue', colorValue: '#566dda' },
  ]

  function handleForm(event) {
    event.preventDefault() // 콘솔출력용
    console.log(`${event.target.categoryName.value}`)
    console.log(`${event.target.color.value}`)
    event.target.categoryName.value = '' // flushes the categoryName value
    event.target.color.value = '#ffffff' // flushes the color value
  }

  return (
    <div className={styles.formStyle}>
      <form id='someForm' onSubmit={handleForm}>
        <div className={styles.colorPalette}>
          {colorArr.map((colorPrepare) => (
            <button
              className={styles.colorPrepare}
              type='button'
              key={`colorPrepare${colorPrepare.colorName}`}
              onClick={() => setColor(colorPrepare.colorValue)}
              aria-label='colorPrepare'
            />
          ))}

          <div className={styles.hiddenBox}>
            <input
              className={styles.colorPicker}
              type='color'
              name='color'
              value={color}
              onChange={(e) => {
                setColor(e.target.value)
              }}
            />
          </div>
        </div>
        <input
          className={styles.categoryName}
          type='text'
          name='categoryName'
          maxLength='15'
          placeholder='카테고리 이름 입력'
          required
        />
        <input type='submit' className={styles.submitButton} value='Add' />
      </form>
    </div>
  )
}
