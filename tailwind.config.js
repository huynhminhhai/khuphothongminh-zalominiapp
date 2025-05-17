module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        'primary-color': "var(--primary-color)",
        'secondary-color': "var(--secondary-color)",
        'gray-color': "var(--gray-color)",
        'black-color': "var(--black-color)",
      }
    },
  },
};
