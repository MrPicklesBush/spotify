// Template for a Song object
export const Song = {
	_id: "",
	title: "",
	artist: "",
	albumId: null, // Can be null or a string
	imageUrl: "",
	audioUrl: "",
	duration: 0, // Number (e.g., seconds)
	createdAt: "",
	updatedAt: ""
};

// Template for an Album object
export const Album = {
	_id: "",
	title: "",
	artist: "",
	imageUrl: "",
	releaseYear: 0, // Year (number)
	songs: [] // Array of Song objects
};

// Template for Stats object
export const Stats = {
	totalSongs: 0,
	totalAlbums: 0,
	totalUsers: 0,
	totalArtists: 0
};

// Template for a Message object
export const Message = {
	_id: "",
	senderId: "",
	receiverId: "",
	content: "",
	createdAt: "",
	updatedAt: ""
};

// Template for a User object
export const User = {
	_id: "",
	clerkId: "",
	fullName: "",
	imageUrl: ""
};