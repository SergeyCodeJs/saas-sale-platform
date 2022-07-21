export class StoreApi {
  constructor() {
    this.productsUrl = 'https://fakestoreapi.com/products';
    this.categoriesUrl = 'https://fakestoreapi.com/products/categories';
  }

  getData = async (url) => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(res.status);
      }
    } catch(err) {
      throw new Error(err);
    }
  }

  getProducts = async () => {
    const products = await this.getData(this.productsUrl);
    return this._transformProductsObject(products)
  }

  getCategories = async () => {
    const products = await this.getData(this.productsUrl);
    let categories = await this.getData(this.categoriesUrl);
    categories = categories.map((categoryName, idx) => {
      const productFromCategory = products.filter((product) => product.category === categoryName)[0];
      return {
        id: idx,
        title: categoryName,
        image: productFromCategory.image
      }
    })
    
    return categories;
  }

  getProductsInCategory = async (categoryName) => {
    const categories = await this.getCategories();
    if (!categories.includes(categoryName)) {
      throw new Error('There is no such category in API');
    }
    const products = await this.getProducts();
    const productsInCategory = products.filter(product => product.category === categoryName);
    console.log(productsInCategory)
    return this._transformProductsObject(productsInCategory);
  }

  _transformProductsObject(products) {
    return products.map(({id, category, title, description, image, price}) => {
      return {
        id,
        category,
        title,
        description,
        image,
        price
      }
    })
  }
}