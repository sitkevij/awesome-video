const HOST_RE =
  /^(([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)*[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?|(\d{1,3}\.){3}\d{1,3}|\[[0-9a-fA-F:]+\]|[A-Za-z0-9._-]+)(:\d{1,5})?$/;

/**
 * @param {string} url
 * @returns {string | null} Error message, or null when valid.
 */
export function validateUrlFormat(url) {
  if (!/^https?:\/\//.test(url)) {
    return "Malformed URL";
  }

  if (/[\s\t]/.test(url)) {
    return "URL contains whitespace";
  }

  if (/[\u0000-\u001F\u007F]/.test(url)) {
    return "Malformed URL";
  }

  const rest = url.replace(/^https?:\/\//, "");
  if (!rest) {
    return "Malformed URL";
  }

  const host = rest.split(/[/?#]/)[0];
  if (!host || !HOST_RE.test(host)) {
    return "Malformed URL";
  }

  return null;
}

/**
 * Policy checks for list-item URLs (localhost, IPs, file://, etc.).
 *
 * @param {string} url
 * @returns {string | null} Reason label, or null when allowed.
 */
export function validateListItemUrlPolicy(url) {
  if (/^file:\/\//i.test(url)) {
    return "file:// URL";
  }

  if (/:\/\/localhost(?:[:/]|$)/i.test(url)) {
    return "localhost URL";
  }

  if (/:\/\/127\.0\.0\.1/.test(url)) {
    return "loopback IP";
  }

  if (
    /:\/\/192\.168\.\d+\.\d+|:\/\/10\.\d+\.\d+\.\d+|:\/\/172\.(1[6-9]|2[0-9]|3[01])\.\d+\.\d+/.test(
      url,
    )
  ) {
    return "private IP address";
  }

  if (/:\/\/\d+\.\d+\.\d+\.\d+/.test(url)) {
    return "IP address instead of domain";
  }

  return null;
}
