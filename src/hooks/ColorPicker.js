import { useState } from "react"

export const useColorPicker = (baseColor, setColorList, setMoreOn) => {

  const [newColor, setNewColor] = useState(baseColor)

  const changeNewColorHandler = (e) => {
    setNewColor(e)
  }
  
  const addColorHandler = () => {
    setColorList(prev => [...prev, { color: newColor, isCheck: false }])
    setMoreOn(prev => !prev)
  }

  return [newColor, changeNewColorHandler, addColorHandler]
}