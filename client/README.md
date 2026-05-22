# Product, Cart & Order — Redux State Management

## Summary

This PR adds Redux state management for **products**, **cart**, and **orders** in the e-commerce client. Async actions use Redux Thunk and Axios (`apiConfig`) to call the backend. The Redux store is extended with three new reducers alongside the existing auth slice.

## Changes Made

### Redux Store (`client/src/state/store.js`)

- Registers `product`, `cart`, and `order` reducers with `combineReducers`
- Keeps existing `auth` reducer unchanged
- Uses `legacy_createStore` with `redux-thunk` middleware

```javascript
const rootReducer = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
});
```

---

### Product State (`client/src/state/product/`)

| File            | Purpose                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| `ActionType.js` | Request / success / failure constants for product APIs                   |
| `Action.js`     | Thunk action creators for listing and fetching products                  |
| `Reducer.js`    | `customerProductReducer` — products list, single product, loading, error |

**Actions**

| Action                     | API                                       | Description                                                                                  |
| -------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `findProducts(reqData)`    | `GET /api/product/products`               | Filtered, paginated product list (category, color, size, price, discount, stock, sort, page) |
| `findProductById(reqData)` | `GET /api/product/product/id/{productId}` | Single product by ID                                                                         |

**State shape**

```javascript
{
  product: {
    prodcuts: [],   // product list from findProducts
    product: null,  // single product from findProductById
    loading: false,
    error: null
  }
}
```

---

### Cart State (`client/src/state/cart/`)

| File            | Purpose                                          |
| --------------- | ------------------------------------------------ |
| `ActionType.js` | Cart CRUD action type constants                  |
| `Action.js`     | Thunk actions for cart operations                |
| `Reducer.js`    | `cartReducer` — cart, cart items, loading, error |

**Actions**

| Action                    | API                                  | Description                              |
| ------------------------- | ------------------------------------ | ---------------------------------------- |
| `getCart()`               | `GET /api/cart`                      | Load current user cart                   |
| `addItemToCart(reqData)`  | `POST /api/cart/add`                 | Add item (`reqData.data`)                |
| `removeCartItem(reqData)` | `DELETE /api/cart_item/{cartItemId}` | Remove line item                         |
| `updateCartItem(reqData)` | `PUT /api/cart_item/{cartItemId}`    | Update quantity/details (`reqData.data`) |

**State shape**

```javascript
{
  cart: {
    cart: null,
    cartItems: [],
    loading: false,
    error: null
  }
}
```

---

### Order State (`client/src/state/order/`)

| File            | Purpose                                                     |
| --------------- | ----------------------------------------------------------- |
| `ActionType.js` | Create order and fetch-by-id action types                   |
| `Action.js`     | Thunk actions for placing and viewing orders                |
| `Reducer.js`    | `orderReducer` — orders list, current order, loading, error |

**Actions**

| Action                  | API                        | Description                                              |
| ----------------------- | -------------------------- | -------------------------------------------------------- |
| `createOrder(reqData)`  | `POST /api/order`          | Place order with `reqData.address`; navigates on success |
| `getOrderById(orderId)` | `GET /api/order/{orderId}` | Fetch order details                                      |

**State shape**

```javascript
{
  order: {
    orders: [],
    order: null,
    loading: false,
    error: null
  }
}
```

---

## Redux Data Flow

```
Component (dispatch)
    ↓
Thunk Action (Action.js)
    ↓
dispatch(REQUEST) → Reducer sets loading
    ↓
Axios API call (apiConfig.js, Bearer JWT)
    ↓
dispatch(SUCCESS | FAILER) → Reducer updates state
    ↓
useSelector in component re-renders
```

## API Configuration

- Base URL: `http://localhost:5454` (`client/src/config/apiConfig.js`)
- Requests include `Authorization: Bearer <jwt>` from `localStorage`

## Usage in Components

```javascript
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../state/product/Action";
import { getCart, addItemToCart } from "../state/cart/Action";
import { createOrder } from "../state/order/Action";

const dispatch = useDispatch();
const { product, cart, order } = useSelector((store) => store);

dispatch(findProducts({ pageNumber: 0, pageSize: 10 }));
dispatch(getCart());
dispatch(addItemToCart({ data: { productId, size, quantity } }));
dispatch(createOrder({ address, navigate }));
```

## Files Added / Updated

```
client/src/state/store.js
client/src/state/product/ActionType.js
client/src/state/product/Action.js
client/src/state/product/Reducer.js
client/src/state/cart/ActionType.js
client/src/state/cart/Action.js
client/src/state/cart/Reducer.js
client/src/state/order/ActionType.js
client/src/state/order/Action.js
client/src/state/order/Reducer.js
```

## Prerequisites

- Backend running on port `5454`
- User logged in (JWT in `localStorage`) for cart and order endpoints

## Getting Started

```bash
cd client
npm install
npm start
```
