#vue-starter(3.0.0)

a vue scaffolding, using vue(2.0) + vue-router(2.0) + vuex(2.0) + webpack(2.0)

## dev (serve on 8080 by default)

        npm run dll
        npm run dev

## build 

        npm run build

## application structure

        ├── action // app actions
        ├── assets // app common asserts
        ├── components  // app components
        ├── pages  // app router component
        ├── router  // app router
        └── store // app store
            ├── index.js //app store entry
            └── index // state and mutations for every module 
                └── index.js
        ├── main.js // app entry

## test 

todo...