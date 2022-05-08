import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './AddCategoryForm.module.scss'

function AddCategoryForm({selectedColor, setShowCategoryColors, setTodoData, todoData, data, setAddCategoryStatus}) {
  const colorBtnRef = useRef(null)
  const inputRef = useRef(null)

  const [showSubmitBtn, setShowSubmitBtn] = useState(false)

  const handleInputValidate = e => {
    const { value } = e.currentTarget
    if(value.length > 0) setShowSubmitBtn(true)
    else setShowSubmitBtn(false)
  }

  const handleClickColorDot = () => {setShowCategoryColors(prev => !prev)}
  const handleCategorySubmit = e => {
    e.preventDefault()
    const color = colorBtnRef.current.value
    const categoryName = inputRef.current.value
    const id = `${new Date().getMilliseconds() + categoryName}`
    const newArr = [...todoData[0].data.category, {id, categoryName, color}]
    data[0].data.category = newArr
    setTodoData(data)
    setAddCategoryStatus(true)
  }

  return(
    <form onSubmit={handleCategorySubmit} className={styles.form}>
      <button 
        type='button'
        defaultValue={selectedColor}
        ref={colorBtnRef}
        className={styles.addCategoryColor} 
        onClick={handleClickColorDot}
        style={{backgroundColor: selectedColor}}
      >{}</button>
      <input 
        type='text'
        ref={inputRef} 
        placeholder='Enter a category.'
        maxLength='15'
        onChange={handleInputValidate}
      />
      {showSubmitBtn && <button type='submit'>Add</button>}
    </form>
  )
}

AddCategoryForm.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  setShowCategoryColors: PropTypes.func.isRequired,
  setTodoData: PropTypes.func.isRequired,
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
  data: PropTypes.arrayOf(
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
  setAddCategoryStatus: PropTypes.func.isRequired
}

export default AddCategoryForm