# LeanCanvasAI

✨ **LeanCanvasAI monorepo use pnpm as package manager & nx as task runner.** ✨


## Structure
This is package based mono-repo with below structures:

### Apps
- This directory includes user facing applications and e2e testing for those applications.  

### Backend
- Bacckend applications are futher grouped into apis, migrations, gateway, etc... directory for better management.  

### Packages

#### rigs
- Rigs package includes shared configuration for the whole mono-repo. This includes common toolings such as typescript, eslint, prettier, rollup, esbuild, ...  

#### frontend
- Frontend packages includes design system, sdk, etc... which is used by client facing applications   

### Tools
- Internal tooling started with **st** command. This is independent of nx cli as their api includes breaking changes between versions.  

## Getting started

### Infrastructure
The project use redis and ollama on your local environment. To use these tools, need to install [Docker](https://docs.docker.com/engine/install/) and [Ollama](https://github.com/ollama/ollama) if you haven't done so. Also need to download `llama2` once you installed `Ollama`.  
Then, start the database and ollama with below commands:  

``` sh
pnpm start:infra
```

### Backend
For python application, we need to activate virtual environment before you run the application.  

``` sh
cd backend/apis/langchain-api
source ./.venv/bin/activate
```


If you just clone the application, will need to create `.env` file from `.env.sample` to run it locally. Then run the application with nx:  

``` sh
nx run backend-apis-langchain-api:dev
```

### Frontend
If you just clone the application, will need to create `.env` file from `.env.sample` to run it locally.  

``` sh
nx run web:dev
```

## Running tasks with NX

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

