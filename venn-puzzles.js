// Venn Diagram Puzzles in Hebrew - 3 Categories
// Zones: a, b, c (single), ab, ac, bc (pairs), abc (all three)
// Each puzzle has 7 words distributed across different zones

window.VENN_PUZZLES = [
    {
        id: 1,
        categoryA: "פירות",
        categoryB: "ירקות", 
        categoryC: "אדום",
        words: [
            { word: "בננה", zone: "a" },       // Banana - just fruit
            { word: "גזר", zone: "b" },        // Carrot - just vegetable
            { word: "דובדבן", zone: "c" },     // Cherry - just red (small, like candy)
            { word: "אבטיח", zone: "ab" },     // Watermelon - fruit & vegetable-like
            { word: "תות", zone: "ac" },       // Strawberry - fruit + red
            { word: "פלפל", zone: "bc" },      // Red pepper - vegetable + red
            { word: "עגבניה", zone: "abc" }    // Tomato - all three
        ]
    },
    {
        id: 2,
        categoryA: "חיות בית",
        categoryB: "חיות בר",
        categoryC: "טורפים",
        words: [
            { word: "דג זהב", zone: "a" },     // Goldfish - just pet
            { word: "צבי", zone: "b" },        // Deer - just wild
            { word: "עכביש", zone: "c" },      // Spider - just predator
            { word: "ארנב", zone: "ab" },      // Rabbit - pet or wild
            { word: "חתול", zone: "ac" },      // Cat - pet + predator
            { word: "זאב", zone: "bc" },       // Wolf - wild + predator
            { word: "חמוס", zone: "abc" }      // Ferret - can be all three
        ]
    },
    {
        id: 3,
        categoryA: "חם",
        categoryB: "קר",
        categoryC: "מתוק",
        words: [
            { word: "מרק", zone: "a" },        // Soup - just hot
            { word: "סלט", zone: "b" },        // Salad - just cold
            { word: "סוכריה", zone: "c" },     // Candy - just sweet
            { word: "קפה", zone: "ab" },       // Coffee - hot or cold
            { word: "שוקו", zone: "ac" },      // Hot chocolate - hot + sweet
            { word: "גלידה", zone: "bc" },     // Ice cream - cold + sweet
            { word: "מילקשייק", zone: "abc" }  // Milkshake - all three options
        ]
    },
    {
        id: 4,
        categoryA: "עגול",
        categoryB: "ירוק",
        categoryC: "אוכלים",
        words: [
            { word: "כדור", zone: "a" },       // Ball - just round
            { word: "עלה", zone: "b" },        // Leaf - just green
            { word: "לחם", zone: "c" },        // Bread - just edible
            { word: "צפרדע", zone: "ab" },     // Frog - round-ish + green
            { word: "תפוז", zone: "ac" },      // Orange - round + edible
            { word: "מלפפון", zone: "bc" },    // Cucumber - green + edible
            { word: "אפונה", zone: "abc" }     // Peas - all three
        ]
    },
    {
        id: 5,
        categoryA: "כלי נגינה",
        categoryB: "עשוי עץ",
        categoryC: "קטן",
        words: [
            { word: "תוף", zone: "a" },        // Drum - just instrument
            { word: "שולחן", zone: "b" },      // Table - just wood
            { word: "מטבע", zone: "c" },       // Coin - just small
            { word: "גיטרה", zone: "ab" },     // Guitar - instrument + wood
            { word: "משולש", zone: "ac" },     // Triangle - instrument + small
            { word: "קוביה", zone: "bc" },     // Wooden cube - wood + small
            { word: "חליל", zone: "abc" }      // Recorder - all three
        ]
    },
    {
        id: 6,
        categoryA: "רהיטים",
        categoryB: "חשמלי",
        categoryC: "במטבח",
        words: [
            { word: "ספה", zone: "a" },        // Sofa - just furniture
            { word: "מחשב", zone: "b" },       // Computer - just electric
            { word: "סיר", zone: "c" },        // Pot - just kitchen
            { word: "מנורה", zone: "ab" },     // Lamp - furniture + electric
            { word: "שולחן", zone: "ac" },     // Table - furniture + kitchen
            { word: "מיקסר", zone: "bc" },     // Mixer - electric + kitchen
            { word: "מקרר", zone: "abc" }      // Fridge - all three
        ]
    },
    {
        id: 7,
        categoryA: "עופות",
        categoryB: "יונקים",
        categoryC: "שוחים",
        words: [
            { word: "נשר", zone: "a" },        // Eagle - just bird
            { word: "פיל", zone: "b" },        // Elephant - just mammal
            { word: "דג", zone: "c" },         // Fish - just swims
            { word: "פינגווין", zone: "ac" },  // Penguin - bird + swims
            { word: "לויתן", zone: "bc" },     // Whale - mammal + swims
            { word: "תוכי", zone: "a" },       // Parrot - just bird
            { word: "ברווז", zone: "abc" }     // Duck - all three (bird, swims, some say mammal-like care)
        ]
    },
    {
        id: 8,
        categoryA: "בגדים",
        categoryB: "לרגליים",
        categoryC: "לחורף",
        words: [
            { word: "חולצה", zone: "a" },      // Shirt - just clothing
            { word: "כפכפים", zone: "b" },     // Flip flops - just feet
            { word: "צעיף", zone: "c" },       // Scarf - just winter
            { word: "מכנסיים", zone: "ab" },   // Pants - clothing + legs
            { word: "מעיל", zone: "ac" },      // Coat - clothing + winter
            { word: "מגפיים", zone: "bc" },    // Boots - feet + winter
            { word: "גרביים", zone: "abc" }    // Socks - all three
        ]
    },
    {
        id: 9,
        categoryA: "משקאות",
        categoryB: "חלב",
        categoryC: "בוקר",
        words: [
            { word: "מים", zone: "a" },        // Water - just drink
            { word: "גבינה", zone: "b" },      // Cheese - just dairy
            { word: "ביצה", zone: "c" },       // Egg - just breakfast
            { word: "שוקו", zone: "ab" },      // Chocolate milk - drink + dairy
            { word: "קפה", zone: "ac" },       // Coffee - drink + breakfast
            { word: "יוגורט", zone: "bc" },    // Yogurt - dairy + breakfast
            { word: "חלב", zone: "abc" }       // Milk - all three
        ]
    },
    {
        id: 10,
        categoryA: "ספורט",
        categoryB: "כדור",
        categoryC: "קבוצתי",
        words: [
            { word: "שחיה", zone: "a" },       // Swimming - just sport
            { word: "בלון", zone: "b" },       // Balloon - just ball-shaped
            { word: "מקהלה", zone: "c" },      // Choir - just group
            { word: "טניס", zone: "ab" },      // Tennis - sport + ball
            { word: "ריצה", zone: "ac" },      // Running (relay) - sport + team
            { word: "כדורגל", zone: "abc" },   // Soccer - all three
            { word: "כדורסל", zone: "abc" }    // Basketball - all three
        ]
    }
];
