import React, {useState} from 'react';
import s from './Drawer.module.scss';

import buttonRemoveIcon from '@/assets/images/button-remove.svg';
import arrowIcon from '@/assets/images/arrow.svg';
import completeOrderIcon from '@/assets/images/complete-order.jpeg';
import emptyCartIcon from '@/assets/images/empty-cart.png';

import {useDispatch, useSelector} from 'react-redux';
import {clearBasket, errorLoadingBasket, removeItemFromBasket} from '@/redux/reducers/basketSlice.js';
import {getItemsBasket, getTotalPriceBasket} from '@/redux/selectors/catalogSelector.js';
import {MyGreenButton} from '@/components/common/myGreenButton/MyGreenButton';
import {Info} from '@/components/info/Info.jsx';
import {calcVAT} from '@/helpers/calcVAT.js';
import API from '@/api/api.js';


const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Drawer = ({cartOpened, setCartOpened}) => {
  const dispatch = useDispatch();

  const totalPriceBasket = useSelector(getTotalPriceBasket);
  const itemsShoppingCart = useSelector(getItemsBasket);

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);


  const onRemove = async (idProduct) => {
    try {
      dispatch(removeItemFromBasket(idProduct));
    } catch (e) {
      alert('Ошибка при удалении из корзины');
      dispatch(errorLoadingBasket(e.response));
    }
  };

  const onClickOrder = async () => {
    try {
      const {data} = await API.post('orders', itemsShoppingCart);

      await delay(2000);

      dispatch(clearBasket());
      setOrderId(data.id);
      setIsOrderComplete(true);

      await delay(4000);

      setIsOrderComplete(false);
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
  };


  return (
    <div className={`${s.overlay} ${cartOpened ? s.overlayVisible : ''}`} onClick={() => setCartOpened(false)}>
      <div className={s.drawer} onClick={(e) => e.stopPropagation()}>
        <h2>
          Корзина <img onClick={() => setCartOpened(false)} src={buttonRemoveIcon} alt='close'/>
        </h2>
        {itemsShoppingCart.length > 0 ? (
          <div className={s.test}>
            <div className={s.itemsList}>
              {itemsShoppingCart.map(({id, title, imageUrl, price}) =>
                <div key={Number(id)} className={s.item}>
                  <div
                    style={{backgroundImage: `url('${imageUrl}')`}}
                    className={s.itemImg}></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{title}</p>
                    <b>{price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(Number(id))}
                    src={buttonRemoveIcon}
                    alt="remove"
                  />
                </div>,
              )}
            </div>
            <div className={s.total}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPriceBasket} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{calcVAT(totalPriceBasket)} руб. </b>
                </li>
              </ul>
              <MyGreenButton onClick={onClickOrder}>
                Оформить заказ <img src={arrowIcon} alt='arrow'/>
              </MyGreenButton>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            desc={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` :
              'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? completeOrderIcon : emptyCartIcon}
            setCartOpened={setCartOpened}
          />
        )
        }
      </div>
    </div>
  );
};

export {Drawer};
