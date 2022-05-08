import styles from './BtnClose.module.scss'
import PropTypes from 'prop-types'
import { GrClose } from 'react-icons/gr'

function BtnClose({handleClickClose}) {
  return(
    <header className={styles.closeBtnWrapper}>
      <button type='button' onClick={handleClickClose}>
        <GrClose />
      </button>
    </header>
  )
}

BtnClose.propTypes = {
  handleClickClose: PropTypes.func.isRequired
}

export default BtnClose
