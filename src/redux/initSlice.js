import { createSlice } from "@reduxjs/toolkit";

export const initSlice = createSlice({
  name: "init",
  initialState: {
    userData: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      aboutMe: "",
    },
    searchValue: "",
    users: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setNewImage: (state, action) => {
      state.userData = {
        ...state.userData,
        imageUrl: action.payload,
      };
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      const user = action.payload;
      state.users = [...state.users, { ...user, status: "active" }];
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.uniqueId !== action.payload
      );
    },
    updateUserStatus: (state, action) => {
      state.users = state.users.map((user) =>
        user.uniqueId === action.payload
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      );
    },
    setPhone: (state, action) => {
      state.userData.phone = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload; // Update search term
    },
    setEmail: (state, action) => {
      state.userData.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.userData.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.userData.lastName = action.payload;
    },
    setAddress: (state, action) => {
      state.userData.address = action.payload;
    },
    setCity: (state, action) => {
      state.userData.city = action.payload;
    },
    setCountry: (state, action) => {
      state.userData.country = action.payload;
    },
    setPostalCode: (state, action) => {
      state.userData.postalCode = action.payload;
    },
    setAboutBusiness: (state, action) => {
      state.userData.aboutBusiness = action.payload;
    },
    setAboutMe: (state, action) => {
      state.userData.aboutMe = action.payload;
    },
  },
});

export const {
  setUserData,
  setAboutBusiness,
  setPhone,
  setEmail,
  setFirstName,
  setLastName,
  setAddress,
  setCity,
  setCountry,
  setPostalCode,
  setSearchValue,
  setAboutMe,
  setUsers,
  addUser,
  removeUser,
  updateUserStatus,
  setNewImage,
} = initSlice.actions;

export default initSlice.reducer;
