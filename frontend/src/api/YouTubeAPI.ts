// Fetch the YouTube trailer video ID for a given movie title
export const fetchYoutubeTrailer = async (
  title: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/api/youtube/GetTrailer?title=${encodeURIComponent(title)}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) throw new Error('Failed to fetch trailer');

    // Return trimmed video ID from response
    const videoId = await response.text();
    return videoId.trim();
  } catch (err) {
    console.error('Error fetching trailer:', err);
    return null;
  }
};
