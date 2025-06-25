---
layout: post
title: AI-based Framework for Robust Model-Based Connector Mating in Robotic Wire Harness Installation
date: 2025-06-09 01:00:00-0400
categories: blog
tags: robot-assembly robot-learning visuotactile-learning optimization paper 
description: At CASE 2025, my colleagues and I are presenting a novel AI-based framework for robust, data-driven connector mating in robotic wire harness installation, combining visuotactile learning with model-based optimization.
---

In our recent work "AI-based Framework for Robust Model-Based Connector Mating in Robotic Wire Harness Installation", my coauthors and I present an AI-driven approach to automate connector mating in automotive wire harness installation. The paper has been accepted for presentation at the IEEE International Conference on Automation Science and Engineering (CASE) 2025.

You can find the paper on [ArXiv](https://arxiv.org/abs/2503.09409) and as a PDF [here <i class="fas fa-file-pdf"></i>](/assets/pdf/wire_harness_CASE25.pdf).

Demonstration videos as well as additional information can be found on the [paper website](https://claudius-kienle.github.io/AppMuTT).

Authors:  
Claudius Kienle[^1] [^4], Benjamin Alt[^2] [^4], Finn Schneider[^3] [^4], Tobias Pertlwieser[^3], Rainer Jäkel[^4], Rania Rayyes[^3]

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/wire-harness-case25/setup.png" class="img-fluid rounded z-depth-1 w-50 mx-auto d-block"%}
    </div>
</div>

# Motivation

Robotic wire harness installation remains one of the least automated processes in automotive assembly, primarily due to the high flexibility of cables, process variance, and the precision required for connector mating. Manual installation dominates the industry, introducing a bottleneck in an otherwise highly automated production line.

Traditional robotic connector mating strategies rely on vision and force-controlled search but are limited by trade-offs between robustness and cycle time. These systems are often sensitive to proc   ess noise, require extensive manual tuning, and struggle with the sub-millimeter tolerances typical in automotive connectors.

# Core Idea: AI-Driven Connector Mating with Model-Based Optimization

Our framework combines visuotactile learning with first-order trajectory optimization to improve the robustness and efficiency of connector mating. Specifically, we introduce a [Multimodal Trajectory Transformer (MuTT)](https://ieeexplore.ieee.org/abstract/document/10802198) that predicts robot-environment interactions based on visual, tactile, and proprioceptive inputs. MuTT is embedded in a differentiable shadow program that serves as a predictive model for optimizing robot program parameters via gradient-based search.

Unlike model-free reinforcement learning, our approach leverages the structure of existing industrial robot programs and enables parameter optimization directly on the controller. This ensures that the optimized programs remain interpretable, auditable, and compatible with standard safety functions.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/wire-harness-case25/framework.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="caption">
AI-based Framework for Visuotactile Connector Mating: A programmer creates a initial robot program using industry-standard tools (left). During the ramp-up phase, the robot executes the program repeatedly with varying search parameterizations. The resulting dataset is used to train <a href="https://ieeexplore.ieee.org/abstract/document/10802198">MuTT</a>, a predictive visuotactile model of the robot and environment dynamics (center). MuTT serves as a sim2real predictor for the first-order optimizer <a href="https://ieeexplore.ieee.org/document/9561206">SPI</a>, which optimizes program parameters for robust and fast connector mating given the observed process variance and current environment image (right).
    </div>
</div>

# Experimental Setup

We validated the proposed framework on an automotive center console assembly task using a UR5e robot equipped with a force-torque sensor, a 2D camera, and a Schunk pneumatic gripper. The system was tested on five distinct connector geometries representative of modern automotive wire harnesses.

The experimental process involved:

* Data-driven training with more than 4,000 connector mating trials per connector type.
* Simulation of process variance via randomized socket positions and initial robot parameters.
* Automated data collection and continuous model refinement.

# Results

The optimized connector mating programs achieved:

* Significant reduction in cycle times across all connector types (up to 35% faster).
* Increased success rates, reaching up to 98% post-optimization.
* Robust performance under stochastic variances and across diverse connector geometries.

The system outperformed traditional force-controlled search strategies by efficiently adapting the search pattern based on visuotactile feedback and environmental images.

# Broader Implications

Our work provides a practical pathway for deploying AI-driven optimization in industrial assembly tasks with tight tolerances and process noise. By leveraging model-based program optimization rather than end-to-end control, the framework offers a safe, certifiable, and data-efficient alternative to conventional machine learning pipelines.

The core ideas of multimodal learning, visuotactile modeling, and gradient-based robot program optimization extend beyond wire harness installation and are applicable to other challenging industrial insertion and assembly tasks.

### Citation

```bibtex 
@misc{kienleAIbasedFrameworkRobust2025,
  title = {AI-based Framework} for {Robust Model-Based Connector Mating} in {Robotic Wire Harness Installation},
  author = {Kienle, Claudius and Alt, Benjamin and Schneider, Finn and Pertlwieser, Tobias and J{\"a}kel, Rainer and Rayyes, Rania},
  year = {2025},
  month = mar,
  number = {arXiv:2503.09409},
  eprint = {2503.09409},
  primaryclass = {cs},
  publisher = {arXiv},
  doi = {10.48550/arXiv.2503.09409},
  urldate = {2025-03-17},
  archiveprefix = {arXiv},
  keywords = {Computer Science - Artificial Intelligence,Computer Science - Computational Engineering Finance and Science,Computer Science - Machine Learning,Computer Science - Robotics,my}
}
```

---

[^1]: IAS Lab, Computer Science Department, TU Darmstadt, Germany  
[^2]: AICOR Institute for Artificial Intelligence, University of Bremen, Germany  
[^3]: Institute for Material Handling and Logistics (IFL), Karlsruhe Institute of Technology (KIT), Karlsruhe, Germany  
[^4]: ArtiMinds Robotics, Karlsruhe, Germany
