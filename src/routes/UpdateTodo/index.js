import { useState } from 'react'

import ColorList from '../components/ColorList'

import styles from './UpdateTodo.module.scss'
import { GrClose } from 'react-icons/gr'
import { BsPlusLg } from 'react-icons/bs'
import { MdKeyboardArrowUp } from 'react-icons/md'

const strData = localStorage.getItem('todo')
const data = JSON.parse(strData)
// 추후에 <li> map() data[0] 수정하기
console.log(data)

function TodoList() {
  const [addCategoryStatus, setAddCategoryStatus] = useState(true)
  const [showCategoryColors, setShowCategoryColors] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#8f99bf')
  const [radioStatus, setRadioStatus] = useState(false)

  const handleClickAddCategory = () => {
    setAddCategoryStatus(false)
  }

  const handleClickColorDot = () => {setShowCategoryColors(prev => !prev)}

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    console.log()
  }

  const handleClickRadioBtn = () => {setRadioStatus(prev => !prev)}

  return (
    <>
      <header className={styles.closeBtnWrapper}>
        <button type='button'>
          <GrClose />
        </button>
      </header>
      <section className={styles.textWrapper}>
        <input type='text' placeholder='Task를 입력해주세요.'/>
      </section>
      <main className={styles.selectedWrapper}>
        <div className={styles.selectedBtnsWrapper}>
          <button type='button'>2022 / 05 / 05</button>
          <button type='button'>
            <div className={styles.cateGoryCircle}/>
            아아아아아아아아아아아아아아아
          </button>
        </div>
        <div className={styles.selectedListWrapper}>
          <div className={styles.box}>
            {addCategoryStatus
              ? <button 
                  type='button' 
                  className={styles.addCategoryBtn} 
                  onClick={handleClickAddCategory}
                >
                <BsPlusLg className={styles.addIcon} />
                <span>Add Category</span>
              </button>
              : 
              <form onSubmit={handleCategorySubmit} className={styles.form}>
                <button 
                  type='button' 
                  className={styles.addCategoryColor} 
                  onClick={handleClickColorDot}
                  style={{color: selectedColor}}
                >{}</button>
                <input 
                  type='text' 
                  placeholder='카테고리를 입력해주세요.'
                  maxLength='15'
                />
                <button type='submit'>
                  aa
                </button>
              </form>
            }
            {showCategoryColors && <ColorList setSelectedColor={setSelectedColor} />}
            <ul className={styles.categoryList}>
              {data[0].data.category.map(category => {
                return (
                  <li key={category.id}>
                    <input 
                      type='radio' 
                      id={category.id} 
                      name='categoryList' 
                      onClick={handleClickRadioBtn} 
                      style={{border: `2px solid ${category.color}`}}
                    />
                    <label htmlFor={category.id}>{category.categoryName}</label>
                  </li>
                )
              })}
            </ul>
          </div>
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
