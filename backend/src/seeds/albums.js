import { connectDB } from "../lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async () => {
    const connection = await connectDB();

    try {
        // Clear existing data
        await new Promise((resolve, reject) => {
            connection.query("DELETE FROM Album", (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            connection.query("DELETE FROM Song", (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        // Seed songs
        const songs = [
            ["City Rain", "Urban Echo", "/cover-images/7.jpg", "/songs/7.mp3", 39],
            ["Neon Lights", "Night Runners", "/cover-images/5.jpg", "/songs/5.mp3", 36],
            ["Urban Jungle", "City Lights", "/cover-images/15.jpg", "/songs/15.mp3", 36],
            ["Neon Dreams", "Cyber Pulse", "/cover-images/13.jpg", "/songs/13.mp3", 39],
            ["Summer Daze", "Coastal Kids", "/cover-images/4.jpg", "/songs/4.mp3", 24],
            ["Ocean Waves", "Coastal Drift", "/cover-images/9.jpg", "/songs/9.mp3", 28],
            ["Crystal Rain", "Echo Valley", "/cover-images/16.jpg", "/songs/16.mp3", 39],
            ["Starlight", "Luna Bay", "/cover-images/10.jpg", "/songs/10.mp3", 30],
            ["Stay With Me", "Sarah Mitchell", "/cover-images/1.jpg", "/songs/1.mp3", 46],
            ["Midnight Drive", "The Wanderers", "/cover-images/2.jpg", "/songs/2.mp3", 41],
            ["Moonlight Dance", "Silver Shadows", "/cover-images/14.jpg", "/songs/14.mp3", 27],
            ["Lost in Tokyo", "Electric Dreams", "/cover-images/3.jpg", "/songs/3.mp3", 24],
            ["Neon Tokyo", "Future Pulse", "/cover-images/17.jpg", "/songs/17.mp3", 39],
            ["Purple Sunset", "Dream Valley", "/cover-images/12.jpg", "/songs/12.mp3", 17],
        ];

        const createdSongs = [];
        for (const song of songs) {
            const result = await new Promise((resolve, reject) => {
                connection.query(
                    "INSERT INTO Song (title, artist, imageUrl, audioUrl, duration) VALUES (?, ?, ?, ?, ?)",
                    song,
                    (err, results) => {
                        if (err) return reject(err);
                        resolve(results.insertId); // Get the inserted song's ID
                    }
                );
            });
            createdSongs.push(result);
        }

        // Seed albums and associate with songs
        const albums = [
            {
                title: "Urban Nights",
                artist: "Various Artists",
                imageUrl: "/albums/1.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(0, 4),
            },
            {
                title: "Coastal Dreaming",
                artist: "Various Artists",
                imageUrl: "/albums/2.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(4, 8),
            },
            {
                title: "Midnight Sessions",
                artist: "Various Artists",
                imageUrl: "/albums/3.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(8, 11),
            },
            {
                title: "Eastern Dreams",
                artist: "Various Artists",
                imageUrl: "/albums/4.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(11, 14),
            },
        ];

        for (const album of albums) {
            const albumId = await new Promise((resolve, reject) => {
                connection.query(
                    "INSERT INTO Album (title, artist, imageUrl, releaseYear) VALUES (?, ?, ?, ?)",
                    [album.title, album.artist, album.imageUrl, album.releaseYear],
                    (err, results) => {
                        if (err) return reject(err);
                        resolve(results.insertId); // Get the inserted album's ID
                    }
                );
            });

            // Update songs with their albumId
            await new Promise((resolve, reject) => {
                connection.query(
                    "UPDATE Song SET albumId = ? WHERE id IN (?)",
                    [albumId, album.songs],
                    (err) => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            });
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        connection.end(); // Close the database connection
    }
};

seedDatabase();
