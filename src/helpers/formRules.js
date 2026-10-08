const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[A-Za-zÀ-ɏ][A-Za-zÀ-ɏ .'-]*$/;
const phonePattern = /^\+?[0-9\s-]+$/;

export const isValidEmail = (value) => emailPattern.test(value.trim());
export const isValidName = (value) => namePattern.test(value.trim());

export const isValidPhone = (value) => {
  const text = value.trim();
  if (!phonePattern.test(text)) return false;
  const digitCount = text.replace(/\D/g, '').length;
  return digitCount >= 10 && digitCount <= 13;
};

export const validateOrderCheckoutField = (name, value) => {
  const text = value.trim();

  if (name === 'fullName') {
    if (text === '') return 'Tell us who will receive the order.';
    if (text.length < 3) return 'Please enter at least 3 characters.';
    if (!isValidName(text)) return 'Use letters, spaces, periods, apostrophes, or hyphens only.';
    if (text.split(/\s+/).length < 2) return 'Please include both first and last name.';
    return '';
  }

  if (name === 'email') {
    if (text === '') return 'Add an email address so we can send your order details.';
    if (!isValidEmail(text)) return 'That email format does not look right. Try name@example.com.';
    return '';
  }

  if (name === 'phone') {
    if (text === '') return 'Add a phone number the courier can reach.';
    if (!phonePattern.test(text)) return 'Use digits, spaces, +, or - only.';
    if (!isValidPhone(text)) return 'Please enter a phone number with 10 to 13 digits.';
    return '';
  }

  if (name === 'address') {
    if (text === '') return 'Add the complete address for delivery.';
    if (text.length < 10) return 'Please provide a more complete delivery address.';
    return '';
  }

  if (name === 'paymentMethod') {
    if (value !== 'Cash on Delivery') return 'Choose a payment option to continue.';
    return '';
  }

  return '';
};

export const validateOrderCheckoutForm = (formData) => {
  const fields = ['fullName', 'email', 'phone', 'address', 'paymentMethod'];
  const errors = {};
  fields.forEach((field) => {
    const message = validateOrderCheckoutField(field, formData[field]);
    if (message !== '') errors[field] = message;
  });
  return errors;
};
