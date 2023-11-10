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
}: SavedURL): void => {
  if (!localStorage.getItem("saved_urls"))
    localStorage.setItem("saved_urls", JSON.stringify([]));

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
};

export const getSavedURLs = (): SavedURL[] => {
  return JSON.parse(localStorage.getItem("saved_urls") as string) || [];
};
