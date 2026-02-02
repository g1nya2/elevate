/**
 * URL을 정규화합니다 (http/https 프로토콜 추가)
 * @param {string} url - 정규화할 URL
 * @returns {string} 정규화된 URL
 */
export const normalizeUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return "https://" + url.replace(/^\/+/, "");
};
