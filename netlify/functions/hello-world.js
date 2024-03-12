// This will ALWAYS POST, because for some reason method is undefined from netlify requests
exports.handler = async (request) => {

    // Specify the target domain to which you want to forward the requests
    const targetDomain = 'http://localhost.airdns.org:32707/';

    orgRequestBody = await request.blob
    console.log("incoming request body blob" + JSON.stringify(orgRequestBody))
  
    // // Create a new URL object from the request's URL
    // const url = new URL(request.url);
  
    const url = new URL(targetDomain);
  
    // // Replace the origin of the request URL with the target domain
    // url.host = new URL(targetDomain).host;
    // url.protocol = new URL(targetDomain).protocol;
    // url.port = new URL(targetDomain).port;
  
    // const { pathname, search } = url;
  
    // const destinationURL = `${targetDomain}${pathname}${search}`;
    console.log("Url to contact: " + JSON.stringify(url));
  
    let init = {}
    // Preserve the original request method (e.g., GET, POST), headers, and body
    // if (request.method === "POST" ) {
    init = {
      method: "POST",
      // headers: request.headers,
      // Body is stream, must be forwarded as is for methods that have body
      body: orgRequestBody
    };
    console.log("Preparing a POST")
    // } else {
    //   init = {
    //     method: request.method,
    //     // headers: request.headers,
    //   };
  
    // Create a new request with the updated URL and original request properties
    const newRequest = new Request(url, init);

    console.log("Sending this request to server: "+ JSON.stringify(newRequest ))
  
    // Fetch the response from the target domain
    let response = await fetch(newRequest);
  
    // Example: Modify the response (optional)
    // This example simply clones the response. You could modify it as needed.
    // response = new Response(response.body, response);
  
    // Return the response back to the client
    console.log("Got this response from server:" + JSON.stringify(response))
    let bodyReturned = response.text()
    console.log("Got this body from server: " + JSON.stringify(bodyReturned))

    return {
      statusCode: response.status,
      body:JSON.stringify(bodyReturned)
    };

  }


  // return {
  //   statusCode: 200,
  //   body: 'hello world!',
  // };
// };
