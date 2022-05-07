import styles from './ColorList.module.scss'
import { BsPlusCircle } from 'react-icons/bs'
import { useState } from 'react'

const COLORS = [
  ['#d4697b', '#d27a56', '#d1a345', '#53a787', '#566dda'],
  ['#8450da', '#787d84', '#f7d7de', '#f8dbcb', '#f7eeb3', 
    '#d4f3d6', '#d0e1fc', '#e0d1f7', '#d9dbdb']
]

function ColorList(props) {
  const [showMoreColors, setShowMoreColors] = useState(false)
  
  const handleShowMoreColors = () => {setShowMoreColors(prev => !prev)}
  const handleClickColor = (e) => {
    const {value} = e.currentTarget
    // props.setSelectedColor(value)
    setShowMoreColors(false)
  }

  return (
    <section className={styles.colorsWrapper}>
      {COLORS[0].map(color => 
        <button 
          type='button'
          key={color}
          value={color} 
          className={styles.dot}
          onClick={handleClickColor} 
          style={{backgroundColor: color}}>{}
        </button>
      )}
      {showMoreColors 
      ? COLORS[1].map(color => 
        <button 
          type='button'
          key={color} 
          value={color} 
          className={styles.dot}
          onClick={handleClickColor}  
          style={{backgroundColor: color}}>{}
        </button>
      )
      : <button type='button' onClick={handleShowMoreColors}>
        <BsPlusCircle size='28' />
      </button>
      }
    </section>
  )
}

export default ColorList