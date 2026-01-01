// Venn Diagram Puzzles in Hebrew - 3 Categories
// Zones: a, b, c (single), ab, ac, bc (pairs), abc (all three)

window.VENN_PUZZLES = [
    {
        id: 1,
        categoryA: "פירות",
        categoryB: "ירקות",
        categoryC: "אדום",
        words: [
            { word: "תפוח", zone: "ac" },      // Apple - fruit + red
            { word: "בננה", zone: "a" },       // Banana - just fruit
            { word: "גזר", zone: "b" },        // Carrot - just vegetable
            { word: "עגבניה", zone: "abc" },   // Tomato - fruit, vegetable, red
            { word: "תות", zone: "ac" },       // Strawberry - fruit + red
            { word: "מלפפון", zone: "b" },     // Cucumber - just vegetable
            { word: "פלפל", zone: "bc" }       // Red pepper - vegetable + red
        ]
    },
    {
        id: 2,
        categoryA: "חיות בית",
        categoryB: "חיות בר",
        categoryC: "טורפים",
        words: [
            { word: "כלב", zone: "a" },        // Dog - pet
            { word: "חתול", zone: "ac" },      // Cat - pet + predator
            { word: "אריה", zone: "bc" },      // Lion - wild + predator
            { word: "ארנב", zone: "ab" },      // Rabbit - pet or wild
            { word: "זאב", zone: "bc" },       // Wolf - wild + predator
            { word: "דג", zone: "a" },         // Fish - pet
            { word: "נמר", zone: "bc" }        // Tiger - wild + predator
        ]
    },
    {
        id: 3,
        categoryA: "מזון חם",
        categoryB: "מזון קר",
        categoryC: "מתוק",
        words: [
            { word: "מרק", zone: "a" },        // Soup - hot
            { word: "גלידה", zone: "bc" },     // Ice cream - cold + sweet
            { word: "שוקו", zone: "ac" },      // Hot chocolate - hot + sweet
            { word: "סלט", zone: "b" },        // Salad - cold
            { word: "עוגה", zone: "c" },       // Cake - sweet (can be any temp)
            { word: "פיצה", zone: "a" },       // Pizza - hot
            { word: "ארטיק", zone: "bc" }      // Popsicle - cold + sweet
        ]
    },
    {
        id: 4,
        categoryA: "ספורט מים",
        categoryB: "ספורט כדור",
        categoryC: "ספורט קבוצתי",
        words: [
            { word: "שחיה", zone: "a" },       // Swimming - water
            { word: "כדורגל", zone: "bc" },    // Soccer - ball + team
            { word: "פולו", zone: "abc" },     // Water polo - all three
            { word: "טניס", zone: "b" },       // Tennis - ball
            { word: "כדורסל", zone: "bc" },    // Basketball - ball + team
            { word: "גלישה", zone: "a" },      // Surfing - water
            { word: "כדורעף", zone: "bc" }     // Volleyball - ball + team
        ]
    },
    {
        id: 5,
        categoryA: "כלי נגינה",
        categoryB: "עשוי עץ",
        categoryC: "משמיע צליל גבוה",
        words: [
            { word: "גיטרה", zone: "ab" },     // Guitar - instrument + wood
            { word: "חליל", zone: "abc" },     // Flute - instrument + wood + high
            { word: "תוף", zone: "a" },        // Drum - instrument
            { word: "כינור", zone: "abc" },    // Violin - instrument + wood + high
            { word: "פסנתר", zone: "ab" },     // Piano - instrument + wood
            { word: "שולחן", zone: "b" },      // Table - just wood
            { word: "צפצפה", zone: "c" }       // Whistle - just high sound
        ]
    },
    {
        id: 6,
        categoryA: "רהיטים",
        categoryB: "מכשירי חשמל",
        categoryC: "במטבח",
        words: [
            { word: "כסא", zone: "a" },        // Chair - furniture
            { word: "מקרר", zone: "bc" },      // Fridge - appliance + kitchen
            { word: "שולחן", zone: "ac" },     // Table - furniture + kitchen
            { word: "תנור", zone: "bc" },      // Oven - appliance + kitchen
            { word: "ספה", zone: "a" },        // Sofa - furniture
            { word: "מיקסר", zone: "bc" },     // Mixer - appliance + kitchen
            { word: "מיטה", zone: "a" }        // Bed - furniture
        ]
    },
    {
        id: 7,
        categoryA: "עופות",
        categoryB: "יונקים",
        categoryC: "חיים במים",
        words: [
            { word: "נשר", zone: "a" },        // Eagle - bird
            { word: "דולפין", zone: "bc" },    // Dolphin - mammal + water
            { word: "פינגווין", zone: "ac" },  // Penguin - bird + water
            { word: "כלב", zone: "b" },        // Dog - mammal
            { word: "ברווז", zone: "ac" },     // Duck - bird + water
            { word: "לויתן", zone: "bc" },     // Whale - mammal + water
            { word: "תוכי", zone: "a" }        // Parrot - bird
        ]
    },
    {
        id: 8,
        categoryA: "משקאות",
        categoryB: "מכיל חלב",
        categoryC: "קר",
        words: [
            { word: "מיץ", zone: "ac" },       // Juice - drink + cold
            { word: "שוקו", zone: "ab" },      // Chocolate milk - drink + milk (can be hot)
            { word: "גלידה", zone: "bc" },     // Ice cream - milk + cold
            { word: "קפה", zone: "a" },        // Coffee - drink (hot)
            { word: "מילקשייק", zone: "abc" }, // Milkshake - drink + milk + cold
            { word: "גבינה", zone: "b" },      // Cheese - milk
            { word: "מים", zone: "ac" }        // Water - drink + cold
        ]
    },
    {
        id: 9,
        categoryA: "בגדים",
        categoryB: "לרגליים",
        categoryC: "לחורף",
        words: [
            { word: "מעיל", zone: "ac" },      // Coat - clothing + winter
            { word: "נעליים", zone: "b" },     // Shoes - feet
            { word: "מגפיים", zone: "bc" },    // Boots - feet + winter
            { word: "גרביים", zone: "abc" },   // Socks - clothing + feet + winter
            { word: "חולצה", zone: "a" },      // Shirt - clothing
            { word: "צעיף", zone: "c" },       // Scarf - winter
            { word: "סנדלים", zone: "b" }      // Sandals - feet
        ]
    },
    {
        id: 10,
        categoryA: "ירוק",
        categoryB: "עגול",
        categoryC: "אוכלים",
        words: [
            { word: "תפוח", zone: "bc" },      // Apple - round + edible
            { word: "מלפפון", zone: "ac" },    // Cucumber - green + edible
            { word: "כדור", zone: "b" },       // Ball - round
            { word: "עלה", zone: "a" },        // Leaf - green
            { word: "אבטיח", zone: "abc" },    // Watermelon - green + round + edible
            { word: "אפונה", zone: "abc" },    // Peas - green + round + edible
            { word: "עגבניה", zone: "bc" }     // Tomato - round + edible
        ]
    }
];
