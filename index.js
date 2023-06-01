import React, { useEffect, useRef } from 'react';

export default function Index() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const loadIframeContent = async () => {
      const response = await fetch('n7.danbot.host:1629/sitemap.xml');
      const xmlData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const urlElements = xmlDoc.getElementsByTagName('loc');

      if (iframeRef.current) {
        const iframeUrl = urlElements[0].textContent;
        iframeRef.current.src = iframeUrl;
      }
    };

    loadIframeContent();
  }, []);

  return (
    <div>
      <iframe ref={iframeRef} style={{ width: '100%', height: '600px', border: 'none' }} />
    </div>
  );
}
