module.exports.generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

module.exports.isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.getGeoInfo = async (clientIP) => {
  try {
    const response = await fetch(`http://ip-api.com/json/${clientIP}`);
    const json = await response.json();

    console.log(json);

    return json.status === "success" ? json.country : "Unknown country";
  } catch (error) {
    console.error("Error fetching IP information:", error);
    return "Unknown country";
  }
};

module.exports.containsProfanity = async (string) => {
  try {
    const response = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${string}`);
    
    if (!response.ok) 
      throw new Error(`Network response was not ok: ${response.statusText}`);
    
    return await response.text() === "true";

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return false;
  }
};

module.exports.isValidCharacters = (string) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(string);
};
