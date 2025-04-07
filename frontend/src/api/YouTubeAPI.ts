const apiKey = 'AIzaSyC7XzrZz31WcTpL92x7KfOWpRFCLDaDQ1M';

export const fetchYoutubeTrailer = async (
  title: string
): Promise<string | null> => {
  const query = `${title} official trailer`;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${apiKey}`
    );

    const data = await response.json();
    return data.items?.[0]?.id?.videoId ?? null;
  } catch (err) {
    console.error('Error fetching trailer:', err);
    return null;
  }
};
