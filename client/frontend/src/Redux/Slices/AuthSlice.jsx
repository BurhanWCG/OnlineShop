import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk action to handle Google authentication with axios
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/account/auth/google/', {
        token: credential,
      });
      const data = response.data;

      if (response.status !== 200) {
        throw new Error(data.error || 'Google login failed');
      }

      // Return data if successful
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : error.message
      );
    }
  }
);

export const userSignup = createAsyncThunk('auth/userSignup', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/account/auth/signup/', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  }
  catch (error) {
    return rejectWithValue(
      error.response && error.response.data
        ? error.response.data.error
        : error.message
    );
  }
})



export const userLogin = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:8000/account/auth/login/", formData);
    console.log(response.data)
    return response.data; // The login data (e.g., token, user details)
  } catch (error) {
    // Handle the error and return a custom error message
    return rejectWithValue(error.response ? error.response.data : "Something went wrong");
  }
});


export const forgotPassword = createAsyncThunk("auth/forgotPassword", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:8000/account/auth/forgotpassword/", { email });
    return response.data; // Assume it returns a message like "Verification code sent"
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : "Something went wrong");
  }
});



export const resetPassword = createAsyncThunk("auth/resetPassword", async ({code, newPassword }, { rejectWithValue }) => {
  console.log(code)
  console.log(newPassword)
  try {
    const response = await axios.post("http://localhost:8000/account/auth/resetpassword/", { code, newPassword });
    return response.data; // Response might contain a message like "Password reset successful"
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : "Something went wrong");
  }
});



const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    accessToken: null,
    user: null,
    verificationMessage: null,
    resetMessage: null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
    // userSignup
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      // userLogin
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handling error here
      })
      builder
      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationMessage = action.payload.message;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handling error here
      })
      builder
      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetMessage = action.payload.message;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handling error here
      });
  },
});

export default AuthSlice.reducer;
