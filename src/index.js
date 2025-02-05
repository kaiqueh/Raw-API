const http = require("http");
const routes = require("./routes/routes");
const url = require("url");
const bodyParser = require("./helpers/bodyParser");

const Server = http.createServer((request, response) => {

const parsedUrl = url.parse(request.url, true);

let {pathname} = parsedUrl; 
let id = null

let splitEndpoint = pathname.split("/").filter(Boolean);
console.log(splitEndpoint);

if(splitEndpoint.length > 1){
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
}


const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
))

if(route){
    request.params = {id};
    request.query = parsedUrl.query;

    response.send = (statusCode, body) => {
        response.writeHead(statusCode, { "Content-Type": "application/json" });
        response.end(JSON.stringify(body));
    };

    if(["POST", "PUT"].includes(request.method)){
        bodyParser(request, () => route.handler(request, response));
    }else { 
        route.handler(request, response);
    } 
    return;
}else{
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(`Cannot ${request.method} ${pathname}`);
}

  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>Server created with Node.js</h1>");
});

Server.listen(3000, () => console.log("Server is running on port 3000🔥"));
