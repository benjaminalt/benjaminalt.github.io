---
layout: post
title:  "Robot Program Parameter Inference via Differentiable Shadow
Program Inversion"
date:   2021-03-06 01:00:00
key: 10002
categories: [blog]
tags: [Differentiable Programming, Robot Self-Learning]
published: true
comment: false
---

UNDER CONSTRUCTION


<!-- This is the companion blog post to our 2021 ICRA paper. You can find more on the paper (including a full-text version) [here](/spi).

Programming industrial robots to perform complex force-controlled tasks is challenging and time-consuming when done by hand. *Skill-based robot programming* is an established paradigm across industrial and service robotics, where commonly used robot actions are encapsulated as robot skills which must only be learned or programmed once and can then be reused or combined to higher-level skills. This makes the creation of an initial robot program much easier, but leaves the problem of *skill parameterization*: For each skill in a program, the robot programmer must find a suitable set of parameters to adapt that skill to the concrete task and environment at hand.

In our paper, we present Shadow Program Inversion (SPI), a novel approach to infer optimal skill parameters directly from data. SPI leverages unsupervised learning  to train an auxiliary differentiable program representation (“shadow program”) and realizes parameter inference via gradient-based model inversion. Our method  enables the use of efficient first-order optimizers to infer optimal parameters for originally non-differentiable skills, including many skill variants currently  used in production. SPI zero-shot generalizes across task objectives, meaning that shadow programs do not need to be retrained to infer parameters for different task variants.

{:overview: style="text-align: center;"}
![Shadow Program Inversion](/assets/images/spi/overview.png){:width="75%"}
{:overview}

This brings the benefits of differentiable programming ($\partial P$) - the possibility to optimize program parameters with gradient-based optimizers such as Stochastic Gradient Descent - to skill-based robot programming.

## Shadow Skills

A general-purpose differentiable and "shadow skill" architecture must meet three general requirements:

* It must be **implementation-agnostic** with respect to the skill it represents, i.e. it must be capable of accurately representing possibly non-differentiable robot skills, and even hand-written skills in a low-level robot programming language such as KRL or URScript.
* It must have a **learnable** component which can learn the non-deterministic aspects of skills, such as the forces and torques resulting from interactions with the environment.
* It must be **chainable** to represent complex robot programs composed of multiple skills.

To meet these requirements, we designed a hybrid robot skill architecture which combines a differentiable motion planner (an implementation of a motion planner in a $\partial P$ framework such as PyTorch) with a recurrent neural network, and wrap both components in a differentiable computational graph. This allows our shadow skills to learn to effectively mimic arbitrary robot skills, including force-controlled skills: The differentiable motion planner provides a strong prior for the expected robot behavior, which can be adapted in a learnable way by the neural component. To the outside, every shadow skill provides the same interface: All skills accept a parameter vector **$x$** containing the skill parameters (which we want to optimize) and a state vector **$s_{in}$** describing the current state of the robot and the environment, and produce an expected trajectory **$\hat{Y}$** and a final state **$s_{out}$**. Because both the differentiable motion planner and the neural network are differentiable computational graphs, a shadow skill is also a differentiable computational graph whose outputs $\hat{Y}$ and $s_{out}$ are differentiable w.r.t. its inputs $x$, conditional on the initial state $s_{in}$. On a skill level, this allows to optimize skill parameters **$x$** w.r.t. some function of the expected behavior of the robot, such as cycle time, parts per minute (PPM) or the forces experienced on contact with an object.

{:shadow-skill: style="display: flex; justify-content: center; align-items: center"}
![Shadow Skill](/assets/images/spi/shadow_skill.png){:width="50%"}
*The Shadow Skill architecture at the example of a spiral search skill. The RNN*
{:shadow-skill}

## Shadow Programs

{:shadow-program: style="display: flex; justify-content: center; align-items: center"}
![Shadow Program](/assets/images/spi/shadow_program.png){:width="50%"}
{:shadow-program} -->
