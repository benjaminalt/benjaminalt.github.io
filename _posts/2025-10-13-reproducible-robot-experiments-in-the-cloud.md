---
layout: post
title: Reproducible Robot Experiments in the Cloud
date: 2025-10-13 00:00:00-0400
categories: blog
tags: robot-learning scientific-discovery open-science infrastructure paper 
description: At the 1st Workshop on Embodied AI and Robotics for Future Scientific Discovery (AIR4S) at IROS 2025, my colleagues and I are presenting a robot execution tracing system and virtual lab environment to facilitate reproducible research with robots.
---

## Making Robots Active Participants in Scientific Discovery

While it is unclear to what extent robotics is undergoing a replication crisis, most researchers agree that roboticists find it highly challenging to replicate each other's work. The heterogeneity of the hardware used by each lab is a driving factor of this challenge, as is the use case specific nature of robotic experimentation that makes the experiment setup (hardware, sensors, specific software packages) highly contingent on the task and environment at hand.

What is true for robotics as a scientific discipline is doubly true when robots are used as tools, or agents, for scientific discovery in other disciplines. As roboticists, we are not just responsible for transparency of research in our own field, but should serve, as best we can, the needs of those fields - materials science, experimental physics, biomedical research, among others - that increasingly use robots as parts of their experimental setups.

In our new paper, “Open, Reproducible and Trustworthy Robot-Based Experiments with Virtual Labs and Digital-Twin-Based Execution Tracing”, accepted to the AIR4S Workshop at IROS 2025, we explore how autonomous robots can help address this problem.

You can find the paper on [ArXiv](https://arxiv.org/abs/2508.11406) and as a PDF [here <i class="fas fa-file-pdf"></i>](/assets/pdf/vrb_scientific_discovery_IROS25_AIR4S.pdf).

Authors:  
Benjamin Alt[^1], Mareike Picklum[^1], Sorin Arion[^1], Franklin Kenghagho Kenfack[^1], Michael Beetz[^1]

## Robots as Engines of Reproducible Science

Robots promise to execute experiments with high precision and reduced bias by following well-defined protocols, ensuring that procedures are consistent across repetitions. But more importantly, robots can make their reasoning and perception processes transparent. Decisions, percepts and beliefs about the world can be logged, shared, and examined post-hoc. This transparency opens the door to a new kind of “robot-driven science” in which experimental results are both repeatable and inspectable.

## Semantic Execution Tracing

Our first contribution is a **semantic execution tracing framework**. It records not only low-level sensor data and actions, but also the robot’s internal reasoning, its hypotheses, and the causal explanations behind its decisions. The framework integrates perception, simulation, and knowledge representation into a single traceable data model. This allows researchers to replay, analyze, and verify robot executions in a scientifically rigorous way.

## The AICOR Virtual Research Building

The second contribution is the [**AICOR Virtual Research Building (VRB)**](https://vrb.ease-crc.org/), a cloud-based platform that hosts entire robot experiments as virtual laboratories. Each experiment is packaged in a containerized environment that includes the code, data, and simulation setup required to reproduce it bit-for-bit. Researchers around the world can explore, replicate, and extend these virtual experiments—much like open-source software, but for embodied scientific procedures.

## Toward Open, Trustworthy, and Robot-Driven Science

By combining semantic execution tracing with virtual laboratories, we take a step toward a future in which scientific experiments are transparent, verifiable, and open to everyone. Autonomous robots, equipped with structured reasoning and digital twins, can not only perform experiments but also explain them. This is a foundation for a new generation of embodied AI systems that do not merely assist in science, but actively participate in the scientific process itself. In the [euROBIN network](https://www.eurobin-project.eu/) and the [Robotics Institute Germany (RIG)](https://robotics-institute-germany.de/), we are building communities of researchers committed to reproducible experimentation in robotics and with robots. Open, reproducible science is a bottom-up effort that can only become reality if everyone contributes. I'm looking forward to discussing how we can continue evolving the VRB and the [CRAM robot control framework](https://www.sciencedirect.com/science/article/pii/S1389041725000555) to serve the needs of the scientific community!

---

[^1]: AICOR Institute for Artificial Intelligence, University of Bremen, Germany  