export interface ProductContent {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  risksMitigated: string[];
  idealFor: string[];
  example: string;
}

export interface DifferentialContent {
  title: string;
  description: string;
}

export interface TestimonialContent {
  quote: string;
  author: string;
  role: string;
}

export interface PartnerContent {
  name: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  products: ProductContent[];
  differentials: DifferentialContent[];
  partners: PartnerContent[];
  testimonials: TestimonialContent[];
  cta: {
    title: string;
    description: string;
    action: string;
  };
}
