import IProduct from "./IProduct";

export default interface ICategory {
    name: string;
    products: [IProduct];
}
