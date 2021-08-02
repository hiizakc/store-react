import React from 'react';
import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md';

import { connect, DispatchProp } from 'react-redux';
import { RootState } from '../app/modules/rootReducer';
import * as CartActions from '../app/modules/cart/actions';
import { formatPrice } from '../common/utils/format';
import IProduct from '../types/IProduct';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const mapStateToProps = (state: RootState) => ({
    products: state.cart.products.map(product => ({
        ...product,
        subtotal: formatPrice(product.amount * product.price),
    })),
    total: formatPrice(
        state.cart.products.reduce((total, product) => {
            return total + product.price * product.amount;
        }, 0)
    ),
});

type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps & DispatchProp;

function Cart(props: Props) {
    const { products, dispatch, total } = props;

    function incrementProduct(product: IProduct) {
        dispatch(
            CartActions.updateProductAmount(product.id, product.amount + 1)
        );
    }

    function decrementProduct(product: IProduct) {
        dispatch(
            CartActions.updateProductAmount(product.id, product.amount - 1)
        );
    }

    return (
        <div id="cart" className="row container-page">
            <Helmet>
                <title>Carrito de compra | My Store</title>
            </Helmet>
            {
                products.length === 0 ?
                    <div className="col-12 text-center">
                        Aún no has agregado productos a tu carrito<br />
                        <Link to="/">Presiona aquí para volver a la tienda</Link>
                    </div>
                    :
                    <>
                        <div className="col-12">
                            {/* DESK */}
                            <table className="table d-none d-md-block" >
                                <thead>
                                    <tr>
                                        <th />
                                        <th>Producto</th>
                                        <th>Precio unitario</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr key={product.id}>
                                                <td>
                                                    <img src={product.image} alt={product.title} className="product-image" />
                                                </td>
                                                <td>
                                                    <strong>{product.title}</strong>
                                                </td>
                                                <td>
                                                    <span>{product.priceFormatted}</span>
                                                </td>
                                                <td>
                                                    <div>
                                                        <button className="btn btn-light mr-2" onClick={() => decrementProduct(product)}>
                                                            <MdRemoveCircleOutline
                                                                size={20}
                                                                color="#7159c2"
                                                            />
                                                        </button>
                                                        <input className="cart-amount" readOnly value={product.amount} />
                                                        <button className="btn btn-light ml-2" onClick={() => incrementProduct(product)}>
                                                            <MdAddCircleOutline
                                                                size={20}
                                                                color="#7159c2"
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <strong>{product.subtotal}</strong>
                                                </td>
                                                <td>
                                                    <button className="btn btn-light" onClick={() => dispatch(CartActions.removeToCart(product.id))}>
                                                        <MdDelete size={20} color="#7159c1" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>






                        <div className="col-12">
                            {/* MOVIL */}
                            <table className="table d-block d-md-none">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr>
                                                <td>
                                                    <div className="text-center">
                                                        <img src={product.image} alt={product.title} className="product-image" /><br />
                                                        <strong>{product.title}</strong><br />
                                                        <span>{`Precio unitario: ${product.priceFormatted}`}</span><br />
                                                        <strong>{`Sub total: ${product.subtotal}`}</strong><br />
                                                        <button className="btn btn-light mr-2" onClick={() => decrementProduct(product)}>
                                                            <MdRemoveCircleOutline
                                                                size={20}
                                                                color="#7159c2"
                                                            />
                                                        </button>
                                                        <input className="cart-amount" readOnly value={product.amount} />
                                                        <button className="btn btn-light ml-2" onClick={() => incrementProduct(product)}>
                                                            <MdAddCircleOutline
                                                                size={20}
                                                                color="#7159c2"
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button className="btn btn-light mt-4" onClick={() => dispatch(CartActions.removeToCart(product.id))}>
                                                        <MdDelete size={20} color="#7159c1" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12 text-center">
                            <span>Total: <strong>{total}</strong></span><br />
                            <button className="btn btn-primary mt-3" onClick={() => alert('Pasarela de pagos no implementada. *Esto es una demostración')}>Finalizar pedido</button>
                        </div>
                    </>
            }
        </div>
    );
}
export default connect(mapStateToProps)(Cart);
