import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentShell from '../components/ContentShell';
import EmptyResults from '../components/EmptyResults';
import CheckoutField from '../components/CheckoutField';
import PurchaseSummary from '../components/PurchaseSummary';
import { formatPrice } from '../helpers/displayTools';
import { getBasketTotal } from '../helpers/basketTools';
import { cartItemPropType } from '../helpers/typeRules';
import { validateOrderCheckoutField, validateOrderCheckoutForm } from '../helpers/formRules';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: 'Cash on Delivery',
};

function OrderCheckout({ cart, onPlaceOrder }) {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const getError = (name) => fieldErrors[name] ?? '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((current) => ({ ...current, [name]: value }));
    if (getError(name) !== '') {
      setFieldErrors((current) => ({ ...current, [name]: validateOrderCheckoutField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldErrors((current) => ({ ...current, [name]: validateOrderCheckoutField(name, value) }));
  };

  const handleInvalid = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const message = validateOrderCheckoutField(name, value) || e.target.validationMessage;
    setFieldErrors((current) => ({ ...current, [name]: message }));
    setCheckoutMessage('A few details still need your attention.');
    if (e.target.form.querySelector(':invalid') === e.target) e.target.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateOrderCheckoutForm(checkoutData);
    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setCheckoutMessage('Please review the highlighted details before confirming your order.');
      return;
    }

    const customer = {
      fullName: checkoutData.fullName.trim(),
      email: checkoutData.email.trim(),
      phone: checkoutData.phone.trim(),
      address: checkoutData.address.trim(),
    };

    const orderId = onPlaceOrder(customer, checkoutData.paymentMethod);
    navigate('/order-success/' + orderId, { flushSync: true });
  };

  if (cart.length === 0) {
    return (
      <ContentShell>
        <div className="rounded-xl border border-[#eadcf2] bg-white px-6 py-8 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">Delivery</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Nothing to send yet</h1>
        </div>
        <div className="mt-8">
          <EmptyResults
            icon="bag"
            title="Your basket is empty"
            message="Choose your cheesecake flavors first, then come back here to arrange delivery."
            actionLabel="Browse the menu"
            actionTo="/"
          />
        </div>
      </ContentShell>
    );
  }

  const hasErrors = Object.values(fieldErrors).some((message) => message !== '');

  return (
    <ContentShell>
      <div className="rounded-xl border border-[#eadcf2] bg-white px-6 py-8 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">Final step</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Delivery details</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
          Tell us where to bring your cheesecake and how our courier can reach you. Every field marked with * is required.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <form id="checkout-form" onSubmit={handleSubmit} className="rounded-xl border border-[#eadcf2] bg-white p-6 sm:p-8" aria-label="Delivery details form">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9a8ca6]">Who is receiving it?</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#633b68]">Contact details</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CheckoutField
              name="fullName"
              label="Recipient name"
              value={checkoutData.fullName}
              error={getError('fullName')}
              hint="Enter the first and last name of the recipient."
              onChange={handleChange}
              onBlur={handleBlur}
              onInvalid={handleInvalid}
              placeholder="Juan Dela Cruz"
              autoComplete="name"
              required
              minLength={3}
              maxLength={60}
            />
            <CheckoutField
              name="email"
              label="Email for updates"
              type="email"
              value={checkoutData.email}
              error={getError('email')}
              hint="We will use this for your order confirmation."
              onChange={handleChange}
              onBlur={handleBlur}
              onInvalid={handleInvalid}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={80}
            />
          </div>

          <div className="mt-6">
            <CheckoutField
              name="phone"
              label="Contact number"
              type="tel"
              value={checkoutData.phone}
              error={getError('phone')}
              hint="Use 10–13 digits. Example: 0912 345 6789 or +63 912 345 6789."
              onChange={handleChange}
              onBlur={handleBlur}
              onInvalid={handleInvalid}
              placeholder="0912 345 6789"
              autoComplete="tel"
              inputMode="tel"
              required
              minLength={10}
              maxLength={16}
            />
          </div>

          <div className="mt-6 border-t border-[#f0e6f4] pt-7">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9a8ca6]">Where should it go?</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#633b68]">Delivery address</h2>
            <div className="mt-5">
              <CheckoutField
                name="address"
                label="Complete address"
                as="textarea"
                value={checkoutData.address}
                error={getError('address')}
                hint="Include house/unit number, street, barangay, city, and province."
                onChange={handleChange}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                placeholder="House 12, Rizal Street, Barangay San Antonio, Pasig City"
                autoComplete="street-address"
                required
                minLength={10}
                maxLength={200}
                rows={4}
              />
            </div>
          </div>

          <div className="mt-7 border-t border-[#f0e6f4] pt-7">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9a8ca6]">How will you pay?</p>
            <fieldset className="mt-4">
              <legend className="sr-only">Payment method</legend>
              <label className="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-[#d9c8eb] bg-[#fcf9ff] p-4 transition has-[:checked]:border-[#8f7bd8] has-[:checked]:bg-[#f7f1ff]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={checkoutData.paymentMethod === 'Cash on Delivery'}
                  onChange={handleChange}
                  onInvalid={handleInvalid}
                  required
                  className="mt-1 h-4 w-4 accent-[#8f7bd8]"
                />
                <span>
                  <span className="block text-sm font-extrabold text-[#633b68]">Cash on Delivery <span className="text-[#d05c92]">*</span></span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-500">Pay the courier in cash when your cheesecake arrives.</span>
                </span>
              </label>
              {getError('paymentMethod') !== '' ? <p role="alert" className="mt-2 text-xs font-semibold text-red-600">{getError('paymentMethod')}</p> : <p className="mt-2 text-xs text-slate-400">Required field</p>}
            </fieldset>
          </div>

          {checkoutMessage !== '' && hasErrors ? (
            <p role="alert" className="mt-7 rounded-2xl bg-[#fff1f4] px-4 py-3 text-sm font-semibold text-[#b54870]">{checkoutMessage}</p>
          ) : null}

          <button type="submit" className="mt-7 w-full cursor-pointer rounded-full bg-[#8f7bd8] py-4 text-sm font-bold text-white transition hover:bg-[#735fbf] active:scale-95">
            Confirm order · {formatPrice(getBasketTotal(cart))}
          </button>
        </form>

        <PurchaseSummary items={cart} title="Your selection" showItems sticky />
      </div>
    </ContentShell>
  );
}

OrderCheckout.propTypes = {
  cart: PropTypes.arrayOf(cartItemPropType).isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default OrderCheckout;
