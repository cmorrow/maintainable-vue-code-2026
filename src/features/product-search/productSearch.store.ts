import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  inStock: boolean;
}

export type SortKey = "rating" | "price-asc" | "price-desc" | "name";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Audio",
    price: 299,
    rating: 4.8,
    description: "Over-ear, 30-hour battery, active noise cancellation.",
    inStock: true,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Peripherals",
    price: 149,
    rating: 4.6,
    description: "Tactile switches, RGB backlight, compact 75% layout.",
    inStock: true,
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    price: 59,
    rating: 4.3,
    description: "HDMI 4K, 3× USB-A, SD card reader, 100W PD charging.",
    inStock: true,
  },
  {
    id: 4,
    name: "4K Webcam",
    category: "Video",
    price: 199,
    rating: 4.5,
    description: "Auto-focus, built-in ring light, wide-angle lens.",
    inStock: false,
  },
  {
    id: 5,
    name: "Ergonomic Mouse",
    category: "Peripherals",
    price: 89,
    rating: 4.7,
    description: "Vertical design reduces wrist strain. Silent clicks.",
    inStock: true,
  },
  {
    id: 6,
    name: "Desk Mat XL",
    category: "Accessories",
    price: 39,
    rating: 4.4,
    description: "Water-resistant, non-slip base, 90×40 cm.",
    inStock: true,
  },
  {
    id: 7,
    name: "Studio Monitor Speakers",
    category: "Audio",
    price: 399,
    rating: 4.9,
    description: "Flat frequency response for accurate audio reproduction.",
    inStock: true,
  },
  {
    id: 8,
    name: "Stream Deck 15-key",
    category: "Video",
    price: 149,
    rating: 4.6,
    description: "15 customizable LCD keys for workflow automation.",
    inStock: true,
  },
  {
    id: 9,
    name: "Portable SSD 1TB",
    category: "Storage",
    price: 119,
    rating: 4.8,
    description: "USB 3.2 Gen 2, up to 1050 MB/s read speed.",
    inStock: true,
  },
  {
    id: 10,
    name: "LED Ring Light 18\"",
    category: "Video",
    price: 69,
    rating: 4.2,
    description: "3 colour modes, dimmable, phone and camera mount included.",
    inStock: false,
  },
  {
    id: 11,
    name: "NVMe M.2 SSD 2TB",
    category: "Storage",
    price: 179,
    rating: 4.7,
    description: "PCIe Gen 4, up to 7000 MB/s, 5-year warranty.",
    inStock: true,
  },
  {
    id: 12,
    name: "Bluetooth Numpad",
    category: "Peripherals",
    price: 49,
    rating: 4.1,
    description: "Rechargeable, multi-device, Mac and Windows compatible.",
    inStock: true,
  },
];

const PRICE_MAX = 500;
const PRICE_STEP = 10;

export const useProductSearchStore = defineStore("product-search", () => {
  const searchQuery = ref("");
  const selectedCategory = ref("All");
  const sortBy = ref<SortKey>("rating");
  const maxPrice = ref(PRICE_MAX);
  const inStockOnly = ref(false);

  const priceMax = PRICE_MAX;
  const priceStep = PRICE_STEP;

  const categories = computed(() => [
    "All",
    ...new Set(PRODUCTS.map((p) => p.category)),
  ]);

  const filteredProducts = computed(() => {
    const q = searchQuery.value.toLowerCase();

    const result = PRODUCTS.filter((p) => {
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      )
        return false;
      if (selectedCategory.value !== "All" && p.category !== selectedCategory.value)
        return false;
      if (p.price > maxPrice.value) return false;
      if (inStockOnly.value && !p.inStock) return false;
      return true;
    });

    return result.sort((a, b) => {
      switch (sortBy.value) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return b.rating - a.rating;
      }
    });
  });

  function reset() {
    searchQuery.value = "";
    selectedCategory.value = "All";
    sortBy.value = "rating";
    maxPrice.value = PRICE_MAX;
    inStockOnly.value = false;
  }

  return {
    searchQuery,
    selectedCategory,
    sortBy,
    maxPrice,
    inStockOnly,
    priceMax,
    priceStep,
    categories,
    filteredProducts,
    reset,
  };
});
