---
layout: post
title: Semi-Autonomous Robotic Assistance for Gallbladder Retraction in Surgery
date: 2025-06-08 01:00:00-0400
categories: blog
tags: robot-surgery robot-learning learning-from-demonstration paper 
description: A semi-autonomous robotic assistance system for minimally invasive surgery that allows surgeons to demonstrate retraction tasks while ensuring the interpretability of resulting behavior.
---

In our recent work "Semi-Autonomous Robotic Assistance for Gallbladder Retraction in Surgery", my coauthors and I introduce a novel framework for robot learning of gallbladder retraction motions in the context of laparoscopic gallbladder surgery. The paper is to appear in the IEEE Robotics and Automation Letters (RA-L).

You can find the paper on [IEEE Xplore](https://ieeexplore.ieee.org/document/11027660), as well as a PDF [here](/assets/pdf/RAL_DKMP.pdf).

Authors:
Alexander Schüßler[^1], Christian Kunz[^2], Rayan Younis[^3], Benjamin Alt[^4], Jamie Paik[^1], Martin Wagner[^3], Franziska Mathis-Ullrich[^2]

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/gallbladder-ral/experiment_setup.jpg" class="img-fluid rounded z-depth-1 w-75 mx-auto d-block" %}
    </div>
</div>

# Motivation

Robotic assistance in surgery is a rapidly advancing field, but full autonomy remains impractical for most procedures due to the complexity and unpredictability of intraoperative environments. A more viable near-term approach is semi-autonomous robotic assistance, where robots support human surgeons by executing subtasks under supervision.

One such subtask is gallbladder retraction during a cholecystectomy (gallbladder removal). Retraction is critical for providing access and visibility but is labor-intensive and error-prone when performed manually. It is also ideally suited for robotic support due to its structured nature and spatial constraints.

However, standard end-to-end learning methods (e.g., deep imitation learning) suffer from poor interpretability, making them difficult to trust and certify in clinical settings. This work proposes a framework that incorporates domain knowledge directly into the learning process to enhance interpretability without compromising performance.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/gallbladder-ral/dkmp_overview.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

# Core Idea: Domain Knowledge-Informed Movement Primitives (DKMP)

Our approach, termed Domain Knowledge-Informed Movement Primitives (DKMP), combines semantic feature extraction from 3D point clouds using anatomical landmarks manually selected by the surgeon, neural network-based prediction of retraction endpoints using these features as input, and trajectory generation via Probabilistic Movement Primitives (ProMPs) conditioned on the predicted endpoint. In contrast to end-to-end systems that map raw images directly to motions, DKMP leverages explicit spatial features grounded in surgical intuition, such as the location of the next dissection point and the intended direction of retraction force.

# Experimental Setup

We trained and evaluated DKMP using a dual-arm robotic setup:

* A Franka Emika Panda robot executes retraction motions via a laparoscopic grasper.

* A UR5 arm holds a ZED2 stereo camera that captures the 3D structure of the surgical scene.

* Surgical landmarks are manually labeled by the surgeon through a GUI.

Experiments were conducted on both a silicone liver phantom and ex vivo porcine livers. To train DKMP, we collected over 500 retraction demonstrations, clustering them based on anatomical context (left, middle, or right retraction depending on the dissection line).

# Results

DKMP was compared to a DeepMP (Deep Movement Primitives) baseline. On both phantom and ex vivo datasets:

* DKMP achieved comparable or superior accuracy in endpoint and trajectory prediction.

* DKMP showed higher interpretability due to its structured input representation.

When trained on phantom data but tested on ex vivo, performance dropped significantly, underscoring the domain gap between synthetic and biological tissue.

### Surgical Trials

In pre-clinical trials (5 phantom, 5 ex vivo surgeries), DKMP achieved 91% and 92% success rates, respectively. Success was defined by correct retraction direction and sufficient tension as judged by a clinical expert. The system executed retractions semi-autonomously with surgeon supervision (LoA 2).

# Broader Implications

This work contributes a data-efficient, interpretable imitation learning framework for high-stakes human-robot collaboration tasks. The idea of injecting domain knowledge into both feature design and trajectory generation is applicable far beyond surgery, potentially benefiting assistive robotics, industrial teleoperation, or inspection systems where interpretability is as important as performance.

From a machine learning standpoint, the paper bridges symbolic priors with neural prediction and probabilistic control, exemplifying a hybrid approach to interpretable robot behavior synthesis.

### Citation

```
A. Schüßler et al., “Semi-Autonomous Robotic Assistance for Gallbladder Retraction in Surgery,” IEEE Robotics and Automation Letters, pp. 1–8, 2025, doi: 10.1109/LRA.2025.3577430.
```

---

[^1]: Reconfigurable Robotics Laboratory, Ecole Polytechnique Fédérale de Lausanne (EPFL), Switzerland
[^2]: Surgical Planning and Robotic Cognition Laboratory, Department Artificial Intelligence in Biomedical Engineering (AIBE), Friedrich-Alexander-University Erlangen-Nuremberg, Germany
[^3]:  Department of Visceral, Thoracic and Vascular Surgery, Faculty of Medicine, University Hospital Carl Gustav Carus & Center for the Tactile Internet with Human-in-the-Loop (CeTI), Technische Universität Dresden, Germany
[^4]: AICOR Institute for Artificial Intelligence, University of Bremen, Germany
