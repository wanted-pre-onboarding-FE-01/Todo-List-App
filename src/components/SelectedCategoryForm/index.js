import { useState } from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import PropTypes from 'prop-types'
import styles from './SelectedCategoryForm.module.scss'


function SelectedCategoryForm({
  todoData, setBoxOpen, setSelectCategoryName, setSelectCategoryColor
}) {
  const [color, setColor] = useState('')
  const [name, setName] = useState('')

  const handleChangeInput = e => {
    const [categoryColor, categoryName] = e.currentTarget.value.split('|')
    console.log(categoryColor)
    setColor(categoryColor)
    setName(categoryName)
  }

  const handleSelectCategory = () => {
    setSelectCategoryName(name)
    setSelectCategoryColor(color)
    setBoxOpen(prev => !prev)
  }

  return(
    <>
      <ul className={styles.categoryList}>
        {todoData[0].data.category.map(category => {
          return (
            <li key={category.id}>
              <div className={styles.inputWrapper}>
                <input 
                  type='radio' 
                  id={category.id}
                  defaultValue={`${category.color}|${category.categoryName}`} 
                  name='categoryList'  
                  style={{border: `2px solid ${category.color}`}}
                  onChange={handleChangeInput}
                />
                <BsFillCircleFill fill={category.color} className={styles.checkedIcon}/>
              </div>
              <label htmlFor={category.id}>{category.categoryName}</label>
            </li>
          )
        })}
      </ul>
      <div className={styles.btnWrapper}>
        <button type='button' className={styles.selectBtn} onClick={handleSelectCategory}>Select</button>
      </div>
    </>
  )
}

SelectedCategoryForm.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        category: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            categoryName: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired
          })
        )
      })
    })
  ),
  setBoxOpen: PropTypes.func.isRequired,
  setSelectCategoryName: PropTypes.func.isRequired,
  setSelectCategoryColor: PropTypes.func.isRequired,
}

export default SelectedCategoryForm
