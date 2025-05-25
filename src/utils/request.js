import { ipcRenderer } from 'electron';

/**
 * Sends an HTTP request using curl through Electron IPC.
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {string} body - The request body.
 * @param {Array<{key: string, value: string}>} queryParams - Query parameters.
 * @param {Array<{key: string, value: string}>} pathParams - Path parameters.
 * @param {Array<{key: string, value: string}>} formData - Form data for URL-encoded requests.
 * @returns {Promise<{response: {html: string, prettyHtml: string}, status: number}>} - The response object with HTML and status code.
 */
export async function request(url, method, body, queryParams, pathParams, formData) {
  try {
    // Construct the full URL with query parameters
    let fullUrl = url;
    if (pathParams && pathParams.length > 0) {
      pathParams.forEach(param => {
        fullUrl = fullUrl.replace(`:${param.key}`, param.value);
      });
    }
    if (queryParams && queryParams.length > 0) {
      const queryString = queryParams
        .filter(param => param.key && param.value)
        .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&');
      if (queryString) {
        fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
      }
    }

    // Handle form data for URL-encoded requests
    let requestBody = body;
    if (method === 'POST' && formData && formData.length > 0) {
      requestBody = formData
        .filter(data => data.key && data.value)
        .map(data => `${encodeURIComponent(data.key)}=${encodeURIComponent(data.value)}`)
        .join('&');
    }

    // Use Electron IPC to send request
    const response = await ipcRenderer.invoke('send-request', method, fullUrl, requestBody || '');

    return {
      response: {
        html: response.body || response.toString(),
        prettyHtml: formatHtml(response.body || response.toString())
      },
      status: response.status || 0
    };
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

/**
 * Formats HTML content for pretty printing.
 * @param {string} html - The raw HTML content.
 * @returns {string} - Formatted HTML string.
 */
function formatHtml(html) {
  // Very basic HTML formatting for demonstration. In a real app, use a library like 'pretty' or 'html-formatter'.
  try {
    let formatted = '';
    let indent = 0;
    const lines = html.split(/(<[^>]+>)/g);
    for (const line of lines) {
      if (line.match(/<\/[^>]+>/)) {
        indent--;
        formatted += '  '.repeat(indent) + line + '\n';
      } else if (line.match(/<[^>]+>/)) {
        formatted += '  '.repeat(indent) + line + '\n';
        indent++;
      } else {
        formatted += '  '.repeat(indent) + line + '\n';
      }
    }
    return formatted;
  } catch (e) {
    return html; // Fallback to raw HTML if formatting fails
  }
}
