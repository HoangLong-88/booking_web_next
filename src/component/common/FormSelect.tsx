'use client'

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  name: string
  value: string
  options: Option[]
  placeholder?: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function FormSelect({
  name,
  value,
  options,
  placeholder = 'Select option',
  required = false,
  onChange
}: FormSelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="border rounded px-3 py-2 w-full"
    >
      <option value="">{placeholder}</option>

      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
