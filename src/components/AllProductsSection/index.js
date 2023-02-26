import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, option)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(eachProduct => ({
        title: eachProduct.title,
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        price: eachProduct.price,
        rating: eachProduct.rating,
        brand: eachProduct.brand,
      }))
      this.setState({productsList: updatedData, isLoading: false})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="black" height={50} width={50} />
    </div>
  )

  renderProduct = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderProductsList = () => {
    const {isLoading} = this.state
    return (
      <div className="loader-container">
        {isLoading ? this.renderLoader() : this.renderProduct()}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
