import { useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useAsyncEffect } from 'use-async-effect';
import { connect, DispatchProp } from 'react-redux';
import { formatPrice } from '../common/utils/format';
import IProduct from '../types/IProduct';
import { RootState } from '../app/modules/rootReducer';
import * as CartActions from '../app/modules/cart/actions';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';

import ProductsService from '../services/ProductsService';
import ICategory from '../types/ICategory';
import { Helmet } from "react-helmet";
import Loading from '../components/Loading';

type amountProduct = { [key: number]: any };
const amountObject: amountProduct = {};
const mapStateToProps = (state: RootState) => ({
    cart: state.cart.products,
    amount: state.cart.products.reduce((amount, currentValue) => {
        amount[currentValue.id] = currentValue.amount;
        return amount;
    }, amountObject),
});

type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps & DispatchProp;

function Home(props: Props) {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const productsService = new ProductsService();

    useAsyncEffect(async () => {

        const categories = await productsService.getAllByCategory();
        setCategories(categories);

        setIsLoading(false);

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
        <div className="row container-page">
            <Loading show={isLoading} />
            <Helmet>
                <title>My Store | Productos</title>
            </Helmet>
            {
                categories.map(category => (
                    <>
                        <div className="col-12" key={category.name}>
                            <h2>{category.name}</h2>
                        </div>
                        {
                            category.products.map(product => (
                                <div className="col-12 col-md-3 product" key={product.id}>
                                    <div className="product-image">
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <div className="product-category">{product.category}</div>
                                    <div className="product-name">{product.title}</div>
                                    <TextTruncate
                                        line={3}
                                        element="span"
                                        truncateText="…"
                                        text={product.description}
                                    />
                                    <div className="product-price text-center mb-3">{`Precio: ${formatPrice(product.price)}`}</div>
                                    <Link to={`/products/${product.id}`} className="btn btn-secondary mb-2" >
                                        <span>Ver detalles</span>
                                    </Link>
                                    <button className="btn btn-primary" onClick={() => handleAddProduct(product)}>
                                        <div className="product-amount">
                                            <MdAddShoppingCart size={16} color="#fff" />
                                            {props.amount[product.id] || 0}
                                        </div>
                                        <span>Agregar al carrito</span>
                                    </button>
                                </div>
                            ))
                        }
                    </>
                ))
            }
        </div >
    );
}

export default connect(mapStateToProps)(Home);
