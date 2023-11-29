import axios from 'axios';
import { ActionTypes } from './../actionTypes';

axios.defaults.baseURL = 'http://localhost:4000';

// senkron aksiyonlar
export const setBasket = (payload) => ({
    type: ActionTypes.SET_BASKET,
    payload
})

export const setBasketLoading = () => ({
    type: ActionTypes.SET_BASKET_LOADING,
})

export const setBasketError = () => ({
    type: ActionTypes.SET_BASKET_ERROR,
})

//Asenk. actions, apiden sepetteki ürünleri alıp store'a aktarır
//ikinci fonksiyona dispatch'ı thunk fonksiyonu kendi gönderiyo bunu iport etmiyoruz bir yerden almıyoruz
export const getBasketData = () => (dispatch) => {
    axios
        .get('/basket')
        .then((res) => dispatch(setBasket(res.data)))
        .catch((err) => dispatch(setBasketError()));
};

// apideki sepete yeni ürün ekler ve ekleme başarılı olursa eklenen ürünü reducer'a aktarır 
export const addToBasket = (product) => (dispatch) => {
    //ürünün bilgilerine adet ekleme
    const newProduct = { ...product, adet: 1 }

    //objeden sepete gerekmeyen verileri kaldır
    delete newProduct.renk;
    delete newProduct.ozellikler;
    delete newProduct.baslik;

    // ürünü API'ye kaydetme
    axios
        .post("/basket", newProduct)
        .then((res) => dispatch({ type: ActionTypes.ADD_TO_BASKET, payload: newProduct }))
        .catch((err) => setBasketError())
};

//apideki ürün miktarını bir artırır ve reducer'a bilgi gönderir
export const updateItem = (product) => (dispatch) => {
    axios.patch(`/basket/${product.id}`, { adet: product.adet + 1 })
        .then(() => dispatch({ type: ActionTypes.UPDATE_ITEM, payload: product.id }))
};

//apideki ürün kaldırır ve reducer'a bilgi gönderir
export const removeItem = (delete_id) => (dispatch) => {
    axios.delete(`/basket/${delete_id}`)
        .then(() => dispatch({ type: ActionTypes.REMOVE_ITEM, payload: delete_id }))
}; 