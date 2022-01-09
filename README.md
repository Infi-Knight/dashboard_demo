# Work in progress

[demo](https://compassionate-brattain-4c4f05.netlify.app)

## Flow

- current locale is obtained using `navigator.language`. In case no locale is set, 'sv-SE' is used
- search is debounced with a 300ms delay and shows result in search as you type manner. Only customer name is used as a search key for now
- if a different club is choosen from the menu, the filters will be reset
- filters will be preserved across pages (i.e the paginated data) for the same club's invoices

## Design changes

- Table based layout was looking cluttered on 1024px viewport, so I took the liberty to not show a table based layout below 1280px viewport size

## TODO

- write tests
- cleanup code
- error handling and loading states

## libraries used

- [Reach UI](https://reach.tech/) as a building block for accessible components
- [SVGR](https://react-svgr.com/) for handling svg icons
- [swr](https://swr.vercel.app/) for data fetching and server state
- [jotai](https://jotai.org/) for client state management
- [react-intl](https://formatjs.io/docs/react-intl) for localization

### Some problems I encountered and their fixes

#### fixing svg use in nextjs with svgr

- https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
- https://duncanleung.com/next-js-typescript-svg-any-module-declaration/
