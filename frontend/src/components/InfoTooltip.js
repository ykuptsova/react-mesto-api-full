import statusOk from '../images/status-ok.svg'
import statusNok from '../images/status-nok.svg'

function InfoTooltip(props) {
  const className = `info-tooltip ${
    props.visible ? 'info-tooltip_visible' : ''
  }`
  return (
    <div className={className}>
      <div className="info-tooltip__container">
        <img
          className="info-tooltip__image"
          alt="Статус"
          src={props.status === 'ok' ? statusOk : statusNok}
        />
        <div className="info-tooltip__title">{props.title}</div>
        <button
          type="button"
          className="info-tooltip__close-button"
          onClick={props.onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip
