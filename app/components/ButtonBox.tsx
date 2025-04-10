import React from 'react'

const ButtonBox = ({children,className}) => {
  return (
    <div className={`flex space-x-2 rounded-md items-center px-5 w-full max-sm:z-100 max-sm:w-full ${className}`}>{children}</div>
  )
}

export default ButtonBox