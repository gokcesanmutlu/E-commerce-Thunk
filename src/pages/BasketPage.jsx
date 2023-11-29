import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBasketData, setBasketLoading } from "../redux/actions/basketActions"
import Loading from "../components/Loading"
import BasketItem from "../components/BasketItem"


const BasketPage = () => {
  const dispatch = useDispatch()
  //aşağıdaki şekilde abone olup alınca import etmeye gerek kalmıyor
  const state = useSelector((store) => store.basketReducer)

  useEffect(() => {
    // ilk yapmak istediğim şey: sepetteki ürünlerin yüklenme aşamasının başladığını bildirmek
    dispatch(setBasketLoading());
    // sepetteki ürünleri API'den alıp store'a aktarıcak asenk. action

    dispatch(getBasketData())
  }, [])

  const total_count = state.basket.reduce(
    (total, item) => total + item.adet * item.fiyat,
    0
  );

  return (
    <div className="row py-5 px-4">
      {state.isLoading && <Loading />}

      {state.isError &&
        <p> Sorry, an error occurred while getting the chart data.</p>}

      <div className="col-md-8">
        {state.basket.length > 0 ? (state.basket.map((item) => (
          <BasketItem item={item} key={item.id} />
        ))) : (<p className="my-5 text-center">Chart is Empty</p>)}
      </div>

      <div className="d-flex flex-column justify-content-start align-items-start col-md-4 ">
        <div className="w-100 bg-white text-black p-5 rounded">
          <h5 className="text-center">Toplam Tutar: {total_count}</h5>
          <button className="w-100 my-2">Alışverişi Tamamla</button>
        </div>
      </div>
    </div>
  )
}

export default BasketPage