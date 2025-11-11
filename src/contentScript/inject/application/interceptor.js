(() => {
  const MESSAGE_TYPE_PREFIX = 'GUPY_INTERCEPT_';

  const intercepts = [
    {
      regex: /\/selection-process\/candidate\/application\/(\d+)\/step/,
      event: 'STEPS'
    }
  ];

  function emitToContent(detail, eventName) {
    const type = `${MESSAGE_TYPE_PREFIX}${eventName}`;
    window.dispatchEvent(new CustomEvent(type, { detail }));
  }

  // --- Intercept fetch ---
  const originalFetch = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input.url;
    const method = (init && init.method) || 'GET';

    const response = await originalFetch.apply(this, arguments);

    const respClone = response.clone();
    let respBody = null;
    try {
      const text = await respClone.text();
      try { respBody = JSON.parse(text); } catch { respBody = text; }
    } catch { }

    intercepts.forEach(({ regex, event }) => {
      const match = url.match(regex);
      if (match) {
        emitToContent({
          type: 'fetch',
          request: { url, method, requestBody: init?.body || null, time: Date.now() },
          response: respBody,
          status: response.status,
          timestamp: new Date().toISOString()
        }, event);
      }
    });

    return response;
  };

  // --- Intercept XHR ---
  const OriginalXHR = window.XMLHttpRequest;
  function WrappedXHR() {
    const xhr = new OriginalXHR();
    let _url, _method, _requestBody;

    const openOrig = xhr.open;
    xhr.open = function (method, url) { _method = method; _url = url; return openOrig.apply(xhr, arguments); };

    const sendOrig = xhr.send;
    xhr.send = function (body) {
      _requestBody = body;

      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
          intercepts.forEach(({ regex, event }) => {
            const match = _url.match(regex);
            if (match) {
              const applicationId = match[1];
              let resp = xhr.responseText;
              try { resp = JSON.parse(resp); } catch { }

              emitToContent({
                type: 'xhr',
                applicationId,
                request: { url: _url, method: _method, requestBody: _requestBody, time: Date.now() },
                response: resp,
                status: xhr.status,
                timestamp: new Date().toISOString()
              }, event);
            }
          });
        }
      });

      return sendOrig.apply(xhr, arguments);
    };

    return xhr;
  }
  window.XMLHttpRequest = WrappedXHR;
})();
