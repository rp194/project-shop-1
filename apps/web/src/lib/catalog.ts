import type { Locale } from "@/lib/i18n";

export const inventoryStatuses = ["in_stock", "out_of_stock", "available_for_order"] as const;
export type InventoryStatus = (typeof inventoryStatuses)[number];

export const sortOptions = ["featured", "name_asc", "name_desc", "price_asc", "price_desc", "stock_first"] as const;
export type CatalogSort = (typeof sortOptions)[number];

export type ProductCategory = {
  slug: string;
  label: Record<Locale, string>;
  children?: ProductCategory[];
};

export type ProductVariant = {
  sku: string;
  color: string;
  size: string;
  inventoryStatus: InventoryStatus;
};

export type ProductImage = {
  src: string;
  webpSrc: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  description: Record<Locale, string>;
  categorySlug: string;
  attributes: Record<string, string>;
  specs: Record<string, string>;
  images: ProductImage[];
  variants: ProductVariant[];
  price: number;
  featuredRank: number;
};

const toWebp = (src: string): string => src.replace(/\.[a-zA-Z0-9]+(\?.*)?$/, ".webp$1");

const makeGallery = (sources: string[], alt: string): ProductImage[] =>
  sources.map((src, index) => ({
    src,
    webpSrc: toWebp(src),
    alt: `${alt} ${index + 1}`,
  }));

export const categoryTree: ProductCategory[] = [
  {
    slug: "electrical",
    label: { fa: "برق صنعتی", en: "Electrical" },
    children: [
      { slug: "cable-trays", label: { fa: "سینی کابل", en: "Cable Trays" } },
      { slug: "connectors", label: { fa: "کانکتورها", en: "Connectors" } },
    ],
  },
  {
    slug: "safety",
    label: { fa: "تجهیزات ایمنی", en: "Safety" },
    children: [
      { slug: "gloves", label: { fa: "دستکش", en: "Gloves" } },
      { slug: "helmets", label: { fa: "کلاه ایمنی", en: "Helmets" } },
    ],
  },
  {
    slug: "tools",
    label: { fa: "ابزار", en: "Tools" },
    children: [
      { slug: "wrenches", label: { fa: "آچار", en: "Wrenches" } },
      { slug: "measuring", label: { fa: "اندازه‌گیری", en: "Measuring" } },
    ],
  },
];

export const products: Product[] = [
  {
    slug: "modular-cable-tray",
    name: { fa: "سینی کابل ماژولار", en: "Modular Cable Tray" },
    shortDescription: {
      fa: "مناسب خطوط تولید با نصب سریع و پوشش گالوانیزه.",
      en: "Fast-install galvanized tray system for production lines.",
    },
    description: {
      fa: "سینی کابل ماژولار با تحمل بار بالا، مناسب پروژه‌های صنعتی سنگین.",
      en: "High load-bearing modular cable tray for heavy industrial projects.",
    },
    categorySlug: "cable-trays",
    attributes: {
      material: "Galvanized Steel",
      fireRating: "UL94 V-0",
      finish: "Anti-corrosion",
    },
    specs: {
      width: "300mm",
      length: "2m",
      weight: "5.2kg",
    },
    images: makeGallery(
      [
        "https://placehold.co/1200x900.jpg?text=Cable+Tray+1",
        "https://placehold.co/1200x900.jpg?text=Cable+Tray+2",
        "https://placehold.co/1200x900.jpg?text=Cable+Tray+3",
      ],
      "Modular cable tray"
    ),
    variants: [
      { sku: "MCT-BLK-300", color: "Black", size: "300mm", inventoryStatus: "in_stock" },
      { sku: "MCT-GRY-400", color: "Gray", size: "400mm", inventoryStatus: "available_for_order" },
      { sku: "MCT-BLU-300", color: "Blue", size: "300mm", inventoryStatus: "out_of_stock" },
    ],
    price: 1850000,
    featuredRank: 1,
  },
  {
    slug: "impact-safety-glove",
    name: { fa: "دستکش ایمنی ضدضربه", en: "Impact Safety Glove" },
    shortDescription: {
      fa: "مقاوم در برابر روغن و سایش برای خطوط مونتاژ.",
      en: "Oil-resistant and abrasion-proof for assembly lines.",
    },
    description: {
      fa: "دستکش چندلایه با استاندارد EN388 برای کاربری صنعتی مداوم.",
      en: "Multi-layer EN388-certified glove for continuous industrial use.",
    },
    categorySlug: "gloves",
    attributes: {
      standard: "EN388",
      grip: "Nitrile",
      cuff: "Elastic",
    },
    specs: {
      thickness: "1.8mm",
      weight: "110g",
      usage: "Heavy Duty",
    },
    images: makeGallery(
      [
        "https://placehold.co/1200x900.jpg?text=Glove+1",
        "https://placehold.co/1200x900.jpg?text=Glove+2",
      ],
      "Impact glove"
    ),
    variants: [
      { sku: "ISG-RED-M", color: "Red", size: "M", inventoryStatus: "in_stock" },
      { sku: "ISG-RED-L", color: "Red", size: "L", inventoryStatus: "in_stock" },
      { sku: "ISG-GRN-XL", color: "Green", size: "XL", inventoryStatus: "available_for_order" },
    ],
    price: 420000,
    featuredRank: 2,
  },
  {
    slug: "digital-torque-wrench",
    name: { fa: "آچار ترک‌متر دیجیتال", en: "Digital Torque Wrench" },
    shortDescription: {
      fa: "دقت بالا با نمایشگر دیجیتال برای تعمیرات صنعتی.",
      en: "High-accuracy digital display for industrial maintenance.",
    },
    description: {
      fa: "آچار ترک‌متر با قابلیت ثبت مقدار و هشدار صوتی هنگام رسیدن به گشتاور.",
      en: "Torque wrench with reading memory and audible target alerts.",
    },
    categorySlug: "wrenches",
    attributes: {
      precision: "±1%",
      range: "20-200 Nm",
      display: "Backlit LCD",
    },
    specs: {
      length: "480mm",
      battery: "2xAAA",
      calibration: "Factory calibrated",
    },
    images: makeGallery(
      [
        "https://placehold.co/1200x900.jpg?text=Wrench+1",
        "https://placehold.co/1200x900.jpg?text=Wrench+2",
        "https://placehold.co/1200x900.jpg?text=Wrench+3",
      ],
      "Digital torque wrench"
    ),
    variants: [
      { sku: "DTW-SIL-200", color: "Silver", size: "200Nm", inventoryStatus: "out_of_stock" },
      { sku: "DTW-BLK-120", color: "Black", size: "120Nm", inventoryStatus: "available_for_order" },
    ],
    price: 3200000,
    featuredRank: 3,
  },
];

