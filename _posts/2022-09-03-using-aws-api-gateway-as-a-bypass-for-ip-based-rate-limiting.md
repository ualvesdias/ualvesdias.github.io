---
created: 2022-05-07T01:39:05 (UTC -03:00)
title: "Using AWS API Gateway as a bypass for IP based rate limiting"
tags: [infosec, pentesting, web, rate-limiting, aws,api-gateway, cloud]
author: Odysseus
---

# Using AWS API Gateway as a bypass for IP based rate limiting mechanisms

> This is how you can bypass any IP based rate limiting defenses in your red teaming/pentesting engagements: An AWS Free Tier account and an API Gateway HTTP Proxy

## The situation

Imagine you are performing a penetration testing and need to execute some kind of high traffic action such as, for example, a directory/file discovery on a web server. Sometimes this type of activity is not possible due to rate limiting defenses implemented, that is, you have some kind of protection that detects high traffic coming from a single IP and blocks this source from requesting resources from the web server for a period of time or, worst, puts the IP in a blacklist for good.

Here is a very simple diagram of the situation:

![High traffic being blocked by a rate limit protection](https://cdn-images-1.medium.com/max/800/1*V5L81j1iYC_VbQzC-OOexg.png)

In this post we’ll see a tool that was recently introduced to me and we’ll see exactly what it does. But we’ll not dive into the tool. We’ll instead manually apply everything that it automates for us and why it bypasses the rate limiting protection. This is actually a post about one of the resources of the AWS API Gateway service.

## The tool

On a recent engagement I decided to use a tool called [fireprox](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fustayready%2Ffireprox), introduced to me by my good friend [Raphael Mota](https://medium.com/r/?url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fraphaelmota-cybersecurity%2F) in order to bypass this protection on the target server. **Of course, all the credits for the tool and the use of the API Gateway Proxy resource for this propouse are in the github page of the tool. I just learned and decided to write a post about it.**

![The tool overview](https://cdn-images-1.medium.com/max/800/1*dYA11YvpXAAy5gafpoaOFg.png)

What this tool does is to automate the process of creating an pass-through HTTP Proxy using AWS API Gateway service. The magic is that every request coming from this proxy has an unique IP address. You read it right! An unique IP address for every request! Well, that’s the solution to our situation. Let’s see this magic happening, but I’ll not cover how to create an AWS free tier account so the post doesn’t get too long.

The first thing we need to do is create a new user in the “Identity and Access Management (IAM)” AWS service:

![Creating a new user in the AWS IAM](https://cdn-images-1.medium.com/max/800/1*yMTIB1sD69G1rZR_HYZEdA.png)

Let’s give this user a name and mark the “Programmatic access” checkbox:

![Setting up the new IAM user](https://cdn-images-1.medium.com/max/800/1*QZ3TiVBS0BJMZGio8EFWLw.png)

Now let’s create a new group for this user. This is mandatory for the tool to work:

![Creating a new group in the IAM ](https://cdn-images-1.medium.com/max/800/1*-DEO-J7ILeIsklxpiup7fA.png)

Now we have to name the group and add the policy “AmazonAPIGatewayAdministrator” to it. This policy is needed so we can use this user’s credentials in the tool:

![Setting up the group and adding a policy to it](https://cdn-images-1.medium.com/max/800/1*v1-xGSGT8e9e3BIfwhtpmw.png)

Check if everything is correct and create the new user:

![Overview of the new user](https://cdn-images-1.medium.com/max/800/1*50T5Cyk2XEJM_6bV9vxrtA.png)

Now write down the ACCESS KEY and the SECRET ACCESS KEY because we’ll use them in our tool:

![Access keys for the newly created user](https://cdn-images-1.medium.com/max/800/1*6xHu7JzcRv3MRICWMkV-3g.png)

Now that we have a user created, we can use the tool. After cloning the repository with _git clone_ [_https://github.com/ustayready/fireprox_](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fustayready%2Ffireprox) and installing the dependencies with _python3 -m pip install -r requirements.txt_, we can see what it does:

![Help from fireprox](https://cdn-images-1.medium.com/max/800/1*vf4JMUVFkC-Fz0idqn6G-g.png)

So, we can issue commands using the tool and we have to pass the user’s acecss keys:

![](Listing the API’s availablehttps://cdn-images-1.medium.com/max/800/1*Qo1FecFAIZ6BackATHERVw.png)

So, we don’t have any API’s yet. Let’s create one. But first, we need a target. This target is a service where the proxy will send all the requests to. I’ll use a VPS of mine hosted by DigitalOcean. It will be a simple python web server:

![](htPython HTTP servertps://cdn-images-1.medium.com/max/800/1*_CMoAvayRLHrrmpF3F1uqw.png)

Now we can create a proxy using fireprox that points to our web server:

![](htCreating a proxy using fireproxtps://cdn-images-1.medium.com/max/800/1*eDoKI8SqUAO4H_XkoOb62Q.png)

So now, we can simply curl our newly created proxy and it will forward the request to our web server:

![](Reaching the destination server through the proxyhttps://cdn-images-1.medium.com/max/800/1*jXUEdW0R-TDViEtsOGbPpA.png)

Looking the web server log we see the request. Note the source IP address:

![](The request comming from the proxyhttps://cdn-images-1.medium.com/max/800/1*CO6-wiP_Z_RysYVGCXO8gg.png)

We can see that this is not my real IP address:

![](htMy real IP addresstps://cdn-images-1.medium.com/max/800/1*blr1wVY8MMCHOYLqnS_34A.png)

In fact, let’s simulate a directory listing attack and see what happens:

![](htSimulating a directory listing bruteforce attacktps://cdn-images-1.medium.com/max/800/1*IRWPG1eMZuTAp-3bt6LVZA.png)

![The result of the attack](https://cdn-images-1.medium.com/max/800/1*L0iGLSz9N-wLHvjrY2hIDg.png)

See? One single IP address for every request! That’s awesome!!

However, as a very famous saying in my country goes: not everything in life are flowers. Let’s use another python webserver and issue a request again:

![Real IP leaking through X-Forwarded-For HTTP header](https://cdn-images-1.medium.com/max/800/1*QpMXlZ2R5uXTtVkwxzuHyw.png)

Ah-há! There’s a catch. The real source IP address is put in the header “X-Forwarded-For” and it arrives at the target. So if the web server or web application running on this server looks for this header, we’re done.

To fix this, we can use a very neat resource provided to us by the API Gateway: a header mapping. Thanks to [Fred Reimer](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Ffreimer) for this awesome discovery!

Turns out that we can send a custom header with our request, because fireprox creates a mapping from the header “X-My-X-Forwarded-For” to “X-Forwarded-For”, so we can control its content. Let’s see:

![Sending a fake IP address](https://cdn-images-1.medium.com/max/800/1*SV0lILAhC9aC1qBnPKNfKQ.png)

![FakeIP arriving at the destination server](https://cdn-images-1.medium.com/max/800/1*Fm6jgdOlB7m5lKOSCml0_w.png)

Now, all we have to do is send one random IP address using this custom header and we’re done!

Now you must be asking yourself what’s in this “server.py” file that allows me to see the header. Let’s take a quick look:

![Simple Python HTTP server](https://cdn-images-1.medium.com/max/800/1*w3P2o-yHJA825BB4gXgKwg.png)

This server simply uses the custom class “MyHandler” as base for actions based on the methods of the requests it gets. In this example, I only have actions for GET requests, jsut to make thing simple. we see that all it does is get the header i want and print it on the screen. The function “connection” serves the service and waits for incoming connections.

## Under the hood

Now that we know how the tool works, let’s see what it does with our AWS credentials. Let’s go to the API Gateway service and see what’s there:

![REST API created by fireprox](https://cdn-images-1.medium.com/max/800/1*o0ZXkM9KtqOfHr2EcC7axw.png)

![API resource created by fireprox](https://cdn-images-1.medium.com/max/800/1*wV40zXwYhV3KcJYHM5CMuQ.png)

As we can see above, fireprox creates a simple API structure. Let’s see the configs for this GET method:

![GET method structure](https://cdn-images-1.medium.com/max/800/1*CsQO1tmAJhBAn769pFmIbw.png)

We can see a very clear structure: on the left, the client, in our case the curl command. On the far right, the target application on port 8585. In between, the proxy.

Now, notice that we have the “Method Request” and the “Integration Request” boxes. The first one is the request that comes from the client. See the “X-My-X-Forwarded-For” header? This box knows that this header will come within the request.

Also, we have the header “X-Forwarded-For” in the “Integration Request” box, that represents the request going from the proxy to the final destination. Let’s see how this header mapping works:

![Header mapping](https://cdn-images-1.medium.com/max/800/1*bHx4_g3cIu_Ji77eGvwxZQ.png)

Clicking on the “Integration Request” box, we can see its details, which include HTTP headers. See that we have one entry for that and there’s a mapping going on: The contents of the “X-Forwarded-For” header comes from the contents of the header “X-My-X-Forwarded-For” header from the client request. That’s how we can change the header contents. 

Now you must be wondering: but what if we simply delete this header entry? Let’s see:

![No headers in the “Integration Request” box](https://cdn-images-1.medium.com/max/800/1*0uFX-qCwlopc9Snyey9O9A.png)

Issuing another request:

![New request without the “X-Forwarded-For” header](https://cdn-images-1.medium.com/max/800/1*QpteZjpxSTlctkwllxGPoA.png)

See? Somehow the behavior is still the same. My real IP address continues to leak through the “X-Forwarded-For” header. Somehow we still have the mapping in place even after deleting the header. And if we also delete the custom header from the “Method Request” box, the result is the same. So we must use this custom header if we want to prevent our IP from leaking in the final request to the target application.

## Simulating requests with random IP addresses

To conclude our journey, I’ll run a final attack simulation, but this time I’ll also simulate a server that permanently blocks IP addresses that send requests faster than 10 per second.

First, let’s create a very simple Python script that runs with threads and sends requests to our server:

![](https://cdn-images-1.medium.com/max/800/1*177b4B8BotXi-Pm9QPMtCw.png)

Python script for simulating sending requests using multi threading

1.  The function _random\_ip()_ just returns a random valid IP address;
2.  The function _send\_request()_ sends as many requests as the number passed in command line to the option “--requests”. It’s called once for every thread;
3.  All threads are spawned, each one calling the function _send\_request()_ with the arguments _url, requests_ and _delay._

Now the target web server:

Soon… 

## How to protect your application against this type of attack? 

Soon… 

## Final thoughts

It’s needless to say that this is an amazing tool. And because I’m a little bit lazy, I’ll just paste the print for the credits:

![Thanks to these people!](https://cdn-images-1.medium.com/max/800/1*C9Pehl7L3GTEl3mfq3Do3g.png)

As a final thought, please, don’t use this method in places you don’t have permission to. You can violate the [AWS policy](https://medium.com/r/?url=https%3A%2F%2Faws.amazon.com%2Faup%2F) and get yourself in big trouble.