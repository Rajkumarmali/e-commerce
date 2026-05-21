import { api } from "../../config/apiConfig";
import { FIND_PRODUCT_BY_ID_FAILER, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILER, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST })
    const { colors, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize } = reqData;
    try {
        const params = {};

        if (category) params.category = category;
        if (colors) params.color = colors;
        if (sizes) params.size = sizes;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (minDiscount) params.minDiscount = minDiscount;
        if (sort) params.sort = sort;
        if (stock) params.stock = stock;

        params.pageNumber = pageNumber;
        params.pageSize = pageSize;

        const { data } = await api.get("/api/product/products", { params });
        console.log("Product :", data);
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data })

    } catch (err) {
        dispatch({ type: FIND_PRODUCTS_FAILER, payload: err.message })
    }
}

export const findProductById = (productId) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/product/product/id/${productId}`);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
        console.log("product:", data)
    } catch (err) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILER, payload: err.message })
    }
}
