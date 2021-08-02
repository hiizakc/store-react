import axios from 'axios';

const api = axios.create({ baseURL: 'https://fakestoreapi.com' });

export default class ProductsService {
    async getAll() {
        const response = await api.get('products');
        return response.data;
    }

    async getAllByCategory() {
        const response = await api.get('products');
        return this.proccessData(response.data);
    }

    async getById(id: Number) {
        const response = await api.get(`products/${id}`);
        return response.data;
    }

    /** Solo para efectos de demostración. 
     * El API puede devolver agrupados los productos en categorias.
     * El procesar esta estructura en frontend sobrecarga la página e 
     * incrementa el tiempo de renderizado inicial
     */
    // Process data to get products in category.
    proccessData(products: any) {

        var categories: any = [];

        // Get categories.
        products.forEach((product: any) => {
            let category = {
                name: product.category,
                products: []
            }
            if (categories.find((x: { name: String; }) => x.name === product.category) === undefined)
                categories.push(category);
        });

        // Process products.
        products.forEach((product: any) => {
            const category = categories.find((x: { name: String; }) => x.name === product.category);
            if (category !== undefined)
                category.products.push(product)
        });

        return categories;
    }
}
