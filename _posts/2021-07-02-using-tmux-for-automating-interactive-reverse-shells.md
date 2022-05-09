---
title: "Using tmux for automating interactive reverse shells"
date: 2021-07-02
categories: [Linux, Infosec]
tags: [linux, terminal, tmux, pentest, reverse-shell]
author: Ulisses Alves
mermaid: true
pin: false
---

# Using tmux for automating interactive reverse shells

## Automating the process of converting a non-interactive reverse shell to a fully interactive TTY.

![](/assets/img/1270/1*NRbYPaweiL76Qh-RIFCY5g.png)

# Introduction

I’ve recently read agreat [post](https://blog.polverari.com.br/en/posts/full-auto-interactive-tty/) about using the “expect” command line utility for automating the process of converting a non-interactive reverse shell to a fully interactive TTY, which means that by doing that, it’s possible to use features like tab completion, history navigation, clear the screen and, among others, being able to hit **_Ctrl-c_** without losing your access, which makes me really happy.

I’ve found the post very interesting because it uses a completely different approach that I had never seen before. So, since I also have a technique for automating this process, I decided to share it because it’s a different perspective, which also relies on a command line utility: [tmux](https://github.com/tmux/tmux/wiki).

# The manual process

![](/assets/img/1400/1*oOdObCxGdkI6y2ogdF-Zdw.gif)
_Creating an interactive reverse shell manually_

The above gif shows how you can convert a non-interactive reverse shell into a interactive one. Although it’s a fairly simple process, if you have the need to do it very often, it becomes a pain.

# Enter tmux

Tmux is a terminal multiplexer command line utility that lets you create/control multiple shells from a single screen. One of its most powerful features is the ability to send keystrokes combinations into the shells automatically. Added to that is the feature that lets me create internal environment variables that I can use as short versions of big commands:

![](/assets/img/202273146628890-1*_e4dvKKDBEcKG4Qsm-QIKQ.png)
_Command strings being stored as environment variables_

Now I can simply open tmux command prompt and send one of those strings into the currently active tmux pane:

![](/assets/img/206062070718805-1*7oi2fFbRNkF9aRkkk89Lnw.gif)
_Sending strings into shells using tmux_

# The magic of tmux automation

Now that we know all of the features we need to use from tmux, we can build tmux shortcuts, or key bindings, in order to trigger actions of sending keystrokes to the currently active pane.

![](/assets/img/30017873620209-1*H_zhGZ35Hza9TgdlsLz3uA.png)
_Tmux key bindings for sending keystrokes_

The “tmux.conf” lines above consist of two environment variables that hold two strings that will be send to the terminal later and two key bindings that will first send the key sequence **\_python3 -c ‘import pty;pty.spawn(\\”/bin/bash\\”)’\_** followed by a **\_\<Enter\>\_**, and then send the sequence **\_C-z “stty raw -echo” Enter fg Enter reset Enter $shellexports Enter\_**. Note that “Enter” is not the word itself, but the \*keystroke\*, that is, a newline character. Tmux has a set of words that it recognizes as certain keyboard keys and “Enter” is one of them.

The first _bind_ command has to be executed after the prefix key combination, which in standard tmux is **_Ctrl-b_**, but in my case is **_Ctrl-a_**. The second _bind_ command, which has the flag _\-n_ can be executed without the prefix combination.

Here you might be thinking: “but why are you using two shortcuts instead of just one that sends everything at once?” The answer for that is simple: I wasn’t able to get it working by using only one key binding. If you find a way, please contact me because I’d love to know what I’ve missed.

# The final result

Now every time you get a non-interactive shell, you can simply hit **_Ctrl-aqq_** in order to trigger the first binding (**_Ctrl-aq_**) and then sending the second part (**_Ctrl-q_**). Enjoy:

![](/assets/img/204721341810793-1*m6JNfZPRqZ6B5ahCfP2CMQ.gif)

Fully automated interactive shell from a non-interactive one

**\\x07\\x44\\x42\\x01\\x59\\x13\\x44**
