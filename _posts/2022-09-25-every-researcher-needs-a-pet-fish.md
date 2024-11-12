---
layout: post
title:  Every Researcher Needs a Pet Fish
date:   2022-09-25 01:00:00
categories: blog
tags: science-communication
description: Why researchers should care about science communication, and how to use symbols and slogans to make a talk memorable.
---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/pet_fish/pet_fish.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
A pet fish, according to <a href='https://github.com/CompVis/stable-diffusion'>Stable Diffusion</a>
</div>

I've been learning a lot about science communication lately. This journey started at this year's [Interdisciplinary College (IK)](https://interdisciplinary-college.org), where I participated in a science communication workshop organized by [Jens-Steffen Scherer](http://jenssteffenscherer.com/), Valerie Vaquet and Kayson Fahar. The workshop reinforced my prior intuition that science communication is immensely important, particularly for PhD students, but also that much of my daily work already consisted of science communication, even if I didn't realize it.

## Science Communication: What It Is and Why It Is Important

Every PhD student or researcher, at university or in private companies, constantly communicates about what it is they are working on and why it is important. At university, this includes casual conversations with other PhD students, professors, collaborators from other departments or lab visitors. In a corporate setting, industry PhDs are additionally faced with communicating their research to stakeholders outside of academia, such as work colleagues, supervisors, budget officers or clients. Even more than traditional PhDs, industry PhD students constantly navigate the gap between research and application, and constantly communicate what they do and why it is important to non-researchers inside and outside their organization. **This is science communication.** Pitching one's research agenda to one's boss is science communication. Presenting early-stage results to project partners is science communication. Giving talks at academic conferences is science communication. Chatting about one's research over lunch - science communication. I've been doing it all along.

Getting good at science communication - talking to others about what one does and why it is important - has a high expected payoff. The greatest part of this payoff stems from external stakeholders gaining a better intuitive understanding of the (potentially very complex) research problems that are being addressed; and, crucially, *why they should care about them*. It is hard enough for researchers to descend into the murky depths of maths and data for weeks at a time in the pursuit of some fundamental research question, and to remember this fundamental research question once they resurface. They only do so because they have been trained to, and because their experienced mentors remind them of it every once in a while. Take external stakeholders, colleagues from different subfields or the audience at an academic conference to the same murky depths along the same paths, and they will assuredly get lost.

As a consequence, I started to tweak the way I communicate about my research. I found that getting the level of abstraction right - expressing ideas in high-level concepts such as "learning", "optimization", "robot motion" by default, and using more technical concepts such as "gradient descent", "differentiable programming", "inverse kinematics" only when necessary, and always with appropriate visual aids - makes a big difference in how effectively I can convey arguments and results, particularly to audiences outside of my field. But communicating at the right level of abstraction only serves to make arguments more *understandable*; it does not help make them more *memorable*. For that, **symbols and slogans**[^1] are much more effective. 

## The Pet Fish Problem

I first learned about the pet fish problem in [Antonio Lieto](https://www.antoniolieto.net/)'s talk on TCL at the [2022 EASE Fall School](https://ease-crc.org/ease-fall-school-2022/). [TCL (typicality-based compositional logic)](https://www.antoniolieto.net/tcl_logic.html) is a formal logic for combining (proto-)typical knowledge[^2] of existing concepts into new concepts. To illustrate what typicality-based compositional logic is and why it is important, Prof. Lieto gave the following example: Close your eyes, and imagine a pet. What attributes does this imagined pet have? (Someone said "furry"). Now imagine a fish. What color does it have? (Someone answered "gray"). Finally, imagine a pet fish - does it combine the properties of the prototypical pet and fish? It does not - indeed, most people imagine a pet fish as neither furry nor gray, but red.

The pet fish problem is a very simple and intuitive way to communicate a fundamental problem in compositional logic: Prototypical concepts are not compositional (under the logic of typicality $\mathcal{ALC}+\mathbf{T_R}$), and additional modeling is required to combine prototypical concepts. Abstract statements like "prototypical concepts are not compositional" mean nothing to an audience unfamiliar with formal logic or knowledge representation. Even researchers from adjacent fields require a bit of explanation to understand what this problem actually *means*, and how such an abstract problem can manifest in the real world. The pet fish problem is elegant because it grounds an abstract research question - how to combine prototypical concepts - in the real world, and uses real-world anchors ("pet" and "fish") which everyone in the audience is familiar with.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/pet_fish/zebra_shark.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
A zebra shark, according to <a href='https://github.com/CompVis/stable-diffusion'>Stable Diffusion</a>
</div>

I only understood the ultimate power of the pet fish problem as a science communication device when several hours after the talk, I randomly thought of the pet fish problem again. This usually doesn't happen with scientific concepts (at least not to me): Most scientific content I consume ends up in a type of long-term associative memory buffer, from where it can be retrieved when something else reminds me of it (a keyword, a formula, an image, ...). Randomly thinking of the pet fish reinforced the concept again, and I am now more likely to remember the non-compositionality of prototypical concepts long-term. I randomly thought of the pet fish problem because I found it funny, because it had a ring to it, because it triggered an uncanny sense of dissonance: The pet fish problem as an illustrative device is a great **symbol**. It is memorable. This was reinforced by Dr. Lieto's use of great AI-generated images of "zebra sharks" and other hybrid animals, where features (stripes, legs, shark-like heads) are combined in ways completely uncanny to the human observer.   

The pet fish problem is more than a visual and mental symbol: It is also a great **slogan**. Dr. Lieto referred to the pet fish problem repeatedly during his talk, and used it (in this exact phrasing: "the pet fish problem") to ground complex arguments about TCL in a way relatable to the audience. [Reinforcement by repetition](https://en.wikipedia.org/wiki/Repetition_(rhetorical_device)) is a powerful rhetorical device, and repeating core ideas or examples over the course of a talk helps to "bring back" the audience, even when attention may have been drifting. But the repetition of catchy terms, particularly terms attached to a symbol, creates a slogan which will stick in the listener's [long-term memory](https://pubmed.ncbi.nlm.nih.gov/15779526/), even if they don't consciously repeat it themselves.

## Every Researcher Needs a Pet Fish

Dr. Lieto's use of the pet fish problem in his talk was a tour de force of science communication: It raised the level of abstraction to a level at which every member of the audience could follow; it grounded abstract concepts in familiar real-world objects; it created a memorable visual symbol, providing an anchor for later retrieval; and it was, by way of repetition, transformed into a verbal slogan, reinforcing the concept yet again through audio-visual synaesthesia. Every researcher should find his own pet fish problem.


[^1]: Two of the five S in [Winston's star](https://youtu.be/Unzc731iCUY?t=3012).

[^2]: *Typical* or *prototypical* knowledge is the association between a concept (e.g. "dog") and the properties or class relationships which *commonly hold* for this concept in a given (e.g. cultural) context. The prototypical dog, for example, is furry and has a tail. Prototypical knowledge does not apply to all individuals of a category (there are black, blonde and white dogs, and certain breeds of dogs don't have tails), and heavily depends on socio-cultural context. Nevertheless, prototypical knowledge is highly useful as a baseline for commonsense reasoning in the absence of additional information.