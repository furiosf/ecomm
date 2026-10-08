import PropTypes from 'prop-types';

function CheckoutField({
  name,
  label,
  value,
  onChange,
  onBlur,
  onInvalid,
  error = '',
  hint = '',
  type = 'text',
  as = 'input',
  placeholder = '',
  autoComplete = 'off',
  inputMode = 'text',
  required = false,
  minLength = 0,
  maxLength = 200,
  rows = 3,
}) {
  const inputId = 'field-' + name;
  const errorId = inputId + '-error';
  const hasError = error !== '';
  const base = 'w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-800 outline-hidden transition placeholder:text-slate-300 focus:ring-2 ';
  const inputClass = hasError
    ? base + 'border-red-300 focus:border-red-400 focus:ring-red-100'
    : base + 'border-[#e6dbea] focus:border-[#a88bd8] focus:ring-[#eee6fa]';

  const sharedProps = {
    id: inputId,
    name,
    value,
    onChange,
    onBlur,
    onInvalid,
    placeholder,
    autoComplete,
    required,
    minLength,
    maxLength,
    className: inputClass,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? errorId : undefined,
  };

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-extrabold text-[#633b68]">
        {label}
        {required ? <span className="ml-1 text-[#d05c92]">*</span> : null}
      </label>
      {as === 'textarea' ? <textarea {...sharedProps} rows={rows} /> : <input {...sharedProps} type={type} inputMode={inputMode} />}
      {hasError ? (
        <p id={errorId} role="alert" className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      ) : hint !== '' ? (
        <p className="mt-2 text-xs leading-relaxed text-slate-400">{hint}</p>
      ) : required ? (
        <p className="mt-2 text-xs text-slate-400">Required field</p>
      ) : null}
    </div>
  );
}

CheckoutField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onInvalid: PropTypes.func.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  type: PropTypes.string,
  as: PropTypes.oneOf(['input', 'textarea']),
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  inputMode: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
};

export default CheckoutField;
