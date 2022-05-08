import styles from './AddCategoryModal.module.scss'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export default function Modal(props) {
  const { open, close, children } = props
  return (
    <div className={clsx(styles.modal, { [styles.openModal]: Boolean(open) })}>
      {open ? (
        <section className={styles.outerModal}>
          <div className={styles.innerModal}>
            <button type='button' className={styles.close} onClick={close} aria-label='close' />
          </div>
          <main>{children}</main>
        </section>
      ) : null}
    </div>
  )
}
Modal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node,
}
