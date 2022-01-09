# Invoice generation dashboard

[demo](https://compassionate-brattain-4c4f05.netlify.app)

## Flow

- current locale is obtained using `navigator.language`. In case no locale is set, 'sv-SE' is used
- search is debounced with a 300ms delay and shows result in search as you type manner. Only customer name is used as a search key for now
- if a different club is choosen from the menu, the filters will be reset
- filters will be preserved across pages (i.e the paginated data) for the same club's invoices

### Data flow

- There are two backend apis: `/clubs` and `/invoices`
- First all the clubs are fetched and the first one is choosen as default
- Then all the invoices associated to this club are fetched and shown. Changing the club triggers call to the `invoices` api

## File structure

- `components`: contains react components, with most of state being located in `components/homeTabs/InvoicesPanel.tsx`
- `config`: global constants
- `hooks`: some hooks for data fetching
- `icons`: svg icons with their fill color set to `currentColor`
- `store`: contains Jotai atoms for app's state management
- `images.d.ts`: see last heading below
## Design changes

- Table based layout was looking cluttered on 1024px viewport, so I took the liberty to not show a table based layout below 1280px viewport size

## What more could be done

- write tests
- perf audit
- cleanup code

## libraries used

- [Reach UI](https://reach.tech/) as a building block for accessible components
- [jotai](https://jotai.org/) for client state management
- [swr](https://swr.vercel.app/) for data fetching and server state management
- [SVGR](https://react-svgr.com/) for handling svg icons
- [react-intl](https://formatjs.io/docs/react-intl) for localization
- [react-error-boundary](https://www.npmjs.com/package/react-error-boundary)
- [react-focus-lock](https://www.npmjs.com/package/react-focus-lock) to lock foucs in filter ui when it is open

### Some problems I encountered and their fixes

#### fixing svg use in nextjs with svgr

- https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
- https://duncanleung.com/next-js-typescript-svg-any-module-declaration/
