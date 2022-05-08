import PropTypes from 'prop-types'
import styles from './BtnCategory.module.scss'

function BtnCategory({
  handleClickCategoryBtn, todo, data, 
  selectCategoryName, selectCategoryColor
}) {

  return (
    <button type='button' className={styles.categoryBtn} value={todo ? '' : `${selectCategoryColor}|${selectCategoryName}`} onClick={handleClickCategoryBtn}>
      {/* 추후에 수정된 내용 들어올 때 value값 고치기 */}
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
  selectCategoryName: PropTypes.string.isRequired,
  selectCategoryColor: PropTypes.string.isRequired
}

export default BtnCategory
