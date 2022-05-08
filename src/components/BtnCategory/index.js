import PropTypes from 'prop-types'
import styles from './BtnCategory.module.scss'

function BtnCategory({
  handleClickCategoryBtn, todo, data, 
  selectCategoryName, selectCategoryColor
}) {

  return (
    <button type='button' className={styles.categoryBtn} onClick={handleClickCategoryBtn}>
      <div 
      className={styles.cateGoryCircle}
      style={{border: `3px solid ${todo ? 'red' : selectCategoryColor}`}}
      />
      {todo
        ? data[0].data.category.filter((categoryItem) => categoryItem.id === todo.categoryId)[0].categoryName
        : selectCategoryName}
    </button>
  )
}

BtnCategory.propTypes = {
  handleClickCategoryBtn: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired
  }),
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
  selectCategoryName: PropTypes.func.isRequired,
  selectCategoryColor: PropTypes.func.isRequired
}

export default BtnCategory
