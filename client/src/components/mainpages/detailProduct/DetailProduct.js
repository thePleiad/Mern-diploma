import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [isLogged] = state.userAPI.isLogged
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>${detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <pre>{detailProduct.content}</pre>
                    <p>Продано: {detailProduct.sold}</p>
                    <Link to={isLogged ? '/cart' : '#!'} className="cart"
                    onClick={() => addCart(detailProduct)}>
                        В кошик
                    </Link>
                </div>
            </div>

            <div>
                {<h2>Схожі товари</h2>}
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category && product._id !== detailProduct._id
                                ? <ProductItem key={product._id} product={product} /> : null
                        }).slice(0, 7)
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
