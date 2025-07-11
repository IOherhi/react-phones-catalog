import { togglePhoneInStorage } from '../../../../../../utils/togglePhone';
import { addInCart } from '../../../../../../utils/addInCart';
import { Product } from '../../../../../../types/Product';
import classNames from 'classnames';
import './DetailsBlocks.scss';
import { useMemo } from 'react';
import { normalizeColor } from '../../../../../../utils/normalizeColors';
import { COLOR_MAP } from '../../../../../../utils/colorMap';

interface Props {
  product: Product;
  phonesStorge: Product[] | [];
  setCapacity: (p: string) => void;
  changeColor: (p: string) => void;
  activeColor: string;
  elementsCart: Product[] | [];
  newProduct: Product | null;
  allStore: Product[][];
  activeCapacity: string;
  setElementsCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setPhonesStorge: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const DeatailsIamges: React.FC<Props> = ({
  activeColor,
  changeColor,
  product,
  phonesStorge,
  setCapacity,
  elementsCart,
  allStore,
  newProduct,
  activeCapacity,
  setElementsCart,
  setPhonesStorge,
}) => {
  const isInCart = useMemo(() => {
    if (!newProduct) {
      return;
    }

    const inCartObject = elementsCart.find(
      el =>
        el.id === newProduct.id &&
        el.capacity === newProduct.capacity &&
        el.color === newProduct.color,
    );

    if (!inCartObject) {
      return false;
    }

    return true;
  }, [newProduct, elementsCart]);

  const price = useMemo(() => {
    const store = allStore.find(store => {
      return store.find(
        obj =>
          obj.category === product.category && obj.capacity === activeCapacity,
      );
    });

    const obj = store?.find(obj => {
      return (
        obj.category === product.category && obj.capacity === activeCapacity
      );
    });

    return {
      priceRegular: obj?.priceRegular,
      priceDiscount: obj?.priceDiscount,
    };
  }, [activeCapacity, allStore]);

  return (
    <div className="product-details__blocks">
      <div className="product-colors">
        <div className="product-colors__top">
          <p className="product-colors__top-p">Available colors</p>
          <p className="product-colors__top-id">ID: 802390</p>
        </div>

        <ul className="product-colors__list">
          {product.colorsAvailable.map(color => {
            const updatedColor = normalizeColor(color);

            const hexValue = COLOR_MAP[color] || '';

            return (
              <li
                key={updatedColor}
                className={classNames('product-colors__list-item', {
                  'set-active-color': activeColor === updatedColor,
                })}
                onClick={() => {
                  changeColor(updatedColor);
                }}
              >
                <div
                  className="list-item__content"
                  style={{
                    backgroundColor: hexValue,
                  }}
                ></div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="product-capacity">
        <p className="product-capacity__p">Select capacity</p>

        <ul className="product-capacity__list">
          {product.capacityAvailable.map(capacity => {
            return (
              <li
                key={capacity}
                className={classNames('product-capacity__list-item', {
                  'set-active-capacity': activeCapacity === capacity,
                })}
                onClick={() => {
                  setCapacity(capacity);
                }}
              >
                {capacity}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="product-price">
        <div className="product-price__prices">
          <p className="product-price__prices-regular">${price.priceRegular}</p>

          <p className="product-price__prices-discount">
            ${price.priceDiscount}
          </p>
        </div>

        <div className="product-price__buttons ">
          <button
            className={classNames('product-price__buttons-cart', {
              'element-in-cart': isInCart,
            })}
            onClick={() => {
              if (newProduct) {
                const elements = addInCart(newProduct);

                setElementsCart(elements);
              }
            }}
          >
            Add to cart
          </button>

          <button
            className="product-price__buttons-favourites"
            onClick={() => {
              const updated = togglePhoneInStorage(product, 'phones');

              setPhonesStorge(updated);
            }}
          >
            <div
              className={classNames('product-price__buttons-favourites-icon', {
                'is-phone-favourites': phonesStorge?.some(
                  item => item.id === product.id,
                ),
              })}
            ></div>
          </button>
        </div>
      </div>

      <ul className="characteristics">
        <li className="characteristics__item">
          <div>Screen</div>
          <div>{product.screen}</div>
        </li>
        <li className="characteristics__item">
          <div>Resolution</div>
          <div>{product.resolution}</div>
        </li>
        <li className="characteristics__item">
          <div>processor</div>
          <div>{product.processor}</div>
        </li>
        <li className="characteristics__item">
          <div>RAM</div>
          <div>{product.ram}</div>
        </li>
      </ul>
    </div>
  );
};
