export const formatAddress = (address: string): string => {
  const n: number = 6;
  if (address.startsWith("0x") && address.length >= 42) {
    return `${address.substring(0, n)}...${address.substring(
      address.length - (n - 1),
      address.length
    )}`;
  }
  return "";
};
