import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function ItemSelector(props) {
  const {
    selected,
    handleSelect,
    isAvailable,
    thumbSrc,
    label,
    variation,
  } = props

  return (
    <div
      className={classNames(
        'vtex-sku-selector__item relative di pointer flex items-center',
        thumbSrc && 'vtex-sku-selector__item-image'
      )}
      onClick={handleSelect}>
      <div
        className={classNames(
          'absolute frame-around b--action-primary br3 bw1',
          selected && 'ba'
        )}
      />
      <div
        className={classNames(
          'w-100 h-100 ba br2 b b--muted-4 z-1 c-muted-5 flex items-center overflow-hidden',
          selected || 'hover-b--muted-2'
        )}>
        <div
          className={classNames(
            'absolute absolute--fill',
            isAvailable || 'diagonal-cross'
          )}
        />
        <div className={classNames(thumbSrc || 'c-on-base center pl5 pr5 z-1')}>
          {thumbSrc ? <img src={thumbSrc} alt={label} /> : label}
        </div>
      </div>
    </div>
  )
}

ItemSelector.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
  thumbSrc: PropTypes.string,
  isAvailable: PropTypes.bool,
  variation: PropTypes.string,
}
export default ItemSelector
