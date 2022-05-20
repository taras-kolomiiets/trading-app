import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import axios from "axios";

const cryptoApiHeaders = {
	"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
	"X-RapidAPI-Key": "492f046f41mshd764eca03fe9afep1b340cjsnf8599fbc7b58",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: "crypto",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query<any, Number>({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),
		getCryptoDetails: builder.query<any, String>({
			query: (coinId) => createRequest(`/coin/${coinId}`),
		}),
	}),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
