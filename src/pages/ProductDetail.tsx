import { useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useAsyncEffect } from 'use-async-effect';
import { connect } from 'react-redux';
import { formatPrice } from '../common/utils/format';
import IProduct from '../types/IProduct';
import { RootState } from '../app/modules/rootReducer';
import * as CartActions from '../app/modules/cart/actions';
import ProductsService from '../services/ProductsService';
import { Helmet } from "react-helmet";

type amountProduct = { [key: number]: any };
const amountObject: amountProduct = {};
const mapStateToProps = (state: RootState) => ({
    cart: state.cart.products,
    amount: state.cart.products.reduce((amount, currentValue) => {
        amount[currentValue.id] = currentValue.amount;
        return amount;
    }, amountObject),
});

function ProductDetail(props: any) {

    const [product, setProduct] = useState<IProduct | null>(null);
    const productsService = new ProductsService();

    useAsyncEffect(async () => {

        const id = props.match.params.id;
        const product = await productsService.getById(id);
        setProduct(product);

    }, []);

    function handleAddProduct(product: IProduct) {
        const { dispatch } = props;
        dispatch(
            CartActions.addProductToCart({
                ...product,
                priceFormatted: formatPrice(product.price),
            })
        );
    }

    return (
        <div id="producto-detail" className="row container-page product justify-content-md-center">

            {
                product === null ?
                    <p>Producto no encontrado</p>
                    :
                    <>
                        <Helmet>
                            <title>{product.title} en {product.category} | My Store</title>
                            <meta property="og:title" content={product.title} />
                            <meta property="og:description" content={product.description} />
                            <meta property="og:image" content={product.image} />
                            <meta property="product:availability" content="in stock" />
                            <meta property="product:condition" content="new" />
                            <meta property="product:price:amount" content={`${product.price}`} />
                            <meta property="product:price:currency" content="MXN" />
                        </Helmet>
                        <div className="col-12 col-md-6 product" key={product.id}>
                            <div className="product-image">
                                <img src={product.image} alt={product.title} />
                            </div>

                        </div>
                        <div className="col-12 col-md-4">
                            <div className="product-category">{product.category}</div>
                            <h1 className="product-name">{product.title}</h1>
                            <p>{product.description}</p>
                            <div className="product-price text-center mb-3">{`Precio: ${formatPrice(product.price)}`}</div>
                            <button className="btn btn-primary" onClick={() => handleAddProduct(product)}>
                                <div className="product-amount">
                                    <MdAddShoppingCart size={16} color="#fff" />
                                    {props.amount[product.id] || 0}
                                </div>
                                <span>Agregar al carrito</span>
                            </button>
                        </div>
                    </>
            }
        </div>
    );
}

export default connect(mapStateToProps)(ProductDetail);
