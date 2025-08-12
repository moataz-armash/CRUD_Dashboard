// src/lib/api.js
import axios from "axios";
import { supabase } from "../Components/Supabase/Supabase";

const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdnNpYWFib3luY3BjeWZhaGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTYzOTgsImV4cCI6MjA2OTgzMjM5OH0.96oz-V_0CVvYaNq9TgPVV3rfmkrvNSB_6WQ2KyUAnWA"; // your anon public key

export const api = axios.create({
  baseURL: "https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1",
  headers: {
    "Content-Type": "application/json",
    apikey: ANON_KEY,
    Prefer: "return=representation",
  },
});

// ONE interceptor: attach token, THEN log final request
api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  // 🔍 Final request going out
  console.log(
    "[AXIOS REQ]",
    (config.method || "GET").toUpperCase(),
    config.url
  );
  console.log("[AXIOS REQ HEADERS]", {
    ...config.headers,
    Authorization: config.headers.Authorization ? "Bearer ***" : undefined,
  });
  console.log("[AXIOS REQ DATA]", config.data);

  return config;
});

// Response logger
api.interceptors.response.use(
  (res) => {
    console.log("[AXIOS RES]", res.status, res.config.url, res.data);
    return res;
  },
  (err) => {
    console.error(
      "[AXIOS ERR]",
      err.response?.status,
      err.config?.url,
      err.response?.data
    );
    return Promise.reject(err);
  }
);
