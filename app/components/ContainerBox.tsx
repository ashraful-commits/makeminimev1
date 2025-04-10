
const ContainerBox = ({children,className}) => {
  return (
    <div className={`h-full w-full flex justify-center items-center flex-col ${className}`}>{children}</div>
  )
}

export default ContainerBox