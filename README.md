# Commands

`npx skraer-back-toolkit init` for initializing structure, installing packages, adding scripts and some other  

`npx skraer-back-toolkit gen:c todo` - generate controller "TodoController"  
`npx skraer-back-toolkit gen:m todo` - generate model "Todo"  
`npx skraer-back-toolkit gen:s todo` - generate service "TodoService"  
`npx skraer-back-toolkit gen:s:c:m todo` - generate full module "todo"  
`npx skraer-back-toolkit gen:mw todo` - generate middleware "TodoMiddleware"  
`npx skraer-back-toolkit gen:module:mongo` - generate mongo module (service and model)  
`npx skraer-back-toolkit gen:module:3rdparty` - generate 3rd party request module (only service at now)  

<!-- You can add `-mongo` flag for adding some *mongo* stuff (works with models and services) -->

---
## Tip for templating
If you need to insert single template use:  
`/* TEMPLATE|T */`  
Available flags:
- T - TitleCase/PascalCase
- U - UPPERCASE
- L - lowercase  

Without of any flags text will be insert in file as you was wrote in command. Only first flag will be used eventually.

For blocks use:  
`/* TEMPLATE_BLOCK[-argument]>> content */`  
where `-argument` is flag in cli command.

If you need to insert single template inside template block use this:  
`/* TEMPLATE_BLOCK[-argument]>> some content @TEMPLATE|T@ some more content */`

Also you can use `@TEMPLATE@` outside of blocks, but it's not handy, i think so.