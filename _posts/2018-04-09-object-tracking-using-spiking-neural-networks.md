---
layout: post
title:  "Object Tracking Using Spiking Neural Networks"
date:   2018-04-09 16:16:01
categories: [Neural Networks, Human Brain Project]
---

Last semester, I had the fortune of doing some work with the [Human Brain Project](https://www.humanbrainproject.eu/en/), an EU-funded research project with the aim of understanding, mapping and partly reconstructing the human brain through computer simulations and actual hardware. Using the [Neurorobotics Platform (NRP)](https://neurorobotics.net/), an environment for developing and running experiments with spiking neural networks and simulated robots, I implemented a closed loop control-based solution for tracking an object in space using spiking neural networks. In this post, I am outlining spiking neural networks, the Neurorobotics platform and how one can implement simple control loops for solving tracking tasks using spiking neural networks and the NRP toolset. The code for the corresponding NRP experiment can be found [on GitHub](https://github.com/Scaatis/hbpprak_perception).

# Spiking Neural Networks

Spiking neural networks attempt to model the neurons of the human brain much more closely than the "classical" neural networks used for deep learning. While in deep neural networks, units instantly react to their inputs and produce outputs immediately, spiking neural networks are dynamical systems: The output at any given time is dependent on previous inputs as well as on the state of the neuron at that time. The physiology of biological neurons and the relevance of dynamical systems in the modelling of neurons is explained in some detail in [Jack Terwilliger's blog post](http://jackterwilliger.com/biological-neural-networks-part-i-spiking-neurons/).

## Neuron Models

Many different neuron models exist and spiking neural networks often combine multiple models. In all models, neurons fire impulses (or spikes) dependent on the current and past input voltage. The input voltage is computed based on the spike activity of other, connected neurons. The most simple ["integrate-and-fire" model](http://neuronaldynamics.epfl.ch/online/Ch1.S3.html) integrates over the input voltage, emits a spike when the integrated input reaches a threshold and resets the integrator to zero. Most commonly, the integrator is *leaky*: Its value decreases over time. Mathematically, a leaky integrator can be modelled using a simple linear differential equation and is functionally equivalent to an RC circuit. Much more complex models have been devised in literature to add a refractory period, during which the neuron cannot fire, or the capacity to oscillate or resonate. While these models model the behavior of human neurons much more closely, simple models such as integrate-and-fire incur less computational overhead and often suffice to solve real-world problems with spiking neural networks.

## Computing with Spiking Neural Networks

It has been shown that [every possible function can be realized with a traditional deep neural network](https://pdfs.semanticscholar.org/05ce/b32839c26c8d2cb38d5529cf7720a68c3fab.pdf). Simples spiking neural networks work similarly to traditional deep neural networks: The network is specified by connecting *input populations* of neurons to *output populations* using *synapses*. Arbitrarily many layers can be formed. In its simplest form, a synapse connects *M* input neurons to *N* output neurons. With the simplest possible synapse, the strength of each connection is specified by a multiplier, the *synapse weight*, resulting in an *NxM* weight matrix for a fully connected synapse which encodes for each output neuron which input neuron contributes how much to its input voltage. In other words, each output neuron's input voltage is the weighted sum of its inputs - just like in "regular" deep neural networks. More complex synapse models differ from the connections in traditional neural networks in that they model synapses in the human brain more closely, can be stateful and "learn" by changing their characteristics depending on the input spike frequency and timing, a property called [spike-timing dependent plasticity](http://www.scholarpedia.org/article/Spike-timing_dependent_plasticity). [Learning with spiking neural networks](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0161335) still presents a number of open problems and constitutes a highly productive field of research.

Spiking neural networks mostly differ from deep neural networks because they are dynamical systems - their outputs depend on the inputs *over time*. Unlike deep neural networks, where information is encoded in tensors, spiking neural networks encode information in the *spike train*, the function of spiking activity over time, through the frequency and timing of spikes. Depending on the neuron model, spike emission may be stochastic; in this case, the information encoding is called a [spike density code](https://link.springer.com/referenceworkentry/10.1007%2F978-3-540-92910-9_10).

[TODO Spike train in the NRP image]

# The Neurorobotics Platform

The Neurorobotics Platform (NRP) is an application developed by the Neurorobotics group of the Human Brain Project for developing and running experiments about controlling robots using spiking neural networks. Its backend is a combination of [ROS](http://www.ros.org/) for infrastructure and interaction with (simulated) robots, the [Gazebo robot simulator](http://gazebosim.org/) and the [NEST neural network simulator](http://www.nest-simulator.org/); it has a Javascript-based web interface and allows manipulation of the 3D environment, neural network and experiment setup in a browser. An NRP experiment is defined in an XML file and consists of a state machine, a brain file, an (SDF) environment model and an optional ROS launch file.

[TODO NRP Screenshot]

## State Machine

The state machine defines any action on the part of the environment. If something in the environment needs to be moved, such as the target object for object tracking, or if objects need to be spawned at runtime, it can be done in a Python [smach](http://library.isr.ist.utl.pt/docs/roswiki/smach.html) state machine. It has access to the environment, additionally loaded 3D models as well as to all available ROS topics and services.

## Brain Definition and Transfer Functions

In the NRP, the brain consists of two components: A [PyNN](http://neuralensemble.org/PyNN/) brain description file and one or more *transfer functions*. PyNN provides a simulator-independent interface to neural network simulators such as NEST. In the brain file, populations of spiking neurons are defined and connected through synapses. An example brain file for object tracking is provided below. Transfer functions map neuron activity to robot motion or vice versa - they are Python functions which are called in every cycle of the NRP's [*Closed Loop Engine*](https://developer.humanbrainproject.eu/docs/projects/HBP%20Neurorobotics%20Platform/0.9/nrp/developer_manual/CLE/cle_architecture.html), and have access to both the brain as defined in the brain file and the ROS topics for robot control. In their purest form, transfer functions implement *visuomotor coupling* - a closed loop between neural activity and the resulting motion. This closed loop is crucial for implementing object tracking in the NRP.

# Closed-Loop Control for Object Tracking

There are [many approaches for tracking objects](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.112.8588&rep=rep1&type=pdf), many of which rely on direct or indirect solutions to the correspondence problem or particle filters. When humans track objects, however, they do not analytically compute two-dimensional convolutions with a reference pattern, like many traditional filter-based approaches do. Instead, humans move their eyes to keep the object in the center of their field of vision. When trying to evict a fly from your living room, for example, you constantly keep your eyes centered on the fly and follow its motion. This can be modelled in a straightforward way with a closed-loop control circuit: The sensors on the retina cause excitations of the neurons of the visual cortex; these excitation patterns instruct the eye and neck muscles to move in order to keep the tracked object in the center. Small deviations in the position of the tracked object cause compensatory movements of the eyes, which in turn cause the image on the retina to change, etc. In control theory terms, the retina is the sensor, the eye muscles are the controller and the position and orientation of the eyes are the controlled system.

[TODO Control Loop Schematic]

Because the NRP comes with a Closed Loop Engine (CLE), implementing closed loop control with spiking neural networks is straightforward in the NRP: The spiking activity of an input population ("virtual retina") encodes where in the field of vision a tracked object is located at a given time. Via a set of synapses and transfer functions (in the human brain, this would happen in the visual cortex and [sensorimotor circuits](https://www.researchgate.net/figure/Summary-of-sensorimotor-circuitry-for-the-generation-of-visuomotor-and-vestibulomotor-eye_fig4_7428849)), the outputs of this population are connected to the inputs of a motor population which, in turn, controls the joint actuators in the eye and neck of the robot.

## Thimblerigger Experiment

To try this out, my colleagues and I created an experiment (the code is on [GitHub](https://github.com/Scaatis/hbpprak_perception)) in which a simulated iCub robot is to play the thimblerigger game: A ball is hidden under one of three cups; after the cups are shuffled, the robot has to guess which cup the ball is hidden under. Humans instinctively approach this task by trying to follow the cup hiding the ball with their eyes. While it would be easier and probably more robust to solve this problem using traditional image processing and frame-by-frame analysis, we chose to implement a closed-loop solution for tracking which is as close to the human approach as possible to demonstrate how closed-loop control for visuomotor coupling can be implemented with spiking neural networks in just a few lines of code. 

[TODO: Screenshot of experiment setup]

## Virtual Retina

## Transfer Function
