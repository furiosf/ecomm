export const shopFlavorHeroImage = '/pics/bg.jpg';

export const categories = ['Fruit-Based', 'Rich & Indulgent', 'Biscuit-Based', 'Signature Specials'];

export const defaultShopFilters = {
  search: '',
  category: 'All',
  page: 1,
};

const cake = (id, name, category, price, image, description, details, highlights, isNew, isBestSeller, oldPrice = null) => ({
  id,
  name,
  category,
  price,
  oldPrice,
  stock: 12 + (id % 5) * 2,
  image,
  imageFit: 'cover',
  description,
  details,
  highlights,
  isNew,
  isBestSeller,
});

export const initialProducts = [
  cake(1, 'Strawberry Cheesecake', 'Fruit-Based', 185, '/pics/strawberry.png', 'Creamy cheesecake topped with glossy strawberry sauce and fresh strawberries.', 'A soft, creamy cheesecake with a bright strawberry finish, made for a sweet and refreshing dessert break.', ['Creamy baked cheesecake', 'Strawberry topping and fresh fruit', 'Buttery biscuit crust'], true, true),
  cake(2, 'Mango Cheesecake', 'Fruit-Based', 185, '/pics/mango.png', 'Smooth cheesecake crowned with juicy mango pieces and a sunny mango glaze.', 'A tropical favorite with rich cream cheese balanced by naturally sweet mango for a bright café-style treat.', ['Mango glaze and diced mango', 'Creamy cheesecake filling', 'Golden biscuit crust'], true, true),
  cake(3, 'Blueberry Cheesecake', 'Fruit-Based', 190, '/pics/blueberry.png', 'Velvety cheesecake finished with a generous blueberry compote.', 'Sweet-tart blueberry compote meets a rich cheesecake base for a classic dessert with a fresh berry finish.', ['Blueberry compote topping', 'Smooth cream cheese center', 'Crunchy biscuit base'], false, true),
  cake(4, 'Lemon Cheesecake', 'Fruit-Based', 180, '/pics/lemon.png', 'Bright lemon cheesecake with a silky citrus topping and fresh lemon slices.', 'A refreshing citrus-forward cheesecake with gentle sweetness and a buttery crust.', ['Lemon glaze and zest', 'Silky cheesecake filling', 'Buttery biscuit crust'], false, false),
  cake(5, 'Mango Graham Cheesecake', 'Fruit-Based', 195, '/pics/mango graham.png', 'Mango cheesecake layered with golden graham crumbs for extra crunch.', 'A Filipino-inspired favorite combining creamy cheesecake, ripe mango, and familiar graham goodness.', ['Mango pieces', 'Toasted graham crumb topping', 'Creamy cheesecake layer'], true, true),
  cake(6, 'Chocolate Cheesecake', 'Rich & Indulgent', 195, '/pics/chocolate.png', 'Deep chocolate cheesecake with glossy chocolate topping and curls.', 'A decadent chocolate dessert for cocoa lovers, with a rich filling and chocolate biscuit base.', ['Rich chocolate cheesecake', 'Chocolate ganache finish', 'Chocolate biscuit crust'], false, true),
  cake(7, 'Peanut Butter Cheesecake', 'Rich & Indulgent', 200, '/pics/peanut butter drizzle.png', 'Creamy peanut butter cheesecake finished with chocolate drizzle and crunchy peanuts.', 'A sweet-and-salty combination of smooth peanut butter, cheesecake, and chocolate for a satisfying bite.', ['Peanut butter cheesecake', 'Chocolate drizzle', 'Crunchy peanut topping'], false, false),
  cake(8, 'Caramel Cheesecake', 'Rich & Indulgent', 195, '/pics/caramel.png', 'Silky cheesecake covered in caramel sauce and buttery biscuit crumbs.', 'A cozy caramel-forward cheesecake with layers of creamy texture and a warm buttery finish.', ['Caramel sauce', 'Biscuit crumb topping', 'Creamy baked cheesecake'], false, true),
  cake(9, 'Oreo Cheesecake', 'Biscuit-Based', 190, '/pics/oreo.png', 'Cookies-and-cream cheesecake loaded with crushed chocolate sandwich cookies.', 'A playful cookies-and-cream cheesecake with crunchy cookie pieces in every bite.', ['Crushed chocolate cookies', 'Cookies-and-cream filling', 'Cookie crumb crust'], true, true),
  cake(10, 'Biscoff Cheesecake', 'Biscuit-Based', 200, '/pics/biscoff.png', 'Creamy Biscoff cheesecake topped with caramelized cookie crumbs and sauce.', 'A café-style cheesecake built around the warm caramelized flavor of Biscoff biscuits.', ['Biscoff biscuit crust', 'Cookie crumb topping', 'Biscoff caramel drizzle'], true, true),
  cake(11, 'Matcha Cheesecake', 'Signature Specials', 200, '/pics/matcha.png', 'Earthy matcha cheesecake dusted with fine green tea powder.', 'A Japanese-inspired cheesecake with a balanced matcha aroma, gentle bitterness, and creamy sweetness.', ['Premium-style matcha finish', 'Creamy cheesecake center', 'Light biscuit crust'], false, true),
  cake(12, 'Burnt Basque Cheesecake', 'Signature Specials', 210, '/pics/burnt basque.png', 'Caramelized Basque cheesecake with a deeply browned top and custardy center.', 'Our signature rustic cheesecake, baked hot for a dark caramelized top and soft, creamy middle.', ['Deeply caramelized top', 'Custardy center', 'Rustic Basque-style finish'], true, true),
];
