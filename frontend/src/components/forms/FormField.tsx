import { useId } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  type?: string;
}

export function FormField({
  label,
  value,
  onChange,
  autoComplete,
  className,
  multiline = false,
  placeholder,
  required = false,
  rows = 3,
  type = 'text',
}: FormFieldProps) {
  const id = useId();
  const inputClassName = `field-input mt-1.5${multiline ? ' resize-none' : ''}`;

  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          required={required}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={inputClassName}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          required={required}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          className={inputClassName}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
