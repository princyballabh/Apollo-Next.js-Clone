// filepath: c:\Users\princ\OneDrive\Desktop\Internship\Apollo-Doctors-Clone\apollo-doctors-clone\src\pages\_app.tsx
import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;