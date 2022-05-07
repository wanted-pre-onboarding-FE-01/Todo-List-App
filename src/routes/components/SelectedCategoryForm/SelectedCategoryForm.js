import { BsFillCircleFill } from 'react-icons/bs'
import styles from './SelectedCategoryForm.module.scss'

function SelectedCategoryForm({todoData}) {
  return(
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
  )
}

export default SelectedCategoryForm
