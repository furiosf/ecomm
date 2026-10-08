import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import KoreanIcon from '../components/KoreanIcon';
import ContentShell from '../components/ContentShell';
import EmptyResults from '../components/EmptyResults';
import PurchaseSummary from '../components/PurchaseSummary';
import { formatDate } from '../helpers/displayTools';
import { orderPropType } from '../helpers/typeRules';

function ThankYou({ orders }) {
  const { orderId } = useParams();
  const order = orders.find((entry) => entry.id === orderId);

  if (order === undefined) {
    return (
      <ContentShell>
        <EmptyResults icon="box" title="We could not find that order" message="Check the order reference or head back to the menu." actionLabel="Back to menu" actionTo="/" />
      </ContentShell>
    );
  }

  return (
    <ContentShell>
      <div className="rounded-xl border border-[#eadcf2] bg-white px-6 py-8 text-center sm:px-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-emerald-500 shadow-sm">
          <KoreanIcon name="checkCircle" className="h-9 w-9" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">All set</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Your cheesecake order is in!</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
          Thanks, {order.customer.fullName}. We have your order and will prepare it for delivery to the address you provided.
        </p>
        <div className="mx-auto mt-6 w-fit rounded-full bg-[#fff0f7] px-5 py-2 text-sm font-bold text-[#7d3c67]">{order.id}</div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section aria-label="Delivery and order details" className="rounded-xl border border-[#eadcf2] bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-[#633b68]">Delivery snapshot</h2>
          <dl className="mt-6 grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Placed</dt>
              <dd className="mt-1 font-bold text-slate-700">{formatDate(order.placedAt)}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</dt>
              <dd className="mt-1"><span className="rounded-full bg-[#fff1d5] px-3 py-1 text-xs font-bold text-[#9a6a1b]">{order.status}</span></dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Recipient</dt>
              <dd className="mt-1 font-bold text-slate-700">{order.customer.fullName}</dd>
              <dd className="text-slate-500">{order.customer.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</dt>
              <dd className="mt-1 text-slate-700">{order.customer.email}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Deliver to</dt>
              <dd className="mt-1 rounded-lg bg-[#faf6fc] p-4 leading-relaxed text-slate-700">{order.customer.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment</dt>
              <dd className="mt-1 font-bold text-slate-700">{order.paymentMethod}</dd>
            </div>
          </dl>
        </section>

        <PurchaseSummary items={order.items} title="What you ordered" showItems />
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="rounded-full bg-[#8f7bd8] px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-[#735fbf]">Back to the menu</Link>
        <Link to="/orders" className="rounded-full border border-[#dfd3e7] bg-white px-8 py-4 text-center text-sm font-bold text-[#633b68] transition hover:bg-[#f8f1fb]">See my orders</Link>
      </div>
    </ContentShell>
  );
}

ThankYou.propTypes = { orders: PropTypes.arrayOf(orderPropType).isRequired };
export default ThankYou;
