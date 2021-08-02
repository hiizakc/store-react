import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.svg';
import { RootState } from '../app/modules/rootReducer';

const mapStateToProps = (state: RootState) => ({
    cartAmount: state.cart.products.length,
});

function Header({ cartAmount }: ReturnType<typeof mapStateToProps>) {
    return (
        <header>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img id="logo" src={logo} alt="Ecommerce" />
                    </Link>
                    <div className="" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <Link to="/cart">
                                <MdShoppingBasket size={30} color="#000" className="mr-2" />
                                <span>{cartAmount} productos</span>
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default connect(mapStateToProps)(Header);
