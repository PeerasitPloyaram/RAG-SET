# STELLA Frontend (RAG - SEC)
##### STELLA stands for [LLM for S.E.T]
It is a web application that allows users and guests to ask questions and receive answers from files stored in the system, such as One Reports (56-1), ESG Reports, or other related documents.

###### This project is my Senior Project (01418499) in Computer Science at Kasetsart University.

### Members
- ##### นาย พีรสิษฐ์ พลอยอร่าม 6410451237

<br>

### STELLA is Contains of 2 Repositories
- [STELLA Frontend (This Project)](https://github.com/PeerasitPloyaram/RAG-SET)
- [STELLA Backend](https://github.com/PeerasitPloyaram/STELLA-Backend)

### About This Repository
This repository is a frontend of STELLA. It is built with Nuxt.js, a Vue.js framework.
It incluses the following features:
- SignIn / SignUp and Authentication
- Chat with Long Term Memmory for User (must login)
- Chat Memmory for Guest (no login but it have expiration time)
- Chat History Session
- Admin Management
    - File Management (Create, Update, Delete, Change Description)
    - Company Management (Create, Delete)


### Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Before Run Server
Rename ```.env_example``` to ```.env``` and add the required data inside .env (This must be done before running server.)

## Run Server
### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
