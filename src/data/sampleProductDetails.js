
import { sampleProducts } from "./sampleProducts";

const getProductImage = (id) =>
    sampleProducts.find((product) => product.id === id)?.image;

export const sampleProductDetails = [
    // 1. Headphone
    {
        id: "product-1",
        name: "هدفون بی‌سیم مدل Pro",
        slug: "wireless-headphone-pro",
        category: "صوتی و تصویری",

        description:
            "هدفون بی‌سیم با کیفیت صدای عالی، طراحی ارگونومیک، باتری قدرتمند و قابلیت اتصال بلوتوث. مناسب برای موسیقی، مکالمه و استفاده روزمره.",

        shortDescription: "هدفون بی‌سیم با کیفیت صدای عالی",

        rating: 4.8,

        images: [getProductImage(1)].filter(Boolean),

        attributes: [
            { name: "نوع اتصال", value: "Bluetooth" },
            { name: "محدوده عملکرد", value: "10 متر" },
            { name: "نوع باتری", value: "لیتیومی" },
            { name: "گارانتی", value: "18 ماه" }
        ],

        variants: [
            {
                id: "hp-black",
                name: "مشکی",
                sku: "HEADPHONE-BLACK",
                price: 2450000,
                discountPrice: 1990000,
                stockQuantity: 12,
                isDefault: true,
                attributes: [{ name: "رنگ", value: "مشکی" }]
            },
            {
                id: "hp-white",
                name: "سفید",
                sku: "HEADPHONE-WHITE",
                price: 2450000,
                discountPrice: null,
                stockQuantity: 8,
                isDefault: false,
                attributes: [{ name: "رنگ", value: "سفید" }]
            },
            {
                id: "hp-blue",
                name: "آبی",
                sku: "HEADPHONE-BLUE",
                price: 2550000,
                discountPrice: 2200000,
                stockQuantity: 0,
                isDefault: false,
                attributes: [{ name: "رنگ", value: "آبی" }]
            }
        ]
    },

    // 2. Smart Watch
    {
        id: "product-2",
        name: "ساعت هوشمند سری ۸",
        slug: "smart-watch-series-8",
        category: "لوازم دیجیتال",

        description:
            "ساعت هوشمند با طراحی مدرن، نمایشگر باکیفیت، امکانات ورزشی و قابلیت اتصال به تلفن همراه.",

        shortDescription: "ساعت هوشمند با امکانات ورزشی و سلامتی",

        rating: 4.6,

        images: [getProductImage(2)].filter(Boolean),

        attributes: [
            { name: "نوع نمایشگر", value: "AMOLED" },
            { name: "اتصال", value: "Bluetooth" },
            { name: "سازگاری", value: "Android / iOS" },
            { name: "مقاومت", value: "مقاوم در برابر پاشش آب" }
        ],

        variants: [
            {
                id: "sw-black",
                name: "مشکی",
                sku: "SMARTWATCH-BLACK",
                price: 3800000,
                discountPrice: 3290000,
                stockQuantity: 10,
                isDefault: true,
                attributes: [{ name: "رنگ", value: "مشکی" }]
            },
            {
                id: "sw-silver",
                name: "نقره‌ای",
                sku: "SMARTWATCH-SILVER",
                price: 3800000,
                discountPrice: null,
                stockQuantity: 6,
                isDefault: false,
                attributes: [{ name: "رنگ", value: "نقره‌ای" }]
            }
        ]
    },

    // 3. Sport Shoes
    {
        id: "product-3",
        name: "کفش ورزشی روزمره",
        slug: "daily-sport-shoes",
        category: "پوشاک",

        description:
            "کفش ورزشی سبک و راحت با طراحی مناسب برای پیاده‌روی، فعالیت روزانه و استفاده طولانی‌مدت.",

        shortDescription: "کفش ورزشی سبک و راحت برای استفاده روزانه",

        rating: 4.7,

        images: [getProductImage(3)].filter(Boolean),

        attributes: [
            { name: "جنس رویه", value: "پارچه تنفسی" },
            { name: "جنس زیره", value: "EVA" },
            { name: "نوع استفاده", value: "روزمره و ورزشی" },
            { name: "کشور سازنده", value: "چین" }
        ],

        variants: [
            {
                id: "sh-40",
                name: "سایز ۴۰",
                sku: "SHOES-40",
                price: 2900000,
                discountPrice: null,
                stockQuantity: 5,
                isDefault: true,
                attributes: [{ name: "سایز", value: "40" }]
            },
            {
                id: "sh-41",
                name: "سایز ۴۱",
                sku: "SHOES-41",
                price: 2900000,
                discountPrice: null,
                stockQuantity: 8,
                isDefault: false,
                attributes: [{ name: "سایز", value: "41" }]
            },
            {
                id: "sh-42",
                name: "سایز ۴۲",
                sku: "SHOES-42",
                price: 2900000,
                discountPrice: null,
                stockQuantity: 0,
                isDefault: false,
                attributes: [{ name: "سایز", value: "42" }]
            },
            {
                id: "sh-43",
                name: "سایز ۴۳",
                sku: "SHOES-43",
                price: 2900000,
                discountPrice: null,
                stockQuantity: 4,
                isDefault: false,
                attributes: [{ name: "سایز", value: "43" }]
            }
        ]
    },

    // 4. Digital Camera
    {
        id: "product-4",
        name: "دوربین عکاسی دیجیتال",
        slug: "digital-camera",
        category: "لوازم دیجیتال",

        description:
            "دوربین عکاسی دیجیتال با کیفیت تصویر بالا، امکانات متنوع عکاسی و طراحی مناسب برای علاقه‌مندان به عکاسی.",

        shortDescription: "دوربین دیجیتال با کیفیت تصویر بالا",

        rating: 4.9,

        images: [getProductImage(4)].filter(Boolean),

        attributes: [
            { name: "نوع دوربین", value: "دیجیتال" },
            { name: "قابلیت فیلم‌برداری", value: "4K" },
            { name: "نوع ذخیره‌سازی", value: "SD Card" },
            { name: "گارانتی", value: "18 ماه" }
        ],

        variants: [
            {
                id: "33EF9C6C-9173-4525-9D5B-4E752A596FC4",
                name: "مشکی",
                sku: "CAMERA-BLACK",
                price: 12500000,
                discountPrice: 11200000,
                stockQuantity: 3,
                isDefault: true,
                attributes: [{ name: "رنگ", value: "مشکی" }]
            },
            {
                id: "B41FA153-0CEC-4186-8D22-96178067260A",
                name: "نقره‌ای",
                sku: "CAMERA-SILVER",
                price: 12500000,
                discountPrice: null,
                stockQuantity: 2,
                isDefault: false,
                attributes: [{ name: "رنگ", value: "نقره‌ای" }]
            }
        ]
    }
];
