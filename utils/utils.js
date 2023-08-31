const formatNumber = (number) => {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  }

  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }

  return number?.toLocaleString();
};

export { formatNumber };
