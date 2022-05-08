import { useState, useRef } from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'

import BtnAddCategory from '../BtnAddCategory'
import AddCategoryForm from '../AddCategoryForm'
import SelectedCategoryForm from '../SelectedCategoryForm'
import ColorList from '../ColorList'

import PropTypes from 'prop-types'
import styles from './Box.module.scss'

function Box({setBoxOpen, data, setSelectCategoryName, setSelectCategoryColor}) {
  const boxRef = useRef()

  const [todoData, setTodoData] = useState(data)
  const [addCategoryStatus, setAddCategoryStatus] = useState(true)
  const [showCategoryColors, setShowCategoryColors] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#8f99bf')

  useOnClickOutside(boxRef, () => setBoxOpen(false))

  const handleClickAddCategory = () => {setAddCategoryStatus(false)}

  return(
    <div className={styles.box} ref={boxRef}>
      {addCategoryStatus
        ? <BtnAddCategory 
        handleClickAddCategory={handleClickAddCategory}
        />
        : <AddCategoryForm
        selectedColor={selectedColor}
        setShowCategoryColors={setShowCategoryColors}
        setTodoData={setTodoData}
        todoData={todoData}
        data={data}
        setAddCategoryStatus={setAddCategoryStatus}
        />
      }
      {showCategoryColors && 
        <ColorList 
        setShowCategoryColors={setShowCategoryColors} 
          setSelectedColor={setSelectedColor} 
        />}
      <SelectedCategoryForm 
        todoData={todoData}
        setBoxOpen={setBoxOpen}
        setSelectCategoryName={setSelectCategoryName}
        setSelectCategoryColor={setSelectCategoryColor}
      />
    </div>
  )
}

Box.propTypes = {
  setBoxOpen: PropTypes.func.isRequired,
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
  setSelectCategoryName: PropTypes.func.isRequired,
  setSelectCategoryColor: PropTypes.func.isRequired
}

export default Box