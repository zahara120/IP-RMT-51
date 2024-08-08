import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    allRecipes: [],
    popularRecipes: [],
    details: {},
    myRecipe: [],
    isLoading: false,
  },
  reducers: {
    setAllRecipes(state, action) {
      state.allRecipes = action.payload;
    },
    setPopularRecipes(state, action) {
      state.popularRecipes = action.payload;
    },
    setDetails(state, action) {
      state.details = action.payload;
    },
    setMyRecipe(state, action) {
      state.myRecipe = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setAllRecipes,
  setPopularRecipes,
  setDetails,
  setMyRecipe,
  setLoading,
} = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
export const fetchAllRecipes = (search, keyword, sort, page) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/recipes",
        params: {
          search,
          keyword,
          sort,
          "page[number]": page,
        },
      });
      dispatch(setAllRecipes(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPopularRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/recipes/popular");
      dispatch(setPopularRecipes(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/recipes/${id}`);
      dispatch(setDetails(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMyRecipe = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/recipes/my-recipe",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setMyRecipe(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createRecipe = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      // harus di jadiin form data satu2 karna ada img
      const formDataToUpload = new FormData();
      formDataToUpload.append("img", formData.imgFile);
      formDataToUpload.append("title", formData.title);
      formDataToUpload.append("description", formData.description);
      formDataToUpload.append("ingredients", formData.ingredients);
      formDataToUpload.append("steps", formData.steps);
      formDataToUpload.append("cookTime", formData.cookTime);

      const { data } = await axios({
        method: "post",
        url: `/recipes`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formDataToUpload,
      });

      dispatch(fetchMyRecipe());
      toast.success(`Add ${data.title} success`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
      if (
        Array.isArray(error.response.data.message) &&
        error.response.data.message.length > 1
      ) {
        error.response.data.message.forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(error.response.data.message || error.message);
      }
    }
  };
};

export const updateRecipe = (id, formData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const formDataToUpload = new FormData();
      formDataToUpload.append("img", formData.imgFile);
      formDataToUpload.append("title", formData.title);
      formDataToUpload.append("description", formData.description);
      formDataToUpload.append("ingredients", formData.ingredients);
      formDataToUpload.append("steps", formData.steps);
      formDataToUpload.append("cookTime", formData.cookTime);

      const { data } = await axios({
        method: "put",
        url: `/recipes/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formDataToUpload,
      });

      dispatch(fetchMyRecipe());
      dispatch(fetchDetails(id));
      toast.success(`Update ${data.title} success`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
      if (
        Array.isArray(error.response.data.message) &&
        error.response.data.message.length > 1
      ) {
        error.response.data.message.forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(error.response.data.message || error.message);
      }
    }
  };
};

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "delete",
        url: `/recipes/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(fetchMyRecipe());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };
};
