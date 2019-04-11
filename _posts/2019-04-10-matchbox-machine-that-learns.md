---
layout: default
title: "Matchbox machine that learns"
tags: machinelearning python poc
---
Hey you! So, here I am with my first post of 2019. And here, I'm going to write about a very cool thing that I learned a few weeks ago.  
  
## But first the background story
  
I'm taking an interest in how machine learning systems work and mostly how I can apply them to data science problems. Digging up the internet on this, I've found [a very cool publication](http://cs.williams.edu/~freund/cs136-073/GardnerHexapawn.pdf) from 1962 where professor Martin Gardner explains how to build a machine out of matchboxes (that's right, matchboxes) that can learn to play a game from scratch and even master it.  
The process is actually very clever and it's an adaptation of a previous experiment where a guy builds a machine with more than 300 matchboxes to play tic-tac-toe to perfection.  



## What I discovered?

Basicaly I found a way to validate credentials in the login page of the Check Point VPN appliance. By validate I mean that I can know whether a pair username:password is valid or not inside the web application without the need of authentication.


## How I discovered it?

I was doing a pentest in a public organization in my country and I decided to do some manual enumeration in the login page of the VPN appliance. First I saw that the webapp displays an error message (*Access denied - wrong user name or password*) when I tried to input some random credentials:

![First error message](../assets/img/firsterror.jpg)

 So far nothing wrong. Things started to bother me when I used some credentials I got in a phishing campaign in the login page and the webapp showed me a different message (*User is unauthorized*):

![First error message](../assets/img/seconderror.jpg)

I wasn't able to login into the webapp, but I got a different error message than before... This is at least a weird behavior. So based on this, I tried some combinations: wrong_username:valid_password, valid_username:invalid_password, invalid_username:invalid_password. In all of these attempts I got the first error message. Only when I used a credential from the ones I got from the phishing campaign I was able to receive the second message. So, based on this, I concluded that those credentials must exist somewhere inside the appliance, in a database, but the user isn't allowed to login.


## Okay, but how can a bad guy take advantage of it?

That's the simple part. Really. If an attacker is targeting a company that uses this appliance, he can build a social engineering campaign to gather as much information as possible about all of the employees and he can also create a custom wordlist using these information in order to attempt an online dictionary attack in the login page. This way he can separate all of the credentials that produce the second error message. These credentials can then be used in further attacks. In my case, I could use those credentials to gain access to the user's webmail.

***

Well, that's it. I hope I made myself clear about this Poc. I'll update this post when my request for a CVE is answered.

## UOLAYFIRERTRUAESBEILHIDUBGSCNOKLYFUROUSOECYACSSSTUSNOIKHOYLHOSAUEBMLOEC
