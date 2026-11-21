import headphoneImage from "../assets/images/products/headphone.jpg";
import smartwatchImage from "../assets/images/products/smartwatch.jpg";
import shoesImage from "../assets/images/products/shoes.jpg";
import cameraImage from "../assets/images/products/camera.jpg";

export const sampleProducts = [
    {
        id: 1,
        name: "هدفون بی‌سیم مدل Pro",
        category: "صوتی و تصویری",
        price: 2450000,
        discountPrice: 1990000,
        rating: 4.8,
        image: headphoneImage,
        badge: "پرفروش"
    },
    {
        id: 2,
        name: "ساعت هوشمند سری ۸",
        category: "لوازم دیجیتال",
        price: 3800000,
        discountPrice: 3290000,
        rating: 4.6,
        image: smartwatchImage,
        badge: "تخفیف ویژه"
    },
    {
        id: 3,
        name: "کفش ورزشی روزمره",
        category: "پوشاک",
        price: 2900000,
        discountPrice: null,
        rating: 4.7,
       image: shoesImage,
        badge: null
    },
    {
        id: 4,
        name: "دوربین عکاسی دیجیتال",
        category: "لوازم دیجیتال",
        price: 12500000,
        discountPrice: 11200000,
        rating: 4.9,
       image: cameraImage,
        badge: "پیشنهاد ویژه"
    }
];