const formatNumber = (number) => {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  }

  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }

  return number?.toLocaleString();
};

const formatText = (text) => {
  let formattedText = "";

  for (let char of text) {
    if (char === "_") {
      formattedText += " ";
      continue;
    }

    formattedText += char;
  }

  return formattedText;
};

export { formatNumber, formatText };
