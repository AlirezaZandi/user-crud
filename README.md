This repo is for testing NextJS V13 new feature, _server actions_

If you clone this repo first run this command to install packages

```bash
yarn
```

after installing packages run this command to initiate db migrations:

```bash
npx prisma migrate dev --name init
```

now run this command to start localhost server on port 3000:

```bash
yarn dev
```
