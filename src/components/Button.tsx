import * as React from 'react'
import { Buttons } from 'models/Button'
import capitalize from 'utils/capitalize'
import classnames from 'utils/classnames'
import './Button.scss'

interface ButtonProps {
  value: Buttons;
}

const Button: React.FC<ButtonProps> = (props) => {
  const buttonClass = classnames({
    button: true,
    results: props.value === Buttons.RESULTS,
    finalize: props.value === Buttons.FINALIZE,
    reset: props.value === Buttons.RESET,
    'button-font': props.value === Buttons.RESULTS || props.value === Buttons.RESET,
    'button-thin-font': props.value === Buttons.FINALIZE
  })

  return (
    <button className={buttonClass} type='button'>
      {capitalize(props.value.toLowerCase())}
    </button>
  )
}

export { Button }
