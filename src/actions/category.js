import { getAllCategories } from "../api/category/getAllCategories";
import { getCategory } from "../api/category/getCategory";
import { createCategory } from "../api/category/createCategory";
import { deleteCategory } from "../api/category/deleteCategory";

export const getAllCategoriesAction = (serverId) => async (dispatch) =>  {
    try {
        const { data } = await getAllCategories(serverId);
        dispatch({ type: 'GET_ALL_CATEGORIES', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getCategoryAction = (categoryId) => async (dispatch) =>  {
    try {
        const { data } = await getCategory(categoryId);
        dispatch({ type: 'GET_CATEGORY', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const createCategoryAction = (serverId, categoryName) => async (dispatch) =>  {
    try {
        const { data } = await createCategory(serverId, categoryName);
        dispatch({ type: 'CREATE_CATEGORY', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const deleteCategoryAction = (categoryId) => async (dispatch) =>  {
    try {
        const { data } = await deleteCategory(categoryId);
        dispatch({ type: 'DELETE_CATEGORY', payload: data });
    } catch(e) {
        console.log(e)
    }
}
