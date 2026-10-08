import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentShell from '../components/ContentShell';
import EmptyResults from '../components/EmptyResults';
import { formatDate, formatPrice } from '../helpers/displayTools';
import { getBasketCount } from '../helpers/basketTools';
import { orderPropType } from '../helpers/typeRules';

function OrderHistory({ orders }) {
  if (orders.length === 0) {
    return (
      <ContentShell>
        <div className="rounded-xl border border-[#eadcf2] bg-white px-6 py-8 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">Past purchases</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Order history</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-500">Once you place an order, its details and current status will stay here.</p>
        </div>
        <div className="mt-8">
          <EmptyResults
            icon="box"
            title="No orders to show"
            message="Your completed checkout details will appear here after your first purchase."
            actionLabel="Choose a cheesecake"
            actionTo="/"
          />
        </div>
      </ContentShell>
    );
  }

  return (
    <ContentShell>
      <div className="rounded-xl border border-[#eadcf2] bg-white p-7 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">Past purchases</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Order history</h1>
        <p className="mt-3 text-sm text-slate-500">A quick look at the cheesecakes you have ordered from Chijeu Keikeu.</p>
      </div>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <article key={order.id} className="overflow-hidden rounded-xl border border-[#eadcf2] bg-white">
            <div className="flex flex-col justify-between gap-4 bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#9a8ca6]">Order reference</p>
                <h2 className="mt-1 text-lg font-extrabold text-[#633b68]">{order.id}</h2>
                <p className="mt-1 text-xs text-slate-500">Placed {formatDate(order.placedAt)}</p>
              </div>
              <span className="w-fit rounded-full bg-[#fff0cf] px-4 py-2 text-xs font-bold text-[#9a6a1b]">{order.status}</span>
            </div>

            <div className="grid gap-5 px-5 py-6 sm:grid-cols-3 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Items</p>
                <p className="mt-1 font-extrabold text-[#633b68]">{getBasketCount(order.items)} {getBasketCount(order.items) === 1 ? 'slice' : 'slices'}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment</p>
                <p className="mt-1 font-bold text-slate-700">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total</p>
                <p className="mt-1 text-xl font-extrabold text-[#633b68]">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-[#f0e6f4] px-5 py-4 sm:flex-row sm:items-center sm:px-7">
              <p className="text-xs text-slate-500">Delivery for {order.customer.fullName}</p>
              <Link to={'/order-success/' + order.id} className="rounded-full bg-[#8f7bd8] px-5 py-2.5 text-center text-xs font-bold text-white transition hover:bg-[#735fbf]">
                Open order details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </ContentShell>
  );
}

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
};

export default OrderHistory;
