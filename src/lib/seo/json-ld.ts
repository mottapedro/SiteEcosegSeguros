import { siteConfig } from "./config";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
    sameAs: [],
  };
}

interface ServiceJsonLdInput {
  name: string;
  description: string;
  path: string;
}

export function serviceJsonLd({ name, description, path }: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    url: `${siteConfig.url}${path}`,
    provider: {
      "@type": "InsuranceAgency",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: "BR",
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
