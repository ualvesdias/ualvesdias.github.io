---
layout: default
title: "Matchbox machine that learns"
tags: machinelearning python poc
---
Hey you! So, here I am with my first post of 2019. And here, I'm going to write about a very cool thing that I learned a few weeks ago.  
  
## But first the background story
  
I'm taking an interest in how machine learning systems work and mostly how I can apply them to data science problems. Digging up the internet on the fundamentals, I've found [a very cool publication](http://cs.williams.edu/~freund/cs136-073/GardnerHexapawn.pdf) from 1962 where professor Martin Gardner explains how to build a machine out of matchboxes (that's right, matchboxes) that can learn to play a game from scratch and even master it.  
The process is actually very clever and it's an adaptation of a previous experiment where a guy builds a machine with more than 300 matchboxes to play tic-tac-toe to perfection.  

## What I did

In short, I've written a python code that mimics Prof. Gardner experiment, just like as if I was using real matchboxes. However, I'm taking a more technical approach here, that means that I am literally teaching a computer how to play and master a game.


## The game

The game used to teach the machine is actually an much simpler version of chess. It's called Hexapawn and it's played on a 3 by 3 board of black and white squares and a total of six pawns, three for each player. They are placed on the first and last rows of the board. The moviments of the pieces are just like those of the pawns on a standard chess game: they move only forward one square at a time and they can also capture an opponent piece if it stands on one of the two diagonal squares of the next row. The exceptions are that in Hexapawn there's no en passant move and there are no two square moves for their first movement. Also, there's no pawn promotion.  
  
To win a game, a player must be in one of the following situations:  
1 - The player was able to capture all of the opponents pawns;  
2 - The player was able to move one of its pawns to the last row of the board relative to him; or  
3 - The player was able to make a move that leaves the opponent with no legal movement for his next move.  
  
Based on this, we now know all the information needed to play the game.  
  
## 

***

Well, that's it.

## UOLAYFIRERTRUAESBEILHIDUBGSCNOKLYFUROUSOECYACSSSTUSNOIKHOYLHOSAUEBMLOEC
