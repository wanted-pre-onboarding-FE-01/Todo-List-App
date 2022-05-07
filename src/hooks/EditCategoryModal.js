import { useState } from 'react'
import { editCategory, removeCategory } from '../utils/data/localStorage'

export const useEditCategoryModal = (nickName) => {
  const [isShow, setIsShow] = useState(false)

  const open = () => {
    setIsShow(isShow)
  }

  const close = () => {
    setIsShow(!isShow)
  }

  const edit = (id, newCategoryName, newColor) => {
    editCategory(nickName, {id, newCategoryName, newColor})
    close()
  }

  const remove = (categoryId) => {
    removeCategory(nickName, categoryId)
    close()
  }

  return [isShow, open, close, edit, remove]
}