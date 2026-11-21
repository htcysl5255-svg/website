import Blocks from "@/components/Blocks";
import { HOME_PAGE, SITE } from "@/lib/content";

/**
 * Business card for Google (schema.org). Lets search results show the
 * address, area and contact links, and helps local searches such as
 * "Çukurambar öğrenci koçu".
 */
const businessInfo = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.brandName,
  description: SITE.description,
  url: SITE.url,
  image: new URL(SITE.shareImage, SITE.url).toString(),
  logo: new URL("/logo.png", SITE.url).toString(),
  telephone: `+${SITE.contact.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.contact.address,
    addressLocality: "Çankaya",
    addressRegion: "Ankara",
    addressCountry: "TR",
  },
  areaServed: [
    { "@type": "City", name: "Ankara" },
    { "@type": "Place", name: "Çukurambar" },
  ],
  sameAs: [`https://www.instagram.com/${SITE.contact.instagram.replace("@", "")}/`],
  knowsLanguage: "tr",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessInfo) }}
      />
      <Blocks blocks={HOME_PAGE.content} />
    </>
  );
}
