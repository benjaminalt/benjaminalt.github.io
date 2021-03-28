---
layout: post
title:  "PyTorch Tensor Fu: Gradients and Tensor Construction"
date:   2020-05-05 01:00:00
key: 10002
categories: [PyTorch, TIL]
tags: [PyTorch, TIL]
comment: true
published: false
---

[PyTorch](https://pytorch.org/) is a powerful machine learning framework which combines high performance and very good hardware support with an expressive and easy to use API. I spent the past two years working intensively with PyTorch and came to appreciate its API more than anything else. To me, its tensor API hits the balance between usability and flexibility nearly dead-on, and it shows that the PyTorch development team has gone to great lengths to follow the maxim of usability centric design throughout.[^1] To me, three central tenets of the PyTorch API make it my machine learning framework of choice:

### Eager Execution

Like TensorFlow, PyTorch is built around the concept of differentiable computational graphs. A computational graph is a directed acyclic graph whose nodes are either operations or variables connected by input-output relationships. Prior to TensorFlow 2.0, TensorFlow's computation graph was *static*: The Python code defining a TensorFlow model was not what was executed when running the model, but defined the computation graph which was compiled and separately executed. Static computation graphs, much like compiled programming languages, can be optimized at compile time for performance benefits and can be compiled to run on dedicated or embedded hardware. They are, however, notoriously difficult to debug and typically need to be instrumented for debugging. PyTorch's computation graph is *dynamic*: When a PyTorch program is interpreted by the Python interpreter. 

### Separation of Control and Data Flow

In PyTorch, control flow is expressed using regular Python keywords and syntax. A PyTorch program is a regular Python program, with with branching and looping realized 

### Everything is a Tensor



[^1]: Their [2019 NeurIPS paper](https://papers.nips.cc/paper/9015-pytorch-an-imperative-style-high-performance-deep-learning-library.pdf) explains the design choices and principles underpinning the PyTorch APIs in greater detail.