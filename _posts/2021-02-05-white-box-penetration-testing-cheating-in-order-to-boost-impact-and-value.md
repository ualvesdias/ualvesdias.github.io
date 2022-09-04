---
title: "White Box Penetration Testing: 'Cheating' in order to boost impact and value"
date: 2021-02-05
categories: [Infosec, Pentest]
tags: [infosec, white-box, pentest]
author: Odysseus
mermaid: true
pin: false
---

# White Box Penetration Testing: “Cheating” in order to boost impact and value

Almost every professional pentester is always thrilled when a black box pentesting comes along, however it’s probably in white box that you’ll be able to give your reports more meaning.

![Credit: [https://www.seekpng.com/png/detail/17-171123\_black-and-white-box-clip-art-black-white.png](https://medium.com/r/?url=https%3A%2F%2Fwww.seekpng.com%2Fpng%2Fdetail%2F17-171123_black-and-white-box-clip-art-black-white.png)](https://cdn-images-1.medium.com/max/800/1*BMi0lGH5OO8ee_nwpmDo_w.png)

### Introduction

Every pentester knows (or at least they should) that when a new project is about to happen, they need to know, among other things, what level of information they are going to receive from the client prior and during the execution. This is important because it will impact how the work will be conducted. There are nowadays some well known names that define in high level how much information the offensive team will get. These are black box, gray box and white box. It’s not hard to find places on the internet that explain these types of penetration testing. I’ll go over their main aspects so you and I are both on the same page:

**Black Box**

This is the most famous one. The reason for this is that it is the most challenging for the pentesters because they get almost no information at all from the client besides the domains, URL’s and IP ranges in scope.

Finding a critical vulnerability while conducting a black box testing is always quite a ride and it makes the report look much better from the attacker’s perspective.

The client usually gets impressed (and scared) by the findings when the project is conducted this way. This is because black box reminds a real attack more than the other types. See, a real attacker will have no prior information about its targets and they’ll have to work hard to find what they need in order to be successful. And this is exactly what we are doing.

The pros of doing black box pentesting include having a more realistic scenario, which gives the client a better view of how easy/hard it is to break into their environment from an attackers perspective.

The cons include a higher probability of vulnerabilities that were not found and can still be exploited by real attackers. This is indeed one of the most difficult facts that we have to accept: we are not going to find everything. Of course, things like experience and technical skills can lower these odds, but the truth is that we can never be sure. And being in a black box project only makes things worse in that aspect.

**Grey Box**

This is an interesting one as it gathers a little bit of both worlds. The main characteristic here is partial knowledge. The client and the team will discuss what kinds of information will be shared and in what amount. Usually this is done when there are very specific needs for the client. Doing a black box testing on a custom app that is hosted on a very specific environment can be very hard and might not produce the desired results, for example.

Another scenario where grey box testing is often considered is when you have to test an app that is heavily protected by firewalls, WAFs and other appliances. How can you test something that you can not reach? You will be testing only the protection’s effectiveness, but the app itself might have critical flaws. Will you really trust the defenses 100%? What if when a 0-day comes out and the app is finally exposed? For these what you can do is open up your defenses only for the team that is conducting the tests and let them do their job without having to worry about bypassing protections when the goal is really to test the app.

**White Box**

Here we go! The most underrated, underestimated and misunderstood of all. White box testing focus on results, that is, finding the highest amount of vulnerabilities using the least amount of effort regarding collecting information.

This type of execution relies heavily on collaboration between the offensive team and the client’s technical staff. That’s because they’ll have to constantly go over each and every one of the assets in scope in order to get information. The key here is not wasting time doing information gathering. We don’t have to because now we have access to all the people responsible for developing and maintaining the assets. So we can ask them all sorts of questions: “what’s running on these servers?”, “what does this service do?”, “let me look at the source code for this feature, please?” and even “can you give me a low privilege user account so we can test for privilege escalation?”.

I’ll go over the pros of white box testing next. For now the only con I can think of is being far from a real attack scenario. You can not have a realistic pentest while ask the devs or sysadmind for the admin password ([or can you?](https://medium.com/r/?url=https%3A%2F%2Fwww.social-engineer.org%2F)).

### The real meaning of a penetration testing

When we execute a pentest, often times the only things we care about is to find those critical or high so we can once again prove ourselves as 1337 hackers. But what you may be forgetting is that we are professionals and as such, our real goal is to **_deliver value_** to whoever hired us. By value, I mean the client receives a product that’s worth the money they put into your pockets because they know that they can use the information in it to better secure their business. And we know very well that no matter how a vulnerability is discovered, if you find it, the’ll like.

### Where white box thrives

As I’ve already mentioned, in white box pentesting, we don’t have to worry too much on gathering information about the targets ourselves because all we have to do is ask. And here is where we can do a really great job.

By asking the right questions to the right people, we get to know things that we might never know if we were on a black box or even on a grey box test. And while listening to the answers, we can put our “malicious” minds to work by correlating the information we’re getting with what we know.

Let me give you some examples:

Imagine you’re testing a web application and you find a form that might be vulnerable to SQL injection. You can first ask if there’s any protection guarding the app and if so, can they disable it just for you? You can also ask them to see the source code that handles the parameters the user input so you can see if they’re sanitizing and validating the data.

Another good example for white box is when you are testing a very specific network configuration. You can suggest to have all the information on the network design, IP’s, services and everything that might be useful so you can more accurately assess the implementation.

I know what you may be thinking right now: “This is cheating!” Is it really? Are you playing a CTF or a video game? No. You’re a professional who’s being hired to do a job and it’s your responsibility to better advice your clients about the best possible options so they can have real value from your final product.

### The real world is not so simple, though

Everything I said so far is wonderful in paper. However it’s not always how things go. Let me give you a dose of reality:

The client almost never will be able to allocate a professional just for you. What usually happens is that one or two people are pointed out to answer your questions and they’ll pile up this task with their current work. So, often times you’ll get people that take ages to answer, what will certainly delay your schedule.

Another thing that happens a lot is when the client doesn’t want to pass information at all, even knowing what they’ve hired and that you signed an NDA. You’ll have to “fight” to get the information you need or worse: you end up doing a black/grey box testing.

Finally, this is for me the most dangerous situation: you get a client that is willing to answer all your questions. That’s great! But you must keep in mind that you CAN NOT trust 100% of what they say. Remember that they’re biased with their business and their product. I already heard a lot of “Oh, but there’s nothing worth looking in this server. It’s completely isolated and there’s no information there.” only to prove them wrong in the end. You can’t let them “poison” your mind, so be skeptical. Always!

### Conclusion

**For the clients**

If you are considering to hire a pentesting company or if you have an internal team, consider doing white box assessments in certain situations. Remember that the ultimate goal here is to protect your environment and the data in it, and doing so you protect your business. Doing an open information testing will give the offensive team more probability of finding things that would be more difficult to find in black box executions. And keep in mind that being difficult for your team to find something doesn’t mean that it’s also difficult for the real bad guys. They have all the time in the world to poke your environment and they have no scope restrictions. Also, they can be much better skilled hackers than your guys.

**For the professionals**

And for you pentesters out there, I leave the following: don’t think you’re cheating when you do a white box pentest. Leave this mindset for when you’re playing CTF’s. When you do your job, the goal must be to deliver real impact and real value through your reports. So know when to use all the tools and options you have available.