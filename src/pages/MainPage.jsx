import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductData, setError, setLoading, setProducts } from '../redux/actions/productActions';
import Loading from "../components/Loading"
import axios from "axios"
import Card from "../components/Card"
import productReducer from './../redux/reducers/productReducer';
import { getBasketData, setBasketLoading } from '../redux/actions/basketActions';

const MainPage = () => {
  const dispatch = useDispatch()
  const state = useSelector((store) => store.productReducer);

  useEffect(() => {
    dispatch(setLoading())
    dispatch(setBasketLoading())

    dispatch(getProductData());
    // card itemda sepetteki ürünlerin verisine erişmek için basketin datasını alıyoruz 
    // böylece karar verebiliriz, ürün sepette var mı yok mu
    dispatch(getBasketData());
  }, [])

  return (
    <div>
      {state.isLoading && <Loading />}
      {state.isError && (<p>Sorry, an error occurred while getting the data. </p>)}

      <div className="d-flex flex-wrap gap-4 p-5 justify-content-center">
        {state?.products.map((product) =>
          <Card key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default MainPage