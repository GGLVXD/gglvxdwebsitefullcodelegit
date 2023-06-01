const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function fetchRoutes() {
  try {
    const response = await axios.get('http://n7.danbot.host:1629/routes'); // Replace with the correct API endpoint to fetch routes
    return response.data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    return [];
  }
}

async function generateIframeRoutes() {
  const routes = await fetchRoutes();

  if (routes.length === 0) {
    console.warn('No routes found.');
    return;
  }

  const iframeTemplate = (route) => `
    <html>
      <head>
        <title>${route}</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="http://n7.danbot.host:1629${route}"></iframe>
      </body>
    </html>
  `;

  routes.forEach(async (route) => {
    const iframeContent = iframeTemplate(route);
    const filePath = path.join('build', 'pages', route, 'index.html');
    const directoryPath = path.dirname(filePath);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(filePath, iframeContent);
    console.log(`Generated ${route}`);
  });
}

generateIframeRoutes();
