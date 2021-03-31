---
layout: page
permalink: /spi
title:  "Robot Program Parameter Inference via Differentiable Shadow
Program Inversion"
authors: "Benjamin Alt, Darko Katic, Rainer Jäkel, Asil Kaan Bozcuoğlu, Michael Beetz"
date:   2021-03-06 01:00:00
---

Accepted at the [2021 IEEE International Conference on Robotics and Automation (ICRA)](http://www.icra2021.org/).

Full text: [PDF](/assets/pdf/spi_ICRA21.pdf) [ArXiv](https://arxiv.org/abs/2103.14452)\
Implementation & experiments: [GitHub](https://github.com/benjaminalt/shadow-program-inversion)

### Abstract

Challenging manipulation tasks can be solved effectively by combining individual robot skills, which must be parameterized for the concrete physical environment and task at hand. This is time-consuming and difficult for human programmers, particularly for force-controlled skills. To this end, we present Shadow Program Inversion (SPI), a novel approach to infer optimal skill parameters directly from data. SPI leverages unsupervised learning to train an auxiliary differentiable program representation (“shadow program”) and realizes parameter inference via gradient-based model inversion. Our method enables the use of efficient first-order optimizers to infer optimal parameters for originally non-differentiable skills, including many skill variants currently used in production. SPI zero-shot generalizes across task objectives, meaning that shadow programs do not need to be retrained to infer parameters for different task variants. We evaluate our methods on three different robots and skill frameworks in industrial and household scenarios.

For details, have a look at the [full paper](/assets/pdf/spi_ICRA21.pdf) or the [blog post]({% post_url 2021-03-06-shadow-program-inversion %}).

<div style="text-align: center;">
    <figure class="video_container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/GwQdFN5lmLk?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </figure>
</div>