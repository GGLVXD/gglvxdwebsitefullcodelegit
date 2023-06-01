import axios from 'axios';

export default function Index({ pageUrls }) {
  return (
    <div>
      {pageUrls.map((url) => (
        <iframe key={url} src={url} style={{ width: '100%', height: '600px', border: 'none' }} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get('n7.danbot.host:1629/sitemap.xml');
  const xmlData = response.data;

  // Parse the sitemap XML to extract page URLs
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  const urlElements = xmlDoc.getElementsByTagName('loc');
  const pageUrls = Array.from(urlElements).map((element) => element.textContent);

  return {
    props: {
      pageUrls,
    },
  };
}
