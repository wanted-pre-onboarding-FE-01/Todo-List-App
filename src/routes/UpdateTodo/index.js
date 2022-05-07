import { useState, useEffect, useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import AddCategoryForm from '../components/AddCategoryForm/AddCategoryForm'
import SelectedCategoryForm from '../components/SelectedCategoryForm/SelectedCategoryForm'
import ColorList from '../components/ColorList/ColorList'

import styles from './UpdateTodo.module.scss'
import { GrClose } from 'react-icons/gr'
import { BsPlusLg, BsFillCircleFill } from 'react-icons/bs'
import { MdKeyboardArrowUp } from 'react-icons/md'

const strData = localStorage.getItem('todo')
const data = JSON.parse(strData)
// 변경하기 : data[0], tempId
console.log(data)

function TodoList() {
  const boxRef = useRef()
  const colorBtnRef = useRef(null)
  const inputRef = useRef(null)

  const [todoData, setTodoData] = useState(data)
  const [isBoxOpen, setBoxOpen] = useState(false)
  const [addCategoryStatus, setAddCategoryStatus] = useState(true)
  const [showCategoryColors, setShowCategoryColors] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#8f99bf')

  useOnClickOutside(boxRef, () => setBoxOpen(false))

  const handleClickCategoryBtn = () => {setBoxOpen(prev => !prev)}
  
  const handleClickAddCategory = () => {
    setAddCategoryStatus(false)
  }

  const handleClickColorDot = () => {setShowCategoryColors(prev => !prev)}

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    const color = colorBtnRef.current.value
    const categoryName = inputRef.current.value
    const id = `${new Date().getMilliseconds() + categoryName}`
    const newArr = [...todoData[0].data.category, {id, categoryName, color}]
    data[0].data.category = newArr
    setTodoData(data)
    setAddCategoryStatus(true)
  }

  return (
    <>
      <header className={styles.closeBtnWrapper}>
        <button type='button'>
          <GrClose />
        </button>
      </header>
      <section className={styles.textWrapper}>
        <input type='text' placeholder='Enter new task.'/>
      </section>
      <main className={styles.selectedWrapper}>
        <div className={styles.selectedBtnsWrapper}>
          <button type='button'>2022 / 05 / 05</button>
          <button type='button' onClick={handleClickCategoryBtn}>
            <div className={styles.cateGoryCircle}/>
            Select Category
          </button>
        </div>
        <div className={styles.selectedListWrapper}>
          {isBoxOpen &&
            <div className={styles.box} ref={boxRef}>
              {addCategoryStatus
                ? <button 
                    type='button' 
                    className={styles.addCategoryBtn} 
                    onClick={handleClickAddCategory}
                  >
                  <BsPlusLg className={styles.addIcon} />
                  <span>Add Category</span>
                </button>
                : <AddCategoryForm
                selectedColor={selectedColor}
                colorBtnRef={colorBtnRef}
                inputRef={inputRef}
                handleClickColorDot={handleClickColorDot}
                handleCategorySubmit={handleCategorySubmit}
                />
                
              }
              {showCategoryColors && 
                <ColorList 
                setShowCategoryColors={setShowCategoryColors} 
                  setSelectedColor={setSelectedColor} 
                />}
              <ul className={styles.categoryList}>
                {todoData[0].data.category.map(category => {
                  return (
                    <li key={category.id}>
                      <div className={styles.inputWrapper}>
                        <input 
                          type='radio' 
                          id={category.id} 
                          name='categoryList' 
                          style={{border: `2px solid ${category.color}`}}
                        />
                        <BsFillCircleFill fill={category.color} className={styles.checkedIcon}/>
                      </div>
                      <label htmlFor={category.id}>{category.categoryName}</label>
                    </li>
                  )
                })}
              </ul>
              <button type='button'>add</button>
            </div>
          }
        </div>
      </main>
      <footer>
        <button type='button' className={styles.addNewTeskBtn}>
          <span>New task</span>
          <MdKeyboardArrowUp size='25' className={styles.arrowBtn} />
        </button>
      </footer>
    </>
  )
}

export default TodoList
