/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-faded": "var(--accent-faded)",
        "gray-bg": "var(--gray-bg)",
        "menu-bg": "var(--menu-bg)",
        "drpdwn-select": "var(--drpdwn-select)",
        "drpdwn-unselect": "var(--drpdwn-unselect)",
        "drpdwn-hover": "var(--drpdwn-hover)",
        "streak-color": "var(--streak-color)",
        "streak-win-bg": "var(--streak-win-bg)",
        "streak-lost": "var(--streak-lost)",
        "streak-lost-bg": "var(--streak-lost-bg)",
        right: "var(--right)",
        wrong: "var(--wrong)",
        partial: "var(--partial)",
        heart: "var(--heart)",
        disabled: "var(--disabled)",
        copied: "var(--copied)",
        placeholder: "var(--placeholder)",
      },
    },
  },
  plugins: [],
};


// --white: white;
//     --accent: #4ed8b8;
//     --accent-faded: #9bd6c7;
//     --gray-bg: #0F1118;
//     --menu-bg: #292A39;
//     /* Dropdown */
//     --drpdwn-select: #4E4E6F;
//     --drpdwn-unselect: #1C1C26;
//     --drpdwn-hover: #1f202c;
//     /* Streak */
//     --streak-color: #FFEA7C;
//     --streak-win-bg: #322E1A;
//     --streak-lost: #E36870;
//     --streak-lost-bg: #321A1A;
//     /* Game */
//     --right: #40AC2E;
//     --wrong: #AC2E2E;
//     --partial: #AF9E40;
//     /* Elements */
//     --heart: #EE4B4B;
//     --disabled:#63646b;
//     --copied: #CFCFCF;
//     --placeholder: #757791;