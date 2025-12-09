type InputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  disabled?: boolean
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  disabled = false,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500
        text-sm disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    />
  )
}
