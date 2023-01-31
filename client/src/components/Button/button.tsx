import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = (props: ButtonProps) => {
  const { children, onClick, className, type } = props

  return (
    <button onClick={onClick} className={className} type={type}>
      <span>{children}</span>
    </button>
  )
}

export default Button
