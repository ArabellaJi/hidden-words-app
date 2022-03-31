//Dummy data for lists for each category

let lists = [
    {
        label: "Anxiety",
        verses: ["Matthew 11:28", "Philippians 4:6-7", "Psalms 119:114", "John 14:27", "Psalms 16:8", "Isaiah 41:10"]
    },
    {
        label: "Belief",
        verses: ["John 1:12", "Romans 15:13", "Romans 4:20-21"]
    },
    {
        label: "Compassion",
        verses: ["Ephesians 4:32", "Isaiah 30:18", "Colossians 3:12-14"]
    },
    {
        label: "Faith",
        verses: ["James 2:14-17", "Romans 3:22", "Hebrews 12:1-2", "Proverbs 3:3", "Hebrews 10:23-25", "Colossians 2:6-7"]
    },
    {
        label: "God's plans",
        verses: ["Isaiah 30:18", "Genesis 50:20", "Proverbs 19:21", "Jeremiah 29:11-13"]
    },
    {
        label: "The Gospel",
        verses: ["Romans 1:16", "John 3:16"]
    }
  ];
  
  export function getVerseLists() {
    return lists;
  }