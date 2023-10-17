import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputFieldProps {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  errorMessage?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoCompelete?: string
}
const InputField = ({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoCompelete
}: InputFieldProps) => {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        autoComplete={autoCompelete}
        className='p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
      />
      <div className='my-2 text-red-600 min-h-[1.1rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

export default InputField
