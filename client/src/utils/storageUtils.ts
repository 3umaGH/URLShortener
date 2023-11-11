type SavedURL = {
  id?: number;
  originalURL: string;
  URLSuffix: string;
  uuid: string;
};

export const saveURLToLocalStorage = ({
  originalURL,
  URLSuffix,
  uuid,
}: SavedURL): boolean => {
  const savedURLs = localStorage.getItem("saved_urls");

  if (!savedURLs) localStorage.setItem("saved_urls", JSON.stringify([]));

  const savedUrlsString = localStorage.getItem("saved_urls");
  const savedUrls = savedUrlsString ? JSON.parse(savedUrlsString) : [];

  const lastID = savedUrls.length > 0 ? savedUrls[savedUrls.length - 1].id : -1;

  savedUrls.push({
    id: lastID + 1,
    originalURL,
    URLSuffix,
    uuid,
  });

  localStorage.setItem("saved_urls", JSON.stringify(savedUrls));

  return true;
};

export const deleteURLfromStorage = (uuid: string) => {
  const savedURLs = localStorage.getItem("saved_urls");

  if (!savedURLs) return false;

  const parsedURLs = JSON.parse(savedURLs);

  localStorage.setItem(
    "saved_urls",
    JSON.stringify(parsedURLs.filter((url: SavedURL) => url.uuid !== uuid))
  );
};

export const getSavedURLs = (): SavedURL[] => {
  return JSON.parse(localStorage.getItem("saved_urls") as string) || [];
};
