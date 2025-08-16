# Taxonomy of LLM and AI Agent Patterns and Techniques

## 1. Reasoning Techniques
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chain-of-Thought (CoT)              | [Wei et al., 2022](https://arxiv.org/abs/2201.11903), [NeurIPS 2022](https://dl.acm.org/doi/10.5555/3600270.3602070), [IBM](https://www.ibm.com/think/topics/chain-of-thoughts), [TechTarget](https://www.techtarget.com/searchenterpriseai/definition/chain-of-thought-prompting), [Prompt Engineering Guide](https://www.promptingguide.ai/techniques/cot) |
| Tree-of-Thoughts (ToT)              | [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                                                                          |
| Graph-of-Thoughts                   | [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                                                                          |
| Knowledge Graph Integration (KG-CoT)| [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Program-Aided Language Models (PAL) | [Gao et al., 2022](https://arxiv.org/abs/2211.10435)                                                                                                                                                   |
| ReAct (Reasoning and Acting)        | [Yao et al., 2022](https://arxiv.org/abs/2210.03629), [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                          |
| Chain-of-Verification (CoVe)        | [Dhuliawala et al., 2023](https://arxiv.org/abs/2309.11495)                                                                                                                                            |
| Self-Consistency                    | [Wang et al., 2022](https://arxiv.org/abs/2203.11171)                                                                                                                                                   |
| Neuro-Symbolic Reasoning            | [Mao et al., 2019](https://arxiv.org/abs/1904.12584), [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                   |
| Symbolic Program Synthesis          | [Ellis et al., 2023](https://arxiv.org/abs/2305.11160)                                                                                                                                                  |
| Hybrid Reasoning Fusion             | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 2. Self-Improvement
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Self-Critique / Reflection          | [Shinn et al., 2023](https://arxiv.org/abs/2303.17651), [DeepLearning.AI](https://www.deeplearning.ai/the-batch/agentic-design-patterns-part-2-reflection/), [Evjang, 2023](https://evjang.com/2023/03/26/self-reflection.html)       |
| Iterative Refinement                | [Madaan et al., 2023](https://arxiv.org/abs/2303.17651), [IMPROVE](https://arxiv.org/html/2502.18530v1), [Iterative Experience Refinement](https://arxiv.org/abs/2405.04219)                                      |
| Reflexion                           | [Shinn et al., 2023](https://arxiv.org/abs/2303.17651), [Evjang, 2023](https://evjang.com/2023/03/26/self-reflection.html)                                                                               |
| Self-Refine                         | [Madaan et al., 2023](https://arxiv.org/abs/2303.17651), [Prompt Engineering Guide](https://learnprompting.org/docs/advanced/self_criticism/self_refine)                                                     |
| Constitutional AI                   | [Bai et al., 2022](https://arxiv.org/abs/2212.08073)                                                                                                                                                   |
| Recursive Criticism and Improvement | [Bowman et al., 2022](https://arxiv.org/abs/2206.05866)                                                                                                                                                 |

---

## 3. Planning & Execution
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Hierarchical Planning               | [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                                                                          |
| Goal Decomposition                  | [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                                                                          |
| ReAct                               | [Yao et al., 2022](https://arxiv.org/abs/2210.03629), [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                          |
| Scenario Planning                   | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Constraint Satisfaction             | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Meta-Reasoning Orchestration        | [Yao et al., 2022](https://arxiv.org/abs/2210.03629)                                                                                                                                                   |
| Adaptive Complexity Scaling         | [IMPROVE](https://arxiv.org/html/2502.18530v1)                                                                                                                                                         |

---

## 4. Memory Management
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Long-Term Memory (LTM)              | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Short-Term Memory                   | [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                                                                          |
| Hybrid Memory Systems               | [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                                                                          |
| Sliding Window                      | [Beltagy et al., 2020](https://arxiv.org/abs/2004.05150)                                                                                                                                                |
| Hierarchical Memory                 | [Dhingra et al., 2019](https://arxiv.org/abs/1910.13461)                                                                                                                                                |
| Attention Mechanisms                | [Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)                                                                                                                                                |
| Memory Consolidation                | [Wang et al., 2023](https://arxiv.org/abs/2303.15042)                                                                                                                                                   |
| Working Memory Patterns             | [Graves et al., 2014](https://arxiv.org/abs/1410.5401)                                                                                                                                                  |
| Context Compression                 | [Xiao et al., 2023](https://arxiv.org/abs/2307.08621)                                                                                                                                                   |
| Multimodal Context Integration      | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 5. Multi-Agent Systems
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Message Passing                     | [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                                                                                                |
| Hierarchical Coordination           | [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                                                                                                |
| Actor Frameworks                     | [Hewitt et al., 1973](https://dl.acm.org/doi/10.1145/359576.359579), [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                               |
| Agent Orchestration                 | [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                                                                                                |
| Peer Collaboration                  | [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                                                                                                |
| Consensus Algorithms                | [Lamport, 1998](https://dl.acm.org/doi/10.1145/279227.279229)                                                                                                                                          |
| Publish-Subscribe Patterns          | [Eugster et al., 2003](https://dl.acm.org/doi/10.1145/945445.945450)                                                                                                                                    |
| Gossip Protocols                    | [Demers et al., 1987](https://dl.acm.org/doi/10.1145/41840.41841)                                                                                                                                      |
| Distributed Coordination            | [Lynch, 1996](https://dl.acm.org/doi/10.5555/248052)                                                                                                                                                    |
| A2A Protocol (Agent2Agent)          | [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                                                                                                |

---

## 6. Tool Use
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Function Calling                    | [OpenAI API](https://platform.openai.com/docs/guides/function-calling), [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                     |
| API Integration                     | [Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)                                                                                                                          |
| Toolformer                          | [Schick et al., 2023](https://arxiv.org/abs/2302.04761)                                                                                                                                                 |
| Code Execution                      | [Gao et al., 2022](https://arxiv.org/abs/2211.10435)                                                                                                                                                   |
| Plugin Architecture                 | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Model Context Protocol              | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| REST APIs                            | [Fielding, 2000](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)                                                                                                                          |
| Message Queuing                     | [Hohpe & Woolf, 2003](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)                                                                                                               |

---

## 7. Workflow Orchestration
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event-Driven Orchestration          | [Hohpe & Woolf, 2003](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)                                                                                                               |
| Graph-Based Orchestration           | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Role-Based Orchestration            | [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                                                                                                |
| Event-Driven Hierarchical Agents    | [Wang et al., 2023](https://arxiv.org/html/2401.03428v1)                                                                                                                                                |
| Event-Driven Blackboard             | [Nii, 1986](https://dl.acm.org/doi/10.1145/12271.12273)                                                                                                                                                 |
| Event-Driven Market-Based           | [Clearwater, 1996](https://dl.acm.org/doi/10.1145/235962.235964)                                                                                                                                        |
| Stateful Graph Workflows             | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Conversational Orchestration        | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Graph State Machines                 | [Harel, 1987](https://dl.acm.org/doi/10.1145/24039.24041)                                                                                                                                              |
| Actor Model Coordination             | [Hewitt et al., 1973](https://dl.acm.org/doi/10.1145/359576.359579)                                                                                                                                      |
| Federated Orchestration             | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Resource-Aware Scheduling           | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 8. Knowledge Retrieval (RAG)
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Retrieval-Augmented Generation (RAG)| [Lewis et al., 2020](https://arxiv.org/abs/2005.11401)                                                                                                                                                 |
| Graph RAG                           | [Sun et al., 2023](https://arxiv.org/abs/2308.09962)                                                                                                                                                   |
| Node RAG                            | [Sun et al., 2023](https://arxiv.org/abs/2308.09962)                                                                                                                                                   |
| Self-RAG                            | [Asai et al., 2023](https://arxiv.org/abs/2310.11511)                                                                                                                                                   |
| Corrective RAG                      | [Nakano et al., 2021](https://arxiv.org/abs/2101.00027)                                                                                                                                                 |
| Adaptive RAG                        | [Jiang et al., 2023](https://arxiv.org/abs/2305.06983)                                                                                                                                                  |
| Modular RAG                         | [Khattab et al., 2023](https://arxiv.org/abs/2305.18565)                                                                                                                                                |
| Multimodal RAG                      | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Conversational RAG                  | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Hierarchical RAG                    | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Chain-of-Verification RAG           | [Dhuliawala et al., 2023](https://arxiv.org/abs/2309.11495)                                                                                                                                            |
| Agentic RAG Systems                 | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 9. Knowledge Representation
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RDF Knowledge Modeling              | [W3C RDF](https://www.w3.org/RDF/)                                                                                                                                                                      |
| SHACL Constraint Validation         | [W3C SHACL](https://www.w3.org/TR/shacl/)                                                                                                                                                               |
| OWL Ontological Reasoning           | [W3C OWL](https://www.w3.org/OWL/)                                                                                                                                                                      |
| Knowledge Graph Construction        | [Paulheim, 2017](https://link.springer.com/book/10.1007/978-3-319-49816-9)                                                                                                                              |
| Semantic Data Validation            | [W3C Semantic Web](https://www.w3.org/standards/semanticweb/)                                                                                                                                            |

---

## 10. Domain Specialization
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Domain-Specific LLMs                | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Fine-Tuning and AutoML              | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Zero-Shot Learning                  | [Brown et al., 2020](https://arxiv.org/abs/2005.14165)                                                                                                                                                  |
| Few-Shot Learning                   | [Brown et al., 2020](https://arxiv.org/abs/2005.14165)                                                                                                                                                  |

---

## 11. Multimodal Capabilities
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Multimodal Models (e.g., GPT-4o, Gemini 2.0) | [OpenAI GPT-4o](https://openai.com/index/gpt-4o/), [Google Gemini](https://deepmind.google/technologies/gemini/), [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                     |
| Multimodal RAG                      | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Multimodal Context Integration      | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 12. Safety & Guardrails
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Red-Teaming                         | [Ganguli et al., 2022](https://arxiv.org/abs/2209.14375)                                                                                                                                                |
| Alignment Taxonomies                | [Askell et al., 2021](https://arxiv.org/abs/2102.02820)                                                                                                                                                 |
| Fail-Safe Mechanisms                | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Circuit Breaker Pattern             | [Nygard, 2007](https://martinfowler.com/bliki/CircuitBreaker.html)                                                                                                                                      |
| Intelligent Retry with Backoff      | [AWS Retry](https://docs.aws.amazon.com/general/latest/gr/api-retries.html)                                                                                                                             |
| Graceful Degradation                | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Comprehensive Health Monitoring     | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 13. Regulatory Compliance
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EU AI Act Compliance                | [EU AI Act](https://artificialintelligenceact.eu/)                                                                                                                                                     |
| Ethical Safeguards                  | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Bias Mitigation                     | [Mehrabi et al., 2021](https://arxiv.org/abs/2108.11074)                                                                                                                                                |
| Transparency and Explainability    | [SHAP](https://github.com/slundberg/shap), [LIME](https://github.com/marcotcr/lime), [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                           |

---

## 14. Open LLM Development
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Open-Source Models                  | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Open-Weight Models                  | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 15. Evaluation and Monitoring
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AI Metrics Dashboards               | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Automated AI Testing                | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Statistical Performance Monitoring | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| User Feedback Integration           | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 16. Human-AI Collaboration
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Human-in-the-Loop                   | [Holzinger, 2016](https://link.springer.com/article/10.1007/s10115-015-0900-2)                                                                                                                          |
| Human On the Loop                   | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Human-AI Team Formation             | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Augmented Decision Making           | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Collaborative Learning              | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Explainable AI Interaction          | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Approval Workflows                  | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Collaborative Filtering             | [Schafer et al., 2007](https://dl.acm.org/doi/10.1145/1242572.1242665)                                                                                                                                 |
| Escalation Procedures               | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Feedback Loops                      | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 17. Resource-Aware Optimization
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Adaptive Compute Scaling            | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Cost-Aware Model Selection          | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Energy-Efficient Inference          | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Memory Optimization                 | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |
| Latency Optimization                | [LLM Trends 2025](https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf)                                                                                           |

---

## 18. Exploration and Discovery
| Technique (Canonical Name)         | Source                                                                                                                                                                                                 |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Reinforcement Learning Exploration  | [Sutton & Barto, 2018](http://incompleteideas.net/book/the-book-2nd.html)                                                                                                                               |
| Curiosity-Driven Exploration        | [Pathak et al., 2017](https://arxiv.org/abs/1705.05363)                                                                                                                                                |
| Multi-Armed Bandit Optimization     | [Lattimore & Szepesvári, 2020](https://tor-lattimore.com/downloads/book/book.pdf)                                                                                                                       |
| Evolutionary Discovery Algorithms  | [Stanley & Miikkulainen, 2002](https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)                                                                                                             |

---
