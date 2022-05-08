import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import AddCategoryModalSubmit from '../addCategoryModal/addCategoryModalSubmit'
// import ModalAddCategory from '../ModalAddCategory'
import styles from './Categories.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BsCalendarDate, BsPlusLg } from 'react-icons/bs'
// import { fakeLocalStorageData } from '../../dummyData'
import { getUserByUserId, updateAllData, getAllData } from '../../utils/data/localStorage'
import EditCategoryModal from '../EditCategoryModal/index'
import { useEditCategoryModal } from '../../hooks/EditCategoryModal'

function Categories({userId, nickName, setTodoListState}) {
  //   const location = useLocation()
  //   const { userId, isNewUser } = location.state
  const isNewUser = false // user dummy data
  const loginUserId = userId
  const [userNickName, setUserNickName] = useState('')
  const [todoList, setTodoList] = useState([])
  const [categoryArray, setCategoryArray] = useState([])
  const [categoryIdArray, setCategoryIdArray] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [category, setCategory] = useState([])
  let array = []

  const [isShow, selectedCategory, open, close, edit, remove] = useEditCategoryModal (nickName)

  const sliderSettings = {
    dots: false,
    infinite: categoryArray?.length > 2,
    arrows: false,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  useEffect(() => {
    // window.localStorage.setItem('todo', JSON.stringify(fakeLocalStorageData)) // fakeData set
    const storageData = getUserByUserId(loginUserId)
    setTodoList(storageData)
    setCategory(storageData.data.category)
  }, [])

  useEffect(() => {
    const categoryIds = todoList?.data?.category.map((el) => el.id)
    setCategoryIdArray(categoryIds)
  }, [todoList])

  const getCategoryArray = () => {
    // 카테고리 아이디별로 투두를 담은 어레이
    for (let i = 0; i < categoryIdArray?.length; i += 1) {
      const categoryId = categoryIdArray[i]
      const result = todoList?.data?.todoList?.filter((el) => el.categoryId === categoryId && el)
      array.push(result)
    }
    setCategoryArray(array)
  }

  useEffect(() => {
    getCategoryArray()
  }, [categoryIdArray])

  const getUserNickNameByUserId = (value) => {
    const allData = localStorage.getItem('todo')
    return JSON.parse(allData).find((el) => el.id === value).userNickName
  }

  useEffect(() => {
    setUserNickName(getUserNickNameByUserId(loginUserId))
  }, [loginUserId])

  const handleClickClose = () => {
    setShowModal((prev) => !prev)
  }

  const setCategoryInLocalStorage = () => {
    const allData = getAllData()
    allData.forEach((user) => {
      if (user.id === loginUserId) {
        user.data = todoList.data
      }
    })
    updateAllData(allData)
  }

  const updateTodoList = (uniqueId, selectedColor, categoryName) => {
    todoList.data.category.push({
      ['id']: uniqueId,
      ['categoryName']: categoryName,
      ['color']: selectedColor,
    })
    setCategoryInLocalStorage()
  }

  const handleClickAdd = (selectedColor, categoryName) => {
    const uniqueId = new Date().getMilliseconds() + categoryName
    setCategory((prev) => [
      ...prev,
      {
        ['id']: uniqueId,
        ['categoryName']: categoryName,
        ['color']: selectedColor,
      },
    ])
    setCategoryIdArray((prev) => [...prev, uniqueId])
    updateTodoList(uniqueId, selectedColor, categoryName)
    setShowModal((prev) => !prev)
  }

  const getCategoryTotalTask = (cId) => {
    return categoryArray?.filter((el, i) => el && el[0]?.categoryId === cId && el?.length)[0]?.length
  }

  const getCategoryDoneCount = (cId) => {
    const result = categoryArray?.filter((el, i) => el && el[0]?.categoryId === cId && el[0])
    return result[0]?.filter((el, i) => el && el.isDone && el)?.length
  }


  return (
    <div className={styles.top}>
      <div className={styles.calendarBox}>
        <Link to={{ pathname: '/calendar', userId: loginUserId }}>
          <BsCalendarDate size='24' className={styles.calendarIcon} />
        </Link>
      </div>
      <h1>
        {isNewUser ? 'Welcome' : "What's Up"},
        <br />
        {userNickName}
      </h1>
      <h3>CATEGORIES</h3>
      <div className={styles.categoriesBox}>
        <Slider {...sliderSettings}>
          {category.map((el, i) => (
            <button onClick={() => open(el)} type='button' key={`category-${i}`} className={styles.category}>
              <ul>
                <li className={styles.count}>{getCategoryTotalTask(el.id)} TASK</li>
                <li className={styles.categoryName}>{el.categoryName}</li>
                <progress
                  className={styles.bar}
                  value={getCategoryDoneCount(el.id)}
                  max={getCategoryTotalTask(el.id)}
                />
              </ul>
            </button>
          ))}
          <button type='button' className={styles.category} onClick={handleClickClose}>
            <BsPlusLg className={styles.categoryPlus} />
          </button>
        </Slider>
      </div>
      {/* {showModal && (
        <ModalAddCategory showModal={showModal} handleClickClose={handleClickClose} handleClickAdd={handleClickAdd} />
      )} */}
      <EditCategoryModal 
        isShow={isShow} 
        category={selectedCategory} 
        close={close} 
        edit={edit} 
        remove={remove}
        setCategory={setCategory} 
        setTodoListState={setTodoListState}
      />
    </div>
  )
}

Categories.propTypes = {
  userId: PropTypes.string.isRequired,
  nickName: PropTypes.string.isRequired,
  setTodoListState: PropTypes.func.isRequired,
}

export default Categories
