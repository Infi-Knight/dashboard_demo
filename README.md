# Work in progress

[demo](https://compassionate-brattain-4c4f05.netlify.app)

## Flow

- search is debounced with a 300ms delay and shows result in search as you type manner
- if a different club is choosen from the menu, the filters will be reset
- filters will be preserved across pages (i.e the paginated data) for the same club's invoices

## TODO

- responsive ui for table on larger screens
- proper i18n setup
- write tests
- perf fixes
- cleanup code

## libraries used

- [Reach UI](https://reach.tech/) as a building block for accessible components
- [SVGR](https://react-svgr.com/) for handling svg icons
- [swr](https://swr.vercel.app/) for data fetching and server state
- [jotai](https://jotai.org/) for client state management

### Some problems I encountered and their fixes

#### fixing svg use in nextjs with svgr

- https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
- https://duncanleung.com/next-js-typescript-svg-any-module-declaration/
