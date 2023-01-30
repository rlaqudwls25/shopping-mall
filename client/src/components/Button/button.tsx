import React from 'react'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const Button = (props: ButtonProps) => {
  const { children, onClick, className } = props

  console.log(className)
  return (
    <button onClick={onClick} className={className}>
      <span>{children}</span>
    </button>
  )
}

export default Button
