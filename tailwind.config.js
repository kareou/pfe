import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            fontSize : {
                'xxs' : '.5rem',
            },
            colors: {
                'my_red' : '#BE3144',
                'my_gray' : '#303841',
                'my_gray2' : '#3A4750',
                'my_white' : '#D3D6DB',
            },
            backgroundImage: {
                'hero-pattern': "url('./peakpx.jpg')",
            },
        },
    },

    plugins: [forms],
};
