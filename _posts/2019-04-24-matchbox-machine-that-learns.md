---
title: "A Matchbox Machine that Learns"
date: 2019-04-24 09:00:00 -0300
categories: [Machine Learning]
mermaid: true
tags: [machine-learning, python]
author:
	name: Ulisses Alves
---

Hey you! So, here I am with my first post of 2019. And here, I'm going to write about a very cool thing that I learned a few weeks ago.  
  
# But first the background story
  
I'm taking an interest in how machine learning systems work and mostly how I can apply them to data science problems. Digging up the internet on the fundamentals, I've found [a very cool publication](http://cs.williams.edu/~freund/cs136-073/GardnerHexapawn.pdf) from 1962 where professor Martin Gardner explains how to build a machine out of matchboxes (that's right, matchboxes) that can learn how to play a game from scratch and even master it.  
The process is actually very clever and it's an adaptation of a previous experiment where a guy builds a machine with more than 300 matchboxes to play tic-tac-toe to perfection.  

# What I did

In short, I've written a python code that mimics Prof. Gardner's experiment, just like as if I was using real matchboxes. I'm taking a more technical approach here, which means that I am teaching a computer how to play and master a game.


# The game

The game used to teach the machine is actually a much simpler version of chess. It's called Hexapawn and it's played on a 3 by 3 board of black and white squares and a total of six pawns, three for each player. They are placed on the first and last rows of the board. The moviments of the pieces are just like those of the pawns on a standard chess game: they move only forward one square at a time and they can also capture an opponent piece if it stands on one of the two diagonal squares of the next row. The exceptions are that in Hexapawn there's no en passant move and there are no two square moves for their first movement. Also, there's no pawn promotion.  
  
To win a game, a player must be in one of the following situations:  
1 - The player was able to capture all of the opponent's pawns;  
2 - The player was able to move one of its pawns to the last row of the board relative to him; or  
3 - The player was able to make a move that leaves the opponent with no legal movement for his next move.  
  
Based on this, we now know all the information needed to play the game.  
  
# How the machine learns the game? Positive and negative reinforcements
  
This is the interesting part. How to make a mechanical system out of matchboxes that mimics a learning style? And how to simulate this system in a python code?  
  
First thing to explain here is the matchboxes system. According the Prof. Gardner's publication, we need 24 matchboxes to simulate a learning computer. Each little box will represent a board state, and by that I mean every possible board configuration that the non-human player can find during a single game.  
  
So, in this system, we can draw little 3 by 3 boards on one of the faces of the matchboxes, along with the pieces of that specific board position. Also, we have to represent every single possible move that the machine can make if it is presented with this board configuration. We can use arrows for this, and each arrow must be colored with a unique color to differentiate it from the others. The reason for this is that inside each matchbox we have to put little things that also represent a specific move the machine can make, and each thing has to have the same colors as the arrows. Those "things" I'm talking about can be anything: little balls, little pieces of paper, whatever.  
  
So, after the human player makes his move, we have to pay attention to the current board state and look for the matchbox that matches that state. Once we find the right one, we shake it and take out one of the things inside, without seeing. From that we make the move corresponding to the color of the chosen thing.  
  
This repeats until the human or the machine wins the game. And here's where the learning begins: If the machine loses the game, we have to apply negative reinforcement, which means that we will remove the thing used to make the machine's last move, which was the one that led the its defeat. This is very important because this way we are "teaching" the machine that this specific move is bad for that specific board configuration, because we know that it leads to defeat, and thus, the machine must not play the move again if it finds itself on the same board state on future games. See what we're doing here? We are removing all the moves that lead to defeat, so in time the machine will have only moves that doesn't make it lose.  
  
Now, what if the machine wins a game? If this is the case, we have two different approaches. One of them maks the learning process go faster, causing the machine to master the game in fewer games played. The other one uses probability to mimic the machine's future moves. Let's see how they work:  
  
On the first case, if the machine wins the game, we simply take all of the things from the matchbox where the winning move was made, but the winning thing. This is because we can garantee that if the game reaches this specific board state, then there's a move that wins the game always, so the machine doesn't need the other ones, which means that every time that the game reaches this configuration on the board, the machine has only the winning move to make. In a short amount of games, the machine can narrow almost all of the existent moves inside the matchboxes to only those that lead to victory.  
  
For the second case, instead of removing things, we're adding. But we're going to add a thing that has the same color of the thing representing the winning move of the last game. This way we are increasing the probability that the machine will choose that move again in future games, despite of the fact that it will still be able to make the wrong moves even having a winning move available. This learning process is called positive reinforcement, because we are adding something to the system.  
  
# The Python code

When I read about this machine learning game, the first thing that came to my mind was that I wanted to implement this in Python and put it in a Telegram bot. So [here](https://github.com/ualvesdias/HexaPawnGame) is the code and [here](https://t.me/hexapawnbot) is the Telegram bot. To represent the matchboxes I used a python dictionary. I came up with a system to represent the board states and the moves with numbers, and for each of the machine's losses, I can remove the moves that cause the loss as well as all of the other moves in the case of winning (I opted not to go with the probability approach. Also, keep in mind that this choice is a negative reinforcement. I'm removing items from the system that will cause the machine to "learn" and apply this learning next time it bumps into the same situation).

***

Well, that's it. This was a really fun project to make. I learned so much about the fundamentals of machine learning, and I value the fundamentals a lot! One last thing: if you found an error of any kind or just have a sugestion of improvement for this article or the python code, dont hesitate in contact me at ulisses.alves@protonmail.com. I'll be more than happy to get a feedback from you!  
  
## UOLAYFIRERTRUAESBEILHIDUBGSCNOKLYFUROUSOECYACSSSTUSNOIKHOYLHOSAUEBMLOEC
