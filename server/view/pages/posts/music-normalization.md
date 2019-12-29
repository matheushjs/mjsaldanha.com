' Title: How to Normalize Your Music Library
' Date: November 15th 2019

Aiming at those who love their music playlist like I do, in this article I'll try to give some hints as to how to normalize your music library so that songs have an uniform loudness.
In this way, ideally you would be able to listen to the whole playlist without touching the volume button even once.

I had wanted to normalize my playlist for a long while, but two things inhibited me: first, most off-the-shelf solutions out there miss on some feature I need; second, many of them did not made songs as uniform as I wanted.
So let's first point out some requirements we will impose to potential solutions:

1. Songs must keep their artwork after being processed.
2. The numerical samples of a song must be modified in a simple, uniform way. By this we mean that each sample or each **window** of samples is transformed by the same function $f(x)$.
3. The normalization must be done in a relatively simple way, so that in a worst case scenario we can implement it ourselves.

Note that these requirements are actually personal preferences.
However, even if you disagree with any of them, I'm sure you still can make a lot of use of what is discussed in the following.

## Some Definitions

A digital music file is composed of sequences of numbers, often signed 16-bit integers.
The file might contain more than 1 such sequence, called *streams* in the digital music field.
For example, stereo audio has 2 sequences, one for each side of your headphones, and surround sound has 5 or more streams to play in each loudspeaker in your living room.

These numbers represent oscillations of the [https://en.wikipedia.org/wiki/Loudspeaker#Diaphragm](diaphragm) of the loudspeaker or the microphone.
When you speak or play some music, you cause perturbations in air pressure, which reach the microphone's diaphragm and cause it to shake, which in turn generates voltage that is discretely recorded as a sequence of numbers.
For loudspeakers, the difference is that these numbers are received, converted to voltage, which causes the diaphragma to move and then **cause** pressure changes in the air, generating some sound.

## Normalization Methods

The first normalization method that comes to mind is to multiply the song samples by a factor that makes the largest sample

## A Bit About Mean Values

## Our Proposed Method
