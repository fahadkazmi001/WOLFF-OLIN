export const SERVICE_TYPES = [
  {
    id: "brand-identity",
    label: "Brand Identity",
    blurb: "Logo, colors, typography and a cohesive visual identity.",
  },
  {
    id: "logo-design",
    label: "Logo Design",
    blurb: "A standalone logo for your business.",
  },
  {
    id: "website-design",
    label: "Website Design",
    blurb: "A new website, built around your brand.",
  },
  {
    id: "full-branding",
    label: "Full Branding",
    blurb: "Strategy, identity, voice and collateral — end to end.",
  },
  {
    id: "social-media",
    label: "Social Media Package",
    blurb: "On-brand post templates and a content system.",
  },
];

export const commonFields = [
  { name: "name", label: "Your Name", type: "text", required: true },
  { name: "email", label: "Your Email", type: "email", required: true },
  { name: "phone", label: "Phone Number (optional)", type: "text", required: false },
  { name: "company", label: "Company / Brand Name", type: "text", required: true },
];

const budgetOptions = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

export const serviceFields = {
  "brand-identity": [
    { name: "industry", label: "Industry / What you do", type: "text", required: true },
    { name: "missionValues", label: "Mission, vision or core values", type: "textarea" },
    { name: "targetAudience", label: "Target audience", type: "textarea" },
    { name: "competitors", label: "Main competitors", type: "text" },
    {
      name: "brandPersonality",
      label: "Brand personality (pick what fits)",
      type: "checkboxGroup",
      options: ["Modern", "Classic", "Playful", "Luxury", "Minimal", "Bold", "Friendly", "Professional"],
    },
    { name: "preferredColors", label: "Preferred colors", type: "text" },
    { name: "colorsToAvoid", label: "Colors or styles to avoid", type: "text" },
    {
      name: "deliverables",
      label: "Deliverables needed",
      type: "checkboxGroup",
      options: [
        "Logo",
        "Color palette",
        "Typography system",
        "Business cards",
        "Brand guidelines",
        "Social media kit",
        "Letterhead / stationery",
      ],
    },
    { name: "hasExistingMaterials", label: "Do you have an existing logo or brand materials?", type: "select", options: ["Yes", "No"] },
    { name: "referenceLinks", label: "Brands or inspiration you like (links)", type: "textarea" },
    { name: "budget", label: "Budget range", type: "select", options: budgetOptions },
    { name: "timeline", label: "Timeline / deadline", type: "text" },
    { name: "notes", label: "Anything else the designer should know", type: "textarea" },
  ],

  "logo-design": [
    { name: "industry", label: "Industry", type: "text", required: true },
    { name: "tagline", label: "Tagline (if any)", type: "text" },
    {
      name: "brandPersonality",
      label: "Style / personality (pick what fits)",
      type: "checkboxGroup",
      options: ["Modern", "Classic", "Playful", "Luxury", "Minimal", "Bold", "Handmade", "Corporate"],
    },
    { name: "preferredColors", label: "Preferred colors", type: "text" },
    { name: "colorsToAvoid", label: "Colors or styles to avoid", type: "text" },
    { name: "symbolsToInclude", label: "Symbols, icons or ideas to include", type: "textarea" },
    { name: "symbolsToAvoid", label: "Anything to avoid including", type: "text" },
    { name: "competitorLogos", label: "Competitor or inspiration logos (links)", type: "textarea" },
    { name: "hasExistingLogo", label: "Do you have an existing logo?", type: "select", options: ["Yes, needs a refresh", "Yes, starting from scratch instead", "No"] },
    {
      name: "usage",
      label: "Where will the logo be used?",
      type: "checkboxGroup",
      options: ["Website", "Print", "Merchandise", "Signage", "App icon", "Social media"],
    },
    { name: "budget", label: "Budget range", type: "select", options: budgetOptions },
    { name: "timeline", label: "Timeline / deadline", type: "text" },
    { name: "notes", label: "Anything else the designer should know", type: "textarea" },
  ],

  "website-design": [
    { name: "industry", label: "Industry", type: "text", required: true },
    {
      name: "websitePurpose",
      label: "Purpose of the website",
      type: "select",
      options: ["Business / info site", "Online store", "Portfolio", "Blog", "Booking / appointments", "Landing page", "Other"],
    },
    { name: "pageCount", label: "Approx. number of pages", type: "text" },
    {
      name: "designStyle",
      label: "Preferred design style",
      type: "checkboxGroup",
      options: ["Modern & minimal", "Bold & colorful", "Luxury & elegant", "Playful & fun", "Corporate & professional"],
    },
    { name: "referenceLinks", label: "Websites you like (links)", type: "textarea" },
    { name: "hasBrandAssets", label: "Do you have an existing logo, colors and fonts?", type: "select", options: ["Yes", "No", "Some of it"] },
    { name: "targetAudience", label: "Target audience", type: "textarea" },
    {
      name: "features",
      label: "Key features needed",
      type: "checkboxGroup",
      options: ["Contact form", "Online store", "Booking system", "Blog", "Login / membership", "Payment integration", "Multi-language"],
    },
    { name: "contentReady", label: "Is your content (text/images) ready?", type: "select", options: ["Yes", "No", "Partially"] },
    { name: "domainHosting", label: "Domain & hosting status", type: "select", options: ["I have both", "I have a domain only", "I need both", "Not sure"] },
    { name: "budget", label: "Budget range", type: "select", options: budgetOptions },
    { name: "timeline", label: "Timeline / deadline", type: "text" },
    { name: "notes", label: "Anything else the designer should know", type: "textarea" },
  ],

  "full-branding": [
    { name: "industry", label: "Industry / what you do", type: "text", required: true },
    { name: "companyOverview", label: "Brief overview of your company", type: "textarea" },
    { name: "missionValues", label: "Mission, vision or core values", type: "textarea" },
    { name: "targetAudience", label: "Target audience", type: "textarea" },
    { name: "competitors", label: "Main competitors", type: "text" },
    {
      name: "brandPersonality",
      label: "Brand personality (pick what fits)",
      type: "checkboxGroup",
      options: ["Modern", "Classic", "Playful", "Luxury", "Minimal", "Bold", "Friendly", "Professional"],
    },
    {
      name: "scopeNeeded",
      label: "What do you need included?",
      type: "checkboxGroup",
      options: [
        "Brand strategy",
        "Naming",
        "Logo & visual identity",
        "Verbal identity / tone of voice",
        "Website",
        "Packaging",
        "Social media kit",
        "Brand guidelines",
      ],
    },
    { name: "hasExistingMaterials", label: "Do you have existing brand materials?", type: "select", options: ["Yes", "No"] },
    { name: "referenceLinks", label: "Brands or inspiration you like (links)", type: "textarea" },
    { name: "budget", label: "Budget range", type: "select", options: budgetOptions },
    { name: "timeline", label: "Timeline / deadline", type: "text" },
    { name: "notes", label: "Anything else the team should know", type: "textarea" },
  ],

  "social-media": [
    { name: "industry", label: "Industry", type: "text", required: true },
    {
      name: "platforms",
      label: "Platforms needed",
      type: "checkboxGroup",
      options: ["Instagram", "Facebook", "TikTok", "LinkedIn", "X (Twitter)", "Pinterest", "YouTube"],
    },
    { name: "packageSize", label: "Posts per month / package size", type: "text" },
    {
      name: "contentStyle",
      label: "Content style / tone",
      type: "checkboxGroup",
      options: ["Fun & casual", "Elegant & minimal", "Bold & colorful", "Professional & corporate", "Educational"],
    },
    { name: "hasBrandAssets", label: "Do you have existing logo, colors and fonts?", type: "select", options: ["Yes", "No", "Some of it"] },
    { name: "contentPillars", label: "Main topics / content pillars", type: "textarea" },
    { name: "referenceAccounts", label: "Accounts you like the look of (links)", type: "textarea" },
    {
      name: "goals",
      label: "Main goal",
      type: "checkboxGroup",
      options: ["Brand awareness", "Engagement", "Sales / leads", "Grow followers"],
    },
    { name: "budget", label: "Budget range", type: "select", options: budgetOptions },
    { name: "timeline", label: "Timeline / start date", type: "text" },
    { name: "notes", label: "Anything else the team should know", type: "textarea" },
  ],
};
