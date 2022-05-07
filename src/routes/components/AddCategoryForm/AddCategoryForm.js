import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './AddCategoryForm.module.scss'

function AddCategoryForm({
  selectedColor, colorBtnRef, inputRef, 
  handleClickColorDot, handleCategorySubmit
}) {
  const [showSubmitBtn, setShowSubmitBtn] = useState(false)
  const handleInputValidate = e => {
    const { value } = e.currentTarget
    if(value.length > 0) setShowSubmitBtn(true)
    else setShowSubmitBtn(false)
  }

  return(
    <form onSubmit={handleCategorySubmit} className={styles.form}>
      <button 
        type='button'
        value={selectedColor}
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
  colorBtnRef: PropTypes.oneOfType([
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ]),
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ]),
  handleClickColorDot: PropTypes.func.isRequired,
  handleCategorySubmit: PropTypes.func.isRequired
}

export default AddCategoryForm