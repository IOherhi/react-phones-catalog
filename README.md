# Phone Catalog App

# [Demo](https://react-phone-catalog-b5y6.vercel.app)

This is a React app built using modern technologies and interface development approaches.

## Technologies

- **React** + **TypeScript (TSX)**
- **React Router**
- **SCSS Modules**
- **Vite** as the builder
- **IntersectionObserver API**
- **SwiperJS** (basic experience)

## Main Project Structure

- **Home page**: presentation page with a slider and popular products.
- **Category pages**: phones, tablets, accessories. Each of them:

  - Includes filtering
  - Supports pagination (4 / 8 / 16 items per page)

- **Product page**:

  - Product image gallery
  - Color and memory size selection
  - Add to cart or favorites

- **Favorites page**:

  - Shows saved products (phones, tablets, watches)
  - Data is stored in `localStorage`

- **Cart page**:

  - Supports adding/removing products
  - Calculates total sum
  - Data is stored in `localStorage`

- **Responsive design**:
  - Supports three modes: mobile, tablet, desktop
  - Menu is compact but functional

## 🚀 Features

- Add to favorites and cart from any product block displayed
- Uses `IntersectionObserver` to synchronize images on the home page
- Initial implementation of **Swiper** integration (basic functionality working)
- Fully functional **dots navigation** under the main slider on the Home page
- Components are reused across different pages
- Filtering and sorting work through URLSearchParams.
