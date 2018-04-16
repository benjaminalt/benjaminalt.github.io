---
layout: post
title:  "Object Tracking Using Spiking Neural Networks"
date:   2018-04-09 16:16:01
categories: [Neural Networks, Human Brain Project]
---

Last semester, I had the fortune of doing some work with the [Human Brain Project](https://www.humanbrainproject.eu/en/), an EU-funded research project with the aim of understanding, mapping and partly reconstructing the human brain through computer simulations and actual hardware. Using the [Neurorobotics Platform (NRP)](https://neurorobotics.net/), an environment for developing and running experiments with spiking neural networks and simulated robots, I implemented a closed loop control-based solution for tracking an object in space using spiking neural networks. In this post, I am outlining spiking neural networks, the Neurorobotics platform and how one can implement simple control loops for solving tracking tasks using spiking neural networks and the NRP toolset.

# Spiking Neural Networks

Spiking neural networks attempt to model the neurons of the human brain much more closely than the "classical" neural networks used for deep learning. While in deep neural networks, units instantly react to their inputs and produce outputs immediately, spiking neural networks are dynamical systems: The output at any given time is dependent on previous inputs as well as on the state of the neuron at that time. The physiology of biological neurons and the relevance of dynamical systems in the modelling of neurons is explained in some detail in [Jack Terwilliger's blog post](http://jackterwilliger.com/biological-neural-networks-part-i-spiking-neurons/).

## Neuron Models

Many different neuron models exist and spiking neural networks often combine multiple models. In all models, neurons fire impulses (or spikes) dependent on the current and past input voltage. The input voltage is computed based on the spike activity of other, connected neurons. The most simple ["integrate-and-fire" model](http://neuronaldynamics.epfl.ch/online/Ch1.S3.html) integrates over the input voltage, emits a spike when the integrated input reaches a threshold and resets the integrator to zero. Most commonly, the integrator is *leaky*: Its value decreases over time. Mathematically, a leaky integrator can be modelled using a simple linear differential equation and is functionally equivalent to an RC circuit. Much more complex models have been devised in literature to add a refractory period, during which the neuron cannot fire, or the capacity to oscillate or resonate. While these models model the behavior of human neurons much more closely, simple models such as integrate-and-fire incur less computational overhead and often suffice to solve real-world problems with spiking neural networks.

## Computing with Spiking Neural Networks

It has been shown that [every possible function can be realized with a traditional deep neural network](https://pdfs.semanticscholar.org/05ce/b32839c26c8d2cb38d5529cf7720a68c3fab.pdf). Simples spiking neural networks work similarly to traditional deep neural networks: The network is specified by connecting *input populations* of neurons to *output populations* using *synapses*. Arbitrarily many layers can be formed. In its simplest form, a synapse connects *M* input neurons to *N* output neurons. With the simplest possible synapse, the strength of each connection is specified by a multiplier, the *synapse weight*, resulting in an *NxM* weight matrix for a fully connected synapse which encodes for each output neuron which input neuron contributes how much to its input voltage. In other words, each output neuron's input voltage is the weighted sum of its inputs - just like in "regular" deep neural networks. More complex synapse models differ from the connections in traditional neural networks in that they model synapses in the human brain more closely, can be stateful and "learn" by changing their characteristics depending on the input spike frequency and timing, a property called [spike-timing dependent plasticity](http://www.scholarpedia.org/article/Spike-timing_dependent_plasticity).

Spiking neural networks mostly differ from deep neural networks because they are dynamical systems - their outputs depend on the inputs *over time*. Unlike deep neural networks, where information is encoded in tensors, spiking neural networks encode information in the *spike train*.

# The Neurorobotics Platform

# Closed-Loop Control for Object Tracking

## Virtual Retina