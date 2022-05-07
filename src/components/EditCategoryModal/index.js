import styles from "./EditCategoryModal.module.scss"
import PropTypes from 'prop-types'
import { IoIosClose } from 'react-icons/io'
import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { useColorPicker } from "../../hooks/ColorPicker"

const BRIEF_COLOR_LIST = [ 
  { color: '#d4697b', isCheck: false }, { color: '#d27a56', isCheck: false }, { color: '#d1a345', isCheck: false }, { color: '#53a787', isCheck: false },{ color: '#566dda', isCheck: false }]

function EditCategoryModal({ isShow, category, close, edit, remove, setCategory }) {

  const [colorList, setColorList] = useState(BRIEF_COLOR_LIST)

  const [moreOn, setMoreOn] = useState(false)

  const moreButtonHandler = () => {
    setMoreOn(prev => !prev)
  }

  const [newColor, changeNewColorHandler, addColorHandler] = useColorPicker(BRIEF_COLOR_LIST[0].color, setColorList, setMoreOn)

  const [categoryName, setCategoryName] = useState(category.categoryName)

  const categoryNameChangeHandler = (e) => {
    setCategoryName(e.currentTarget.value)
  }

  const [selectColor, setSelectColor] = useState(category.color)

  const colorSelectHandler = (e) => {
    const {dataset} = e.currentTarget
    setColorList(prev => {
      const newColorList = [...prev]
      newColorList.forEach((val) => { val.color === dataset.id ? val.isCheck = true : val.isCheck = false})
      return newColorList
    })
    setSelectColor(dataset.id)
  }

  return(
    <div className={isShow ? styles.backBoard : styles.modalOff}>
      <div className={styles.main}>
        <div className={styles.closeBtnWrapper}>
          <IoIosClose color="#A8A8A8" className={styles.closeBtn} onClick={close}/>
        </div>
        <ul className={styles.colorCircleList} >
          {colorList.map((color) => 
            <li key={`color_index_${color.color}`} className={styles.colorCircle}>
              <button
                type='button'
                aria-label="Select color"
                className={styles.circle}
                data-id={color.color}
                style={{backgroundColor: color.color, border: color.isCheck && '4px solid #A8A8A8'}} 
                onClick={colorSelectHandler}
              />
            </li>)}
          <li className={styles.colorCircle}>
            <button type='button' className={styles.addColor} onClick={moreButtonHandler} aria-label="More button"/>
          </li>
        </ul>
        <div className={styles.inputWrapper}>
          <input type='text' value={categoryName} maxLength={20} placeholder={category.categoryName} onChange={categoryNameChangeHandler}/>
        </div>
        <div className={styles.btnsWrapper}>
          <button type='button' className={styles.btn} onClick={() => edit(category.id, categoryName, selectColor, setCategory, setCategoryName )}>Edit</button>
          <button type='button' className={styles.btn} onClick={() => remove(category.id, setCategory, setCategoryName)}>Delete</button>
        </div>
        { moreOn && 
        <div className={styles.colorPickerWrapper}>
          <HexColorPicker style={{width: '100px', height: '100px', opacity: '80%'}} color={newColor} onChange={changeNewColorHandler} />
          <button className={styles.colorPickerBtn} type="button" onClick={addColorHandler}>OK</button>
        </div>}
      </div>
    </div>
  )
}

EditCategoryModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    categoryName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  close: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
}

export default EditCategoryModal