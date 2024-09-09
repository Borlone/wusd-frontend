## 1. Project structure

#### The project is based on the Pages Router, the structure includes:

1. **pages**: Create and manage the application's routes.
2. **routes**: Represent each page. Each folder is a page in the app.
3. **shared**: Include the *layouts, base components, utils, and constants* that are reused in the app.
4. **configs**: Include the app's configurations, such as custom hooks, locales, auth, ...
5. **services**: Defines the methods to request the service API.
6. **styles**: Global styles, theme definitions.

#### Styling
- Using Tailwind CSS and SASS for the page styles, and CSS modules for the shared components.

#### Data Fetching and APIs
- Implementing Data Fetching Strategies with SSR and CSR.
- Using Axios for connecting to external APIs.

#### State Management
- Use the Context API in Next.js to manage the shared state between nested components.
- **Consider**: Can use Zustand library for managing the global state.

#### Testing
- Using Cypress for E2E and Component testing

#### The other libs used in the project
- React-hook-form + Yup: creat form and validation with Yup.
- Axios: An external API, make a request to the server.
- Thirdweb: interact with the Blockchain system, connect wallet, swap chain, read/write contract.
- @tanstack/react-query: cache the request, support wagmi for caching.
- Cypress: write and execute automation tests.

## 2. How to run the project

Clone the project from github. Install the packagges by run this command

```bash
npm install
```

Run the command to start the app in development

```bash
npm run dev
```

Run the command and follow the guide to start Cypress for automated testing.

```bash
npm run cypress:open
```
