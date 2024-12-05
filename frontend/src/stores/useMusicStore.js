import { axiosInstance } from "@/lib/axios";
import { Song } from "@/types";
import { Album } from "lucide-react";
import { create } from "zustand";

export const useMusicStore = create((set) => ({
    albums: [Album],
    songs: [Song],
    isLoading: false,
    error: null,

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data });
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
