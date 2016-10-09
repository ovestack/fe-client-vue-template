#vue-starter

a vue scaffolding,using vue + vue-router + vuex,fork from [vue-cli](https://github.com/vuejs/vue-cli)

## dev

        npm run dev

## build 

        npm run build

## application structure

        ├── action // app actions
        │   └── index.js // app actions entry
        ├── assets
        │   └── logo.png // app common asserts
        ├── components  // app components
        ├── pages  // app router components        
        │   └── index
        │       └── index.vue // app router component
        │       └── @sub // app subRouter
        │           └── test
        │               └── test.vue // app subRouter component
        ├── main.js // app entry
        ├── router.js // app router
        └── store // app store
            ├── index.js //app store entry
            └── index // state and mutations for every module 
                └── index.js

## router

        1. Router-loader will generate routermap according to directory structure in 'pages/',the same name .vue file is the entry component of router
        2. When there is a folder named '@sub', router-loader will generate subRouter to vue-router
        3. '/pages/index' alias '/' by default
        4. Otherwise, folder name begin with '_' will be ignored
        5. Because of automatic router generate, so restful url is unvalid, use query instead to pass params
        
        Here is some examples:

                /pages/index/ --> /#/
                /pages/index/@sub/test/ --> /#/test
                /pages/another --> /#/another
                /pages/another/@sub/inner/ --> /#/another/inner // inner is subRouter of another
                /pages/another/inner/ --> /#/another/inner // inner is same level router as another

## mock

        /mock/index.js

## test 

todo...