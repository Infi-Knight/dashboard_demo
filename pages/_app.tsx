// NOTE: make sure all the reach ui styles come before globals.css as the globals file
// brings in the tailwind styles. Since class and data attribute selector have same specificity
// tailwind styles need to follow reach ui styles in order to override them if required
import '@reach/tabs/styles.css';
import '@reach/listbox/styles.css';
import '@reach/combobox/styles.css';
import '@reach/checkbox/styles.css';
import '@reach/accordion/styles.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'jotai';
import { IntlProvider } from 'react-intl';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider
      locale={typeof window === 'undefined' ? 'en-US' : navigator.language}
      defaultLocale={'sv-SE'}
    >
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </IntlProvider>
  );
}

export default MyApp;
