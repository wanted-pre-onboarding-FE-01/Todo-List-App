import { useState } from 'react'
import { editCategory, removeCategory, getUserByNickName } from '../utils/data/localStorage'

const INIT_CATEGORY = {id: -1, categoryName: '', color: '#FFFFFF'}

export const useEditCategoryModal = (nickName) => {
  const [isShow, setIsShow] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(INIT_CATEGORY)

  const open = (category) => {
    setIsShow(true)
    setSelectedCategory(category)
  }

  const close = () => {
    setIsShow(false)
  }

  const edit = (id, newCategoryName, newColor, setCategory, setCategoryName) => {
    editCategory(nickName, {id, newCategoryName, newColor})
    const storageData = getUserByNickName(nickName)
    setCategory(storageData.data.category)
    setCategoryName('')
    close()
  }

  const remove = (categoryId, setCategory, setCategoryName) => {
    removeCategory(nickName, categoryId)
    const storageData = getUserByNickName(nickName)
    setCategory(storageData.data.category)
    setCategoryName('')
    close()
  }

  return [isShow, selectedCategory, open, close, edit, remove]
}