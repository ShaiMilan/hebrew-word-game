// Venn Diagram Puzzles in Hebrew
// Each puzzle has two categories and 7 words to place

window.VENN_PUZZLES = [
    {
        id: 1,
        leftCategory: "פירות",
        rightCategory: "ירקות",
        words: [
            { word: "תפוח", zone: "left" },      // Apple - fruit
            { word: "בננה", zone: "left" },      // Banana - fruit
            { word: "גזר", zone: "right" },      // Carrot - vegetable
            { word: "מלפפון", zone: "right" },   // Cucumber - vegetable
            { word: "עגבניה", zone: "middle" },  // Tomato - both (botanically fruit, culinarily vegetable)
            { word: "אבוקדו", zone: "middle" },  // Avocado - both
            { word: "תות", zone: "left" }        // Strawberry - fruit
        ]
    },
    {
        id: 2,
        leftCategory: "חיות בית",
        rightCategory: "חיות בר",
        words: [
            { word: "כלב", zone: "left" },       // Dog - pet
            { word: "חתול", zone: "left" },      // Cat - pet
            { word: "אריה", zone: "right" },     // Lion - wild
            { word: "זאב", zone: "right" },      // Wolf - wild
            { word: "סוס", zone: "middle" },     // Horse - both
            { word: "ארנב", zone: "middle" },    // Rabbit - both
            { word: "נמר", zone: "right" }       // Tiger - wild
        ]
    },
    {
        id: 3,
        leftCategory: "כלי מטבח",
        rightCategory: "כלי אוכל",
        words: [
            { word: "סיר", zone: "left" },       // Pot - kitchen tool
            { word: "מחבת", zone: "left" },      // Pan - kitchen tool
            { word: "צלחת", zone: "right" },     // Plate - eating utensil
            { word: "מזלג", zone: "right" },     // Fork - eating utensil
            { word: "סכין", zone: "middle" },    // Knife - both
            { word: "כף", zone: "middle" },      // Spoon - both
            { word: "קערה", zone: "middle" }     // Bowl - both
        ]
    },
    {
        id: 4,
        leftCategory: "ספורט מים",
        rightCategory: "ספורט כדור",
        words: [
            { word: "שחיה", zone: "left" },      // Swimming - water sport
            { word: "גלישה", zone: "left" },     // Surfing - water sport
            { word: "כדורגל", zone: "right" },   // Soccer - ball sport
            { word: "טניס", zone: "right" },     // Tennis - ball sport
            { word: "פולו", zone: "middle" },    // Water polo - both
            { word: "צלילה", zone: "left" },     // Diving - water sport
            { word: "כדורסל", zone: "right" }    // Basketball - ball sport
        ]
    },
    {
        id: 5,
        leftCategory: "מזון חם",
        rightCategory: "מזון קר",
        words: [
            { word: "מרק", zone: "left" },       // Soup - hot
            { word: "פיצה", zone: "left" },      // Pizza - hot
            { word: "גלידה", zone: "right" },    // Ice cream - cold
            { word: "סלט", zone: "right" },      // Salad - cold
            { word: "קפה", zone: "middle" },     // Coffee - both
            { word: "תה", zone: "middle" },      // Tea - both
            { word: "סושי", zone: "right" }      // Sushi - cold
        ]
    },
    {
        id: 6,
        leftCategory: "כלי נגינה",
        rightCategory: "כלי כתיבה",
        words: [
            { word: "גיטרה", zone: "left" },     // Guitar - instrument
            { word: "פסנתר", zone: "left" },     // Piano - instrument
            { word: "עט", zone: "right" },       // Pen - writing tool
            { word: "עפרון", zone: "right" },    // Pencil - writing tool
            { word: "חליל", zone: "left" },      // Flute - instrument
            { word: "מחק", zone: "right" },      // Eraser - writing tool
            { word: "תוף", zone: "left" }        // Drum - instrument
        ]
    },
    {
        id: 7,
        leftCategory: "בגדי קיץ",
        rightCategory: "בגדי חורף",
        words: [
            { word: "שורט", zone: "left" },      // Shorts - summer
            { word: "גופיה", zone: "left" },     // Tank top - summer
            { word: "מעיל", zone: "right" },     // Coat - winter
            { word: "צעיף", zone: "right" },     // Scarf - winter
            { word: "ג׳ינס", zone: "middle" },   // Jeans - both
            { word: "נעלי", zone: "middle" },    // Shoes - both
            { word: "סנדל", zone: "left" }       // Sandals - summer
        ]
    },
    {
        id: 8,
        leftCategory: "רהיטים",
        rightCategory: "מכשירי חשמל",
        words: [
            { word: "כסא", zone: "left" },       // Chair - furniture
            { word: "שולחן", zone: "left" },     // Table - furniture
            { word: "מקרר", zone: "right" },     // Refrigerator - appliance
            { word: "טלויזיה", zone: "right" },  // TV - appliance
            { word: "מיטה", zone: "left" },      // Bed - furniture
            { word: "תנור", zone: "right" },     // Oven - appliance
            { word: "ארון", zone: "left" }       // Closet - furniture
        ]
    },
    {
        id: 9,
        leftCategory: "משקאות",
        rightCategory: "קינוחים",
        words: [
            { word: "מיץ", zone: "left" },       // Juice - drink
            { word: "מים", zone: "left" },       // Water - drink
            { word: "עוגה", zone: "right" },     // Cake - dessert
            { word: "גלידה", zone: "right" },    // Ice cream - dessert
            { word: "שוקו", zone: "middle" },    // Chocolate milk - both
            { word: "מילקשייק", zone: "middle" },// Milkshake - both
            { word: "ביסקויט", zone: "right" }   // Cookie - dessert
        ]
    },
    {
        id: 10,
        leftCategory: "עופות",
        rightCategory: "יונקים",
        words: [
            { word: "נשר", zone: "left" },       // Eagle - bird
            { word: "תוכי", zone: "left" },      // Parrot - bird
            { word: "פיל", zone: "right" },      // Elephant - mammal
            { word: "דוב", zone: "right" },      // Bear - mammal
            { word: "עטלף", zone: "right" },     // Bat - mammal (flies but mammal)
            { word: "פינגווין", zone: "left" },  // Penguin - bird
            { word: "כלב", zone: "right" }       // Dog - mammal
        ]
    }
];

