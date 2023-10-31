import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  autoCompelete?: string
}

export default function InputField({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoCompelete,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow',
  classNameError = 'my-2 text-red-600 min-h-[1.1rem] text-sm'
}: InputFieldProps) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoCompelete}
        className={classNameInput}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
