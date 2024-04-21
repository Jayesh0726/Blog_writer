import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 text-lg text-slate-500 font-semibold pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-3 rounded-xl bg-slate-100 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            style={{
                boxShadow: '2px 2px 10px rgba(88, 88, 88, 0.39),inset -2px -2px 10px rgba(225, 225, 225, 0.5)',
              }}
            />
        </div>
    )
})

export default Input