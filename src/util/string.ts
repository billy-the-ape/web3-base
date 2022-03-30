const SHORTEN_ADDRESS_REGEX = /(^0x[0-9a-f]{4}).*([0-9a-f]{4}$)/i;

export const shortenAddress = (address?: string) => {
  return address?.replace(SHORTEN_ADDRESS_REGEX, '$1....$2');
};
