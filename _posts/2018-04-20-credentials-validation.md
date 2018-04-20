---
layout: default
title: "Credentials Validation Without Auth"
tags: web infosec
---

# __Credentials Validation without authentication__

As I said in my [first post](purpose), the reason for me to start a blog was a flaw that I've found in one of the Check Point appliances. Because I want to register a CVE, I'm required to have a public PoC explaining the vuln. So, here it is... 


## What I discovered?

Basicaly I found a way to validate credentials in the login page of the Check Point VPN appliance. By validate I mean that I can know whether a pair username:password is valid or not inside the web application without the need of authentication.


## How I discovered it?

I was doing a pentest in a public organization in my country and I decided to do some manual enumeration in the login page of the VPN appliance. First I saw that the webapp displays an error message (*Access denied - wrong user name or password*):

![First error message](../assets/img/firsterror.jpg)

 when I tried to input some random credentials. So far nothing wrong. Things started to bother me when I used some credentials I got in a phishing campaign in the login page and the webapp showed me a different message (*User is unauthorized*):

![First error message](../assets/img/seconderror.jpg)

I wasn't able to login into the webapp, but I got a different error message than before... This is at least a weird behavior. So based on this, I tried some combinations: wrong_username:valid_password, valid_username:invalid_password, invalid_username:invalid_password. In all of these attempts I got the first error message. Only when I used a credential from the ones I got from the phishing campaign I was able to receive the second message. So, based on this, I concluded that those credentials must exist somewhere inside the appliance, in a database, but the user isn't allowed to login.


## Okay, but how can a bad guy take advantage of it?