const collectCategorySlugs = (category: ProductCategory): string[] => [
  category.slug,
  ...(category.children ?? []).flatMap(collectCategorySlugs),
];

const getCategoryScope = (categorySlug: string): string[] => {
  for (const root of categoryTree) {
    const group = collectCategorySlugs(root);
    if (group.includes(categorySlug)) {
      return group;
    }
  }

  return [categorySlug];
};

export const listFilterValues = () => {
  const colors = new Set<string>();
  const sizes = new Set<string>();

  for (const product of products) {
    for (const variant of product.variants) {
      colors.add(variant.color);
      sizes.add(variant.size);
    }
  }

  return {
    colors: [...colors].sort((a, b) => a.localeCompare(b)),
    sizes: [...sizes].sort((a, b) => a.localeCompare(b)),
  };
};

const sortProducts = (items: Product[], sort: CatalogSort): Product[] => {
  const sorted = [...items];

  switch (sort) {
    case "name_asc":
      sorted.sort((a, b) => a.name.en.localeCompare(b.name.en));
      break;
    case "name_desc":
      sorted.sort((a, b) => b.name.en.localeCompare(a.name.en));
      break;
    case "price_asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "stock_first":
      sorted.sort(
        (a, b) =>
          Number(!a.variants.some((variant) => variant.inventoryStatus === "in_stock")) -
          Number(!b.variants.some((variant) => variant.inventoryStatus === "in_stock"))
      );
      break;
    default:
      sorted.sort((a, b) => a.featuredRank - b.featuredRank);
  }

  return sorted;
};

export type CatalogQuery = {
  q?: string;
  category?: string;
  status?: InventoryStatus;
  color?: string;
  size?: string;
  sort?: CatalogSort;
};

export const getProducts = (query: CatalogQuery): Product[] => {
  const scopedCategories = query.category ? getCategoryScope(query.category) : [];
  const normalizedSearch = query.q?.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (scopedCategories.length > 0 && !scopedCategories.includes(product.categorySlug)) {
      return false;
    }

    if (query.status && !product.variants.some((variant) => variant.inventoryStatus === query.status)) {
      return false;
    }

    if (query.color && !product.variants.some((variant) => variant.color === query.color)) {
      return false;
    }

    if (query.size && !product.variants.some((variant) => variant.size === query.size)) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const searchable = `${product.name.fa} ${product.name.en} ${product.shortDescription.fa} ${product.shortDescription.en}`.toLowerCase();
    return searchable.includes(normalizedSearch);
  });

  return sortProducts(filtered, query.sort ?? "featured");
};

export const getProductBySlug = (slug: string): Product | null =>
  products.find((product) => product.slug === slug) ?? null;

export const getInventoryStatusLabel = (locale: Locale, status: InventoryStatus): string => {
  if (locale === "fa") {
    if (status === "in_stock") return "موجود";
    if (status === "out_of_stock") return "ناموجود";
    return "قابل سفارش";
  }

  if (status === "in_stock") return "In stock";
  if (status === "out_of_stock") return "Out of stock";
  return "Available for order";
};

export const canAddToCart = (status: InventoryStatus): boolean => status !== "out_of_stock";

export const listCategories = (): Array<{ slug: string; label: Record<Locale, string> }> => {
  const flatten = (nodes: ProductCategory[]): Array<{ slug: string; label: Record<Locale, string> }> =>
    nodes.flatMap((node) => [
      { slug: node.slug, label: node.label },
      ...(node.children ? flatten(node.children) : []),
    ]);

  return flatten(categoryTree);
};
