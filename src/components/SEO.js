import { useEffect } from 'react';

const SEO = ({ location }) => {
  useEffect(() => {
    document.title = `New Year 2026 - Live from ${location}`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = `Join the global countdown to 2026. Live synchronization for ${location}.`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "New Year 2026 Countdown",
      "startDate": "2025-12-31T23:59:59",
      "location": { "@type": "Place", "name": location },
      "description": "Global countdown timer synchronized to local timezones."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [location]);

  return null;
};

export default SEO;