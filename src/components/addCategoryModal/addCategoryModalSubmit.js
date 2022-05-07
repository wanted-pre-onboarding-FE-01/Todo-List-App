import styles from './AddCategoryModal.module.scss'
import { useState } from 'react'

/* import { PopoverPicker } from './PopoverPicker' */

function Modalsubmit() {
  const [color, setColor] = useState('#ffffff')

  const colorArr = [
    { colorName: 'red', colorValue: '#ff3b30' },
    { colorName: 'orange', colorValue: '#ff9500' },
    { colorName: 'yellow', colorValue: '#ffcc00' },
    { colorName: 'green', colorValue: '#34c759' },
    { colorName: 'blue', colorValue: '#007aff' },
    { colorName: 'purple', colorValue: '#af52de' },
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

          {/* <PopoverPicker color={color} onChange={setColor} /> */}

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
          maxLength='20'
          placeholder='카테고리 이름 입력'
          required
        />
        <input type='submit' className={styles.submitButton} value='Add' />
      </form>
    </div>
  )
}

export default Modalsubmit
