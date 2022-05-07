import { useState } from 'react'
import { editCategory, removeCategory, getUserByNickName } from '../utils/data/localStorage'

const INIT_CATEGORY = {id: -1, categoryName: '', color: '#FFFFFF'}

export const useEditCategoryModal = (nickName) => {
  const [isShow, setIsShow] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(INIT_CATEGORY)

  const initSelect = (setColorList, setCategoryName, setMoreOn) => {
    setColorList(prev => {
      const data = [...prev]
      data.forEach((category) => {
        category.isCheck = false
      })
      return data
    })
    setCategoryName('')
    setMoreOn(false)
  }

  const open = (category) => {
    setIsShow(true)
    setSelectedCategory(category)
  }

  const close = (setColorList, setCategoryName, setMoreOn) => {
    setIsShow(false)
    initSelect(setColorList, setCategoryName, setMoreOn)
  }

  const edit = (id, newCategoryName, newColor, setCategory, setColorList, setCategoryName, setMoreOn) => {
    editCategory(nickName, {id, newCategoryName, newColor})
    const storageData = getUserByNickName(nickName)
    setCategory(storageData.data.category)
    close(setColorList, setCategoryName, setMoreOn)
  }

  const remove = (categoryId, setCategory, setColorList, setCategoryName, setMoreOn) => {
    removeCategory(nickName, categoryId)
    const storageData = getUserByNickName(nickName)
    setCategory(storageData.data.category)
    close(setColorList, setCategoryName, setMoreOn)
  }

  

  return [isShow, selectedCategory, open, close, edit, remove]
}