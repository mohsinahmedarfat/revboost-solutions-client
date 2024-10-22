// src/store/incomeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosSecure } from "../../hooks/useAxiosSecure";

// Define TypeScript interfaces

export interface Item {
  no: number;
  item: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface InvoiceData {
  companyEmail: string;
  customerName: string;
  companyName: string;
  invoiceNumber: string;
  invoiceDueDate: string;
  date: string; // ISO Date string
  customerAddress: string;
  items: Item[];
}

interface InvoiceState {
  invoices: InvoiceData[];
  loading: boolean;
  error: string | null;
}
const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await axiosSecure.get<InvoiceData[]>(
        `/invoices/all`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.error || "Failed to fetch invoices"
      );
    }
  }
);

// Async Thunk to create a new invoice
export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (invoice: InvoiceData, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post<InvoiceData[]>(
        "/invoices/create",
        // `${import.meta.env.VITE_API}/invoices/create`,
        invoice
      );
      console.log("Invoice saved successfully:", response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.error || "Failed to create income"
      );
    }
  }
);

// Create Slice
const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
  },
  extraReducers: (builder) => {
    // Handle fetchInvoices
    builder.addCase(fetchInvoices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<InvoiceData[]>) => {
      state.loading = false;
      state.invoices = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle createInvoice
    builder.addCase(createInvoice.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createInvoice.fulfilled, (state, action: PayloadAction<InvoiceData>) => {
      state.loading = false;
      state.invoices.push(action.payload);
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default invoiceSlice.reducer;
