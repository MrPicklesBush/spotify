// import { usePlayerStore } from "@/stores/usePlayerStore";

// const AudioPlayer = () => {
//     const audioref = useRef<HTMLAUdioElement>(null)
//     const prevSongRef = useRef<string | null>(null);
//         const {currentSong, isPlaying, playNext} = usePlayerStore()

//     useEffect(() => {
//         if(isPlaying) audioRef.current?.play();
//         else audioRef.current?.pause();

//     }, [isPlaying]);

//     // handle song ends
//     useEffect(() => {
//         const audio = audioRef.current;
//         const handleEnded = () => {
//             playNext()
//         }
//         audio.addEventListener("ended", handleEnded)
//         return () => audio.removeEventListener("ended", handleEnded);
//     }, [playNext]);

//     // handle song changes
//     useEffect(() => {
//         if(!audioRef.current || !currentSong) return;

//         const audio = audioRef.current;
//         const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
//         if (isSongChange) {
//             audio.src = currentSong?.audioUrl;

//             // resets playback position
//             audio.currentTime = 0;
//             prevSongRef.current = currentSong?.audioUrl;

//             if(isPlaying) audio.play();
//         }
//     }, [currentSong, isPlaying]);

//     return <audio ref = {audioRef} />;
// };
// export default AudioPlayer;

import { useRef, useEffect } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const prevSongRef = useRef(null);
    const { currentSong, isPlaying, playNext } = usePlayerStore();

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    // Handle when the song ends
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            playNext();
        };
        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
    }, [playNext]);

    // Handle song changes
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        const audio = audioRef.current;
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
        if (isSongChange) {
            audio.src = currentSong?.audioUrl;

            // Reset playback position
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;

            if (isPlaying) {
                audio.play();
            }
        }
    }, [currentSong, isPlaying]);

    return <audio ref={audioRef} />;
};

export default AudioPlayer;