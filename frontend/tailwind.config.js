module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
        extend: {
            width: {
                '18': '4.5rem',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}