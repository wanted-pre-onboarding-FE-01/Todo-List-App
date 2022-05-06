import styles from './Modal.module.scss'
import { useState } from 'react'
import clsx from 'clsx'

function Modalsubmit() {
  const [color, setColor] = useState('#ffffff')

  const colorarr = [
    { name: 'red', value: '#ff3b30' },
    { name: 'orange', value: '#ff9500' },
    { name: 'yellow', value: '#ffcc00' },
    { name: 'green', value: '#34c759' },
    { name: 'blue', value: '#007aff' },
    { name: 'purple', value: '#af52de' },
  ]
  const tmp = '#ffffff'
  function handleForm(event) {
    event.preventDefault() // stops form from "refreshing" automatically - it follows action, hence the refresh
    console.log(`${event.target.name.value}`)
    console.log(`${event.target.wow.value}`)
    event.target.name.value = '' // flushes the name value
    event.target.wow.value = '' // flushes the wow value
  }

  return (
    <div className={styles.formStyle}>
      <form id='someForm' onSubmit={handleForm}>
        <div className={styles.colorButtons}>
          {colorarr.map((colorButton) => (
            <button
              aria-label='rainbowButton'
              type='button'
              onClick={() => setColor(colorButton.value)}
              key={`colorButton${colorButton.name}`}
              className={clsx(styles.colorPalette)}
            />
          ))}

          <input
            type='color'
            value={color}
            name='wow'
            className={styles.colorPicker}
            onChange={(e) => {
              setColor(e.target.value)
            }}
          />
        </div>
        <input
          className={styles.categoryName}
          name='name'
          type='text'
          maxLength='20'
          placeholder='categoryname'
          required
        />
        <input type='submit' className={styles.submitButton} />
      </form>
    </div>
  )
}

export default Modalsubmit
