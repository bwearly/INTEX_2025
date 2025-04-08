export const fetchYoutubeTrailer = async (
  title: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/youtube/GetTrailer?title=${encodeURIComponent(title)}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trailer');
    }

    const videoId = await response.text();
    return videoId || null;
  } catch (err) {
    console.error('Error fetching trailer:', err);
    return null;
  }
};
