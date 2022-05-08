import PropTypes from 'prop-types'
import styles from './BtnAddCategory.module.scss'
import { BsPlusLg } from 'react-icons/bs'

function BtnAddCategory({handleClickAddCategory}) {
  return (
    <button 
      type='button' 
      className={styles.addCategoryBtn} 
      onClick={handleClickAddCategory}
    >
      <BsPlusLg className={styles.addIcon} />
      <span>Add Category</span>
    </button>
  )
}

BtnAddCategory.propTypes = {
  handleClickAddCategory: PropTypes.func.isRequired
}

export default BtnAddCategory