import { TheoryLesson } from './types';

export const graphNeuralNetworksLesson: TheoryLesson = {
  id: 'graph-neural-networks',
  title: 'Graph Neural Networks: Deep Learning on Knowledge Graphs',
  description:
    'Learn how Graph Neural Networks enable deep learning on graph-structured data, from molecular property prediction to recommendation systems at scale.',
  learningObjectives: [
    'Understand why traditional neural networks fail on graph-structured data',
    'Master the message passing framework and GNN architectures',
    'Learn how GNNs power real-world systems like Pinterest and Uber',
    'Implement GCN layers and semi-supervised node classification'
  ],
  prerequisites: [
    'knowledge-graphs-introduction',
    'knowledge-graph-embeddings',
    'neuro-symbolic-overview',
  ],
  sections: [
    {
      id: 'why-gnns',
      title: '1. Why Graph Neural Networks? The Limits of Traditional Deep Learning',
      content: `## The Problem: Traditional Neural Networks Assume Grid-Structured Data

**CNNs work great on images (2D grids):**
\`\`\`
Image = Grid of pixels
[pixel_00, pixel_01, pixel_02, ...]
[pixel_10, pixel_11, pixel_12, ...]
[pixel_20, pixel_21, pixel_22, ...]

Convolution: Look at local neighborhood
↓
Works because: Pixels have regular, fixed structure
\`\`\`

**RNNs/Transformers work great on sequences (1D):**
\`\`\`
Text = Sequence of tokens
[The, cat, sat, on, the, mat]

Attention: Look at other tokens
↓
Works because: Fixed left-to-right (or all-to-all) structure
\`\`\`

## But What About Graph-Structured Data?

**Graphs have irregular, variable structure:**
\`\`\`
Social Network:
Alice ←→ Bob ←→ Carol
  ↓        ↓
Dave ←→ Eve

• Alice has 2 neighbors
• Bob has 3 neighbors
• Eve has 2 neighbors
• No fixed grid or sequence!
\`\`\`

**Can't use CNNs:**
- ❌ No fixed grid structure
- ❌ Variable number of neighbors
- ❌ No notion of "left/right/up/down"

**Can't use RNNs:**
- ❌ No canonical ordering of nodes
- ❌ Can't flatten to sequence without losing structure

**Can't use standard MLPs:**
- ❌ Input size depends on node degree
- ❌ Ignores graph structure

## The Solution: Graph Neural Networks (GNNs)

**Key insight:** Neural networks that operate directly on graph structure via **message passing**.

\`\`\`
1. Each node has a feature vector (embedding)
2. Nodes send messages to neighbors
3. Nodes aggregate messages and update embeddings
4. Repeat for multiple layers (like CNN layers)
5. Final embeddings capture graph structure + features
\`\`\`

## Real-World Applications

**1. Drug Discovery (Molecule Property Prediction)**
- Molecule = Graph (atoms = nodes, bonds = edges)
- **Task:** Predict toxicity, solubility, efficacy
- **Companies:** Atomwise, Recursion Pharmaceuticals, Insilico Medicine
- **Impact:** Screen millions of molecules in silico before lab synthesis

**2. Recommendation Systems**
- User-Item bipartite graph
- **Task:** Predict which items user will like
- **Companies:** Pinterest (PinSage), Alibaba, Twitter
- **Impact:** 200M+ users, billions of recommendations/day

**3. Traffic Prediction**
- Road network = Graph (intersections = nodes, roads = edges)
- **Task:** Predict congestion 30 minutes ahead
- **Companies:** Google Maps, Uber
- **Impact:** Save millions of hours of commute time

**4. Protein Folding (AlphaFold 2)**
- Protein = Graph (amino acids = nodes, contacts = edges)
- **Task:** Predict 3D structure from sequence
- **Result:** Solved 50-year grand challenge in biology

**5. Fraud Detection**
- Transaction network (users, merchants, devices)
- **Task:** Detect fraud rings (groups of colluding accounts)
- **Companies:** PayPal, Visa, banks
- **Why GNNs:** Fraudsters form dense subgraphs (ring structure)

**6. Knowledge Graph Reasoning**
- Predict missing links in KGs (link prediction)
- Multi-hop question answering
- **Used by:** Google (Knowledge Graph), Amazon (product graph)

---`,
    },
    {
      id: 'message-passing',
      title: '2. The Message Passing Framework: How GNNs Work',
      content: `## Core Idea: Nodes Learn from Neighbors (Like Convolution on Graphs)

**High-level algorithm:**
\`\`\`
FOR each layer l in [1, 2, ..., L]:
    FOR each node v in graph:
        1. Collect messages from neighbors N(v)
        2. Aggregate messages (sum, mean, max, attention)
        3. Update node embedding h_v using messages + old embedding
\`\`\`

## Detailed Message Passing Steps

### **Step 1: Message Construction**
Each neighbor u sends a message to node v:

\`\`\`python
# For each edge (u → v)
message_u_to_v = MESSAGE_FUNCTION(h_u, h_v, e_uv)
\`\`\`

Where:
- \`h_u\`: Embedding of neighbor u
- \`h_v\`: Embedding of node v
- \`e_uv\`: Edge features (optional, e.g., edge type, weight)

**Example message functions:**
\`\`\`python
# Simple: Just pass neighbor embedding
message = h_u

# With edge features: Linear transform
message = W @ [h_u; e_uv]  # Concatenate and transform

# With edge networks: Neural network on edge
message = MLP(h_u, e_uv)
\`\`\`

### **Step 2: Message Aggregation**
Combine messages from all neighbors:

\`\`\`python
messages = [message_u_to_v for u in neighbors(v)]
aggregated = AGGREGATE(messages)
\`\`\`

**Common aggregation functions:**

| **Function** | **Formula** | **Properties** | **Use Case** |
|---|---|---|---|
| **Sum** | Σ message_u | Size-sensitive | Counting (e.g., degree) |
| **Mean** | (1/\\|N\\|) Σ message_u | Size-invariant | Most common |
| **Max** | max(message_u) | Selective | Detecting presence of feature |
| **Attention** | Σ α_u * message_u | Weighted | Heterogeneous neighborhoods |

**Code example:**
\`\`\`python
import torch

def aggregate_mean(messages):
    # messages: List[Tensor] of shape (d,)
    return torch.mean(torch.stack(messages), dim=0)

def aggregate_attention(messages, h_v):
    # Compute attention weights
    attention_scores = [torch.dot(msg, h_v) for msg in messages]
    attention_weights = torch.softmax(torch.tensor(attention_scores), dim=0)

    # Weighted sum
    weighted_messages = [w * msg for w, msg in zip(attention_weights, messages)]
    return sum(weighted_messages)
\`\`\`

### **Step 3: Node Update**
Combine aggregated message with node's current embedding:

\`\`\`python
h_v_new = UPDATE_FUNCTION(h_v_old, aggregated_message)
\`\`\`

**Example update functions:**
\`\`\`python
# Linear: h_v = W_1 @ h_v_old + W_2 @ aggregated_message
h_v_new = W_1 @ h_v_old + W_2 @ aggregated_message

# Non-linear: MLP
h_v_new = MLP([h_v_old; aggregated_message])

# GRU-style (like RNN):
h_v_new = GRU(h_v_old, aggregated_message)
\`\`\`

## Full Message Passing Pseudo-Code

\`\`\`python
class MessagePassingLayer(nn.Module):
    def __init__(self, input_dim, output_dim):
        super().__init__()
        self.W_message = nn.Linear(input_dim, output_dim)
        self.W_update = nn.Linear(input_dim + output_dim, output_dim)

    def forward(self, node_features, edge_index):
        # node_features: (num_nodes, input_dim)
        # edge_index: (2, num_edges) - pairs of (source, target)

        messages = []

        # Step 1: Message construction
        for src, tgt in edge_index.T:
            message = self.W_message(node_features[src])
            messages.append((tgt, message))

        # Step 2: Message aggregation (by target node)
        aggregated = {}
        for tgt, msg in messages:
            if tgt not in aggregated:
                aggregated[tgt] = []
            aggregated[tgt].append(msg)

        aggregated = {
            tgt: torch.mean(torch.stack(msgs), dim=0)
            for tgt, msgs in aggregated.items()
        }

        # Step 3: Node update
        new_features = []
        for i in range(len(node_features)):
            if i in aggregated:
                combined = torch.cat([node_features[i], aggregated[i]])
                new_features.append(self.W_update(combined))
            else:
                # Isolated node: just use old features
                new_features.append(node_features[i])

        return torch.stack(new_features)
\`\`\`

## Intuition: GNNs are "Convolution on Graphs"

**Image CNN:**
- Each pixel aggregates from 3×3 neighborhood
- Fixed neighborhood structure

**Graph GNN:**
- Each node aggregates from variable-size neighborhood
- Adaptive neighborhood structure

**Both:**
- Local → Global (stack many layers)
- Learnable aggregation (via weights W)
- Hierarchical representations

---`,
    },
    {
      id: 'gnn-architectures',
      title: '3. Popular GNN Architectures',
      content: `## 1. Graph Convolutional Network (GCN) - The Foundation

**Paper:** Semi-Supervised Classification with Graph Convolutional Networks (Kipf & Welling, 2017)

**Key idea:** Normalized mean aggregation

\`\`\`
h_v^{(l+1)} = σ( Σ_{u ∈ N(v) ∪ {v}} (1/√(deg(u) * deg(v))) * W^{(l)} @ h_u^{(l)} )
\`\`\`

**In English:**
1. Sum messages from neighbors (+ self-loop)
2. Normalize by degree (prevents vanishing/exploding with high-degree nodes)
3. Apply weight matrix W
4. Apply activation (ReLU, etc.)

**PyTorch implementation:**
\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F

class GCNLayer(nn.Module):
    def __init__(self, in_dim, out_dim):
        super().__init__()
        self.linear = nn.Linear(in_dim, out_dim)

    def forward(self, X, adj):
        # X: (num_nodes, in_dim) - node features
        # adj: (num_nodes, num_nodes) - adjacency matrix

        # Add self-loops
        adj = adj + torch.eye(adj.shape[0])

        # Compute degree matrix D
        D = torch.diag(adj.sum(dim=1))

        # Normalized adjacency: D^{-1/2} @ A @ D^{-1/2}
        D_inv_sqrt = torch.diag(1.0 / torch.sqrt(D.diag()))
        adj_normalized = D_inv_sqrt @ adj @ D_inv_sqrt

        # Message passing + linear transform
        X = adj_normalized @ X  # Aggregate from neighbors
        X = self.linear(X)      # Transform

        return F.relu(X)

class GCN(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.conv1 = GCNLayer(input_dim, hidden_dim)
        self.conv2 = GCNLayer(hidden_dim, output_dim)

    def forward(self, X, adj):
        X = self.conv1(X, adj)
        X = F.dropout(X, p=0.5, training=self.training)
        X = self.conv2(X, adj)
        return F.log_softmax(X, dim=1)
\`\`\`

**Strengths:**
- ✅ Simple, efficient, well-studied
- ✅ Strong spectral theory foundation
- ✅ Works well on homophilic graphs (similar nodes connect)

**Weaknesses:**
- ❌ Over-smoothing with deep networks (nodes become identical)
- ❌ Uniform aggregation (all neighbors treated equally)
- ❌ Poor on heterophilic graphs (dissimilar nodes connect)

**Used by:**
- Semi-supervised node classification
- Citation networks (Cora, Citeseer)
- Baseline for many graph learning benchmarks

---

## 2. Graph Attention Network (GAT) - Learned Attention

**Paper:** Graph Attention Networks (Veličković et al., 2018)

**Key idea:** Learn attention weights for each neighbor

\`\`\`
α_{uv} = softmax(LeakyReLU(a^T @ [W @ h_u || W @ h_v]))
h_v^{(l+1)} = σ( Σ_{u ∈ N(v)} α_{uv} * W^{(l)} @ h_u^{(l)} )
\`\`\`

**In English:**
1. For each neighbor u of v, compute attention score α_{uv}
2. Attention depends on both u and v features
3. Aggregate using attention-weighted sum

**PyTorch implementation:**
\`\`\`python
class GATLayer(nn.Module):
    def __init__(self, in_dim, out_dim, num_heads=8):
        super().__init__()
        self.num_heads = num_heads
        self.out_dim = out_dim

        # Multi-head attention
        self.W = nn.Linear(in_dim, out_dim * num_heads)
        self.a = nn.Parameter(torch.zeros(size=(2 * out_dim, 1)))

        self.leaky_relu = nn.LeakyReLU(0.2)

    def forward(self, X, edge_index):
        # X: (num_nodes, in_dim)
        # edge_index: (2, num_edges)

        # Linear transform
        X_transformed = self.W(X)  # (num_nodes, out_dim * num_heads)
        X_transformed = X_transformed.view(-1, self.num_heads, self.out_dim)

        # Compute attention scores for each edge
        src, tgt = edge_index

        # Concatenate source and target features
        X_src = X_transformed[src]  # (num_edges, num_heads, out_dim)
        X_tgt = X_transformed[tgt]

        # Attention mechanism
        attention_input = torch.cat([X_src, X_tgt], dim=-1)  # (num_edges, num_heads, 2*out_dim)
        e = self.leaky_relu(attention_input @ self.a[:, None])  # (num_edges, num_heads, 1)

        # Softmax per target node
        attention = torch.zeros_like(e)
        for i in range(X.shape[0]):
            mask = tgt == i
            if mask.any():
                attention[mask] = F.softmax(e[mask], dim=0)

        # Aggregate with attention weights
        messages = attention * X_src  # (num_edges, num_heads, out_dim)

        # Sum messages per target node
        X_out = torch.zeros(X.shape[0], self.num_heads, self.out_dim)
        for i, (s, t) in enumerate(edge_index.T):
            X_out[t] += messages[i]

        # Concatenate or average heads
        X_out = X_out.view(X.shape[0], -1)  # (num_nodes, num_heads * out_dim)

        return F.elu(X_out)
\`\`\`

**Strengths:**
- ✅ Adaptive: Learns which neighbors are important
- ✅ Interpretable: Attention weights show influence
- ✅ Handles heterophilic graphs better than GCN
- ✅ Multi-head attention (like Transformers)

**Weaknesses:**
- ❌ More parameters than GCN
- ❌ Slower (attention computation per edge)

**Used by:**
- Molecule property prediction (OGB datasets)
- Recommender systems (user-item graphs)
- Any graph with heterogeneous neighborhoods

---

## 3. GraphSAGE - Inductive Learning

**Paper:** Inductive Representation Learning on Large Graphs (Hamilton et al., 2017)

**Key idea:** Sample fixed-size neighborhoods for scalability

**Problem with GCN/GAT:**
- Require entire graph during training
- Can't generalize to new nodes (transductive)

**GraphSAGE solution:**
- Sample K neighbors (e.g., K=25)
- Aggregate with learned functions (mean, LSTM, pool)
- **Inductive:** Can generate embeddings for unseen nodes

\`\`\`python
class GraphSAGELayer(nn.Module):
    def __init__(self, in_dim, out_dim, aggregator='mean'):
        super().__init__()
        self.aggregator = aggregator

        if aggregator == 'mean':
            self.W = nn.Linear(in_dim * 2, out_dim)
        elif aggregator == 'pool':
            self.pool_mlp = nn.Sequential(
                nn.Linear(in_dim, in_dim),
                nn.ReLU()
            )
            self.W = nn.Linear(in_dim * 2, out_dim)

    def forward(self, X, edge_index, num_samples=25):
        # X: (num_nodes, in_dim)
        # edge_index: (2, num_edges)

        aggregated = []

        for i in range(X.shape[0]):
            # Sample K neighbors
            neighbors = edge_index[1][edge_index[0] == i]
            if len(neighbors) > num_samples:
                neighbors = neighbors[torch.randperm(len(neighbors))[:num_samples]]

            if len(neighbors) == 0:
                # No neighbors: use zero vector
                neighbor_agg = torch.zeros_like(X[0])
            elif self.aggregator == 'mean':
                # Mean aggregation
                neighbor_agg = X[neighbors].mean(dim=0)
            elif self.aggregator == 'pool':
                # Max-pool aggregation
                neighbor_features = self.pool_mlp(X[neighbors])
                neighbor_agg = torch.max(neighbor_features, dim=0)[0]

            # Concatenate self + aggregated
            combined = torch.cat([X[i], neighbor_agg])
            aggregated.append(combined)

        aggregated = torch.stack(aggregated)

        # Linear transform
        out = self.W(aggregated)

        return F.relu(out)
\`\`\`

**Strengths:**
- ✅ **Inductive:** Works on unseen nodes
- ✅ **Scalable:** Mini-batch training via sampling
- ✅ Multiple aggregators (mean, LSTM, pool)

**Weaknesses:**
- ❌ Sampling introduces variance
- ❌ May miss important neighbors

**Used by:**
- **Pinterest (PinSage):** 3 billion pins, 18 billion edges
- **Alibaba:** Product recommendation
- **Twitter:** Tweet recommendation
- Any production system with large, dynamic graphs

---

## 4. When to Use Which GNN?

| **Use Case** | **Recommended GNN** | **Why** |
|---|---|---|
| Small graph, all nodes at training time | **GCN** | Simple, efficient, well-studied |
| Heterogeneous neighborhoods | **GAT** | Attention adapts to different neighbor types |
| Large, dynamic graph | **GraphSAGE** | Inductive, scalable with sampling |
| Edge features important | **MPNN, EdgeConv** | Explicit edge feature handling |
| Long-range dependencies | **GraphTransformer** | Global attention (like Transformers) |

---`,
    },
    {
      id: 'gnn-tasks',
      title: '4. GNN Tasks and Training',
      content: `## Three Main Types of Graph Learning Tasks

### **1. Node Classification**
**Goal:** Predict label for each node

**Examples:**
- Classify papers in citation network (Cora: ML, AI, DB, etc.)
- Predict user interests in social network
- Identify fraudulent accounts

**Training:**
\`\`\`python
# Forward pass through GNN
node_embeddings = gnn(node_features, edge_index)

# Predict class for each node
logits = classifier(node_embeddings)  # (num_nodes, num_classes)

# Loss on labeled nodes only (semi-supervised)
loss = F.cross_entropy(logits[train_mask], labels[train_mask])
\`\`\`

**Evaluation:**
\`\`\`python
with torch.no_grad():
    logits = gnn(node_features, edge_index)
    pred = logits.argmax(dim=1)
    acc = (pred[test_mask] == labels[test_mask]).float().mean()
\`\`\`

---

### **2. Graph Classification**
**Goal:** Predict label for entire graph

**Examples:**
- Predict toxicity of molecule
- Classify proteins by function
- Detect malicious software (call graph)

**Architecture:**
\`\`\`python
class GraphClassifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_classes):
        super().__init__()
        self.gnn = GNN(input_dim, hidden_dim)
        self.pool = global_mean_pool  # or max, sum, attention
        self.classifier = nn.Linear(hidden_dim, num_classes)

    def forward(self, batch):
        # batch.x: (total_nodes_in_batch, input_dim)
        # batch.edge_index: (2, total_edges_in_batch)
        # batch.batch: (total_nodes_in_batch,) - which graph each node belongs to

        # 1. GNN on all nodes
        node_embeddings = self.gnn(batch.x, batch.edge_index)

        # 2. Pool to graph-level embeddings
        graph_embeddings = self.pool(node_embeddings, batch.batch)

        # 3. Classify graph
        logits = self.classifier(graph_embeddings)
        return logits
\`\`\`

**Pooling methods:**
\`\`\`python
# Mean pooling
graph_emb = scatter_mean(node_emb, batch, dim=0)

# Max pooling
graph_emb = scatter_max(node_emb, batch, dim=0)

# Sum pooling
graph_emb = scatter_sum(node_emb, batch, dim=0)

# Attention pooling
attention_weights = attention_mlp(node_emb)
graph_emb = scatter_sum(attention_weights * node_emb, batch, dim=0)
\`\`\`

**Training:**
\`\`\`python
from torch_geometric.data import DataLoader

# Create batches of graphs
loader = DataLoader(dataset, batch_size=32, shuffle=True)

for batch in loader:
    logits = model(batch)
    loss = F.cross_entropy(logits, batch.y)
    loss.backward()
    optimizer.step()
\`\`\`

---

### **3. Link Prediction**
**Goal:** Predict missing or future edges

**Examples:**
- Recommend friends in social network
- Predict drug-drug interactions
- Complete knowledge graphs

**Architecture:**
\`\`\`python
class LinkPredictor(nn.Module):
    def __init__(self, input_dim, hidden_dim):
        super().__init__()
        self.gnn = GNN(input_dim, hidden_dim)

    def forward(self, node_features, edge_index):
        # Get node embeddings
        node_embeddings = self.gnn(node_features, edge_index)
        return node_embeddings

    def predict_link(self, emb_u, emb_v):
        # Score edge (u, v)
        return torch.sigmoid(torch.sum(emb_u * emb_v))
\`\`\`

**Training with negative sampling:**
\`\`\`python
# Positive edges (exist in graph)
pos_edges = edge_index  # (2, num_pos_edges)

# Negative edges (don't exist - sample randomly)
neg_edges = sample_negative_edges(num_nodes, num_pos_edges)

# Forward pass
node_embeddings = model(node_features, edge_index)

# Compute scores
pos_scores = (node_embeddings[pos_edges[0]] * node_embeddings[pos_edges[1]]).sum(dim=1)
neg_scores = (node_embeddings[neg_edges[0]] * node_embeddings[neg_edges[1]]).sum(dim=1)

# Loss: positive edges should have high scores, negative low
pos_loss = F.binary_cross_entropy_with_logits(pos_scores, torch.ones_like(pos_scores))
neg_loss = F.binary_cross_entropy_with_logits(neg_scores, torch.zeros_like(neg_scores))
loss = pos_loss + neg_loss
\`\`\`

**Evaluation metrics:**
\`\`\`python
# AUC (Area Under ROC Curve)
from sklearn.metrics import roc_auc_score

all_scores = torch.cat([pos_scores, neg_scores])
all_labels = torch.cat([torch.ones(len(pos_scores)), torch.zeros(len(neg_scores))])
auc = roc_auc_score(all_labels, all_scores)

# Hits@K (Is true edge in top K predictions?)
def hits_at_k(node_embeddings, test_edges, k=10):
    hits = 0
    for src, tgt in test_edges:
        # Score all possible targets
        scores = node_embeddings[src] @ node_embeddings.T
        top_k = scores.topk(k).indices
        if tgt in top_k:
            hits += 1
    return hits / len(test_edges)
\`\`\`

---

## Common Training Tips and Tricks

### **1. Over-smoothing Problem**
**Issue:** Deep GNNs make all nodes identical

\`\`\`
Layer 1: Neighbors influence node
Layer 2: Neighbors of neighbors influence node
Layer 3: 3-hop neighbors influence node
...
Layer 10: Entire graph influences every node → all nodes same!
\`\`\`

**Solutions:**
- **Limit depth:** 2-3 layers usually enough
- **Skip connections:** \`h^{(l+1)} = h^{(l)} + GNN(h^{(l)})\`
- **Layer normalization:** Normalize embeddings per layer
- **JK-Net:** Jumping knowledge networks (concatenate all layer outputs)

### **2. Class Imbalance**
**Issue:** 95% benign nodes, 5% fraud (common in fraud detection)

**Solutions:**
- Weighted cross-entropy: \`loss = -w_class * log(p(class))\`
- Over-sample minority class
- Focal loss: Down-weight easy examples

### **3. Large Graphs**
**Issue:** Can't fit entire graph in GPU memory

**Solutions:**
- **GraphSAGE sampling:** Only use K neighbors per node
- **Cluster-GCN:** Partition graph into clusters, train on one cluster at a time
- **Graph sampling:** Sample subgraphs for each mini-batch

### **4. Dynamic Graphs**
**Issue:** Edges/nodes change over time

**Solutions:**
- **Temporal GNNs:** RNN over graph snapshots
- **Streaming updates:** Incremental embedding updates
- **Inductive methods:** GraphSAGE, FastGCN

---

## PyTorch Geometric (PyG) - Production GNN Library

\`\`\`python
import torch
import torch.nn.functional as F
from torch_geometric.nn import GCNConv, GATConv, SAGEConv
from torch_geometric.datasets import Planetoid
from torch_geometric.data import Data

# Load dataset
dataset = Planetoid(root='/tmp/Cora', name='Cora')
data = dataset[0]  # Single graph with 2708 nodes

# Define model
class GNN(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.conv1 = GCNConv(input_dim, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, output_dim)

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, p=0.5, training=self.training)
        x = self.conv2(x, edge_index)
        return F.log_softmax(x, dim=1)

# Train
model = GNN(dataset.num_features, 16, dataset.num_classes)
optimizer = torch.optim.Adam(model.parameters(), lr=0.01, weight_decay=5e-4)

model.train()
for epoch in range(200):
    optimizer.zero_grad()
    out = model(data.x, data.edge_index)
    loss = F.nll_loss(out[data.train_mask], data.y[data.train_mask])
    loss.backward()
    optimizer.step()

# Evaluate
model.eval()
pred = model(data.x, data.edge_index).argmax(dim=1)
correct = (pred[data.test_mask] == data.y[data.test_mask]).sum()
acc = int(correct) / int(data.test_mask.sum())
print(f'Accuracy: {acc:.4f}')
\`\`\`

**PyG features:**
- ✅ 30+ GNN layers (GCN, GAT, GraphSAGE, GIN, etc.)
- ✅ Efficient sparse operations
- ✅ Mini-batching for large graphs
- ✅ Popular datasets (OGB, TU Datasets, etc.)
- ✅ Integration with PyTorch Lightning, Weights & Biases

---`,
    },
    {
      id: 'production-gnns',
      title: '5. GNNs in Production: Real-World Systems',
      content: `## Case Study 1: Pinterest PinSage (3 Billion Pins, 18 Billion Edges)

**Problem:** Recommend visually similar pins at massive scale

**Architecture:**
\`\`\`
Pin Graph:
• Nodes: 3B pins (images)
• Edges: 18B edges (user engagement: save, click, close-up view)

Goal: Recommend pins similar to seed pin
\`\`\`

**PinSage Design Choices:**

**1. Inductive (GraphSAGE-based):**
- New pins added constantly
- Can't retrain entire graph
- Solution: Generate embeddings on-the-fly for new pins

**2. Importance-based Sampling:**
- Not all neighbors are equal
- Sample neighbors with highest importance (e.g., visit count)
- Reduces noise from low-quality edges

**3. Hard Negative Mining:**
- Random negatives are too easy
- Sample hard negatives: pins from same board but user didn't engage
- Improves ranking quality

**4. Production Pipeline:**
\`\`\`
Offline (daily):
• Train GNN on full graph (distributed across GPUs)
• Generate embeddings for all pins
• Build approximate nearest neighbor index (FAISS)

Online (milliseconds):
• User views pin P
• Look up embedding e_P
• Query ANN index for top 100 nearest neighbors
• Re-rank with learned model (engagement prediction)
• Return top 20 pins
\`\`\`

**Results:**
- **150% improvement** in engagement over previous system
- Deployed to **200M+ users**
- **Latency:** <100ms for recommendations

**Key lessons:**
- Inductive methods essential for dynamic graphs
- Importance sampling > random sampling
- Combine GNN embeddings with downstream ranking models

---

## Case Study 2: Alibaba (E-commerce Recommendation)

**Problem:** Recommend products in session-based shopping

**Graph Structure:**
\`\`\`
Session Graph (per user session):
• Nodes: Products viewed in session
• Edges: Sequential views (A → B if user viewed B after A)

Goal: Predict next product user will view/purchase
\`\`\`

**Architecture: SR-GNN (Session-based Recommendation with GNN)**

\`\`\`python
class SessionGNN(nn.Module):
    def __init__(self, hidden_dim):
        super().__init__()
        self.gnn = GatedGraphConv(hidden_dim, num_layers=3)
        self.attention = nn.Linear(hidden_dim, 1)

    def forward(self, session_graph):
        # 1. GNN on session graph
        item_embeddings = self.gnn(session_graph)

        # 2. Attention-based session embedding
        attention_weights = F.softmax(self.attention(item_embeddings), dim=0)
        session_emb = (attention_weights * item_embeddings).sum(dim=0)

        # 3. Score all candidate items
        scores = session_emb @ self.all_item_embeddings.T

        return scores
\`\`\`

**Results:**
- **25% improvement** over RNN baselines
- **Deployed at scale:** Millions of sessions/day
- **Latency:** <50ms per recommendation

**Why GNN > RNN for sessions?**
- RNN: Assumes strict sequential order
- GNN: Captures complex item relationships (e.g., user revisits item, skips around)

---

## Case Study 3: Google Maps Traffic Prediction

**Problem:** Predict traffic speed 30 minutes ahead

**Graph Structure:**
\`\`\`
Road Network:
• Nodes: Road segments (100K+ in major city)
• Edges: Connections between segments
• Node features: Current speed, historical patterns, time of day, weather
• Goal: Predict speed on each segment 30 min ahead
\`\`\`

**Architecture: Temporal GNN**

\`\`\`python
class TrafficGNN(nn.Module):
    def __init__(self, input_dim, hidden_dim):
        super().__init__()
        self.spatial_conv = GCNConv(input_dim, hidden_dim)
        self.temporal_lstm = nn.LSTM(hidden_dim, hidden_dim)
        self.predictor = nn.Linear(hidden_dim, 1)  # Predict speed

    def forward(self, graph_snapshots):
        # graph_snapshots: List of (features, edge_index) for each time step

        embeddings = []

        # 1. Spatial: GNN on each snapshot
        for features, edge_index in graph_snapshots:
            emb = self.spatial_conv(features, edge_index)
            embeddings.append(emb)

        # 2. Temporal: LSTM over time
        embeddings = torch.stack(embeddings)  # (time_steps, num_nodes, hidden_dim)
        embeddings = embeddings.permute(1, 0, 2)  # (num_nodes, time_steps, hidden_dim)

        lstm_out, _ = self.temporal_lstm(embeddings)

        # 3. Predict future speed
        predictions = self.predictor(lstm_out[:, -1, :])  # Last time step

        return predictions
\`\`\`

**Results:**
- **Deployed in Google Maps** (2019)
- **50% improvement** in prediction accuracy over previous model
- **Impact:** Powers ETAs for billions of trips

**Key insight:**
- Combine spatial GNN (road network structure) with temporal RNN (time series)
- Congestion propagates through network: GNN captures this naturally

---

## Case Study 4: AlphaFold 2 (Protein Structure Prediction)

**Problem:** Predict 3D structure of protein from amino acid sequence

**Why GNNs?**
- Protein = Graph (amino acids = nodes, spatial contacts = edges)
- 3D structure determined by interactions between residues

**Architecture (simplified):**
\`\`\`
1. Initial features: Amino acid sequence + multiple sequence alignment
2. Build residue graph: Fully connected (or k-nearest neighbors in sequence)
3. GNN: Message passing to refine edge features (predict distances)
4. Output: 3D coordinates for each atom
\`\`\`

**Key innovation: Attention on edges (not just nodes)**
- Standard GNN: Update node features
- AlphaFold: Update **edge features** (predicted distances between residues)
- Edge features → 3D structure

**Results:**
- **Grand challenge solved:** 50-year problem in biology
- **Accuracy:** ~95% (comparable to experimental methods)
- **Impact:** 200M+ protein structures predicted (AlphaFold DB)

---

## Case Study 5: Drug Discovery (Molecule Property Prediction)

**Problem:** Predict toxicity, solubility, efficacy of drug candidates

**Why GNNs?**
- Molecule = Graph (atoms = nodes, bonds = edges)
- Molecular properties depend on structure + chemistry

**Architecture:**
\`\`\`python
class MoleculeGNN(nn.Module):
    def __init__(self, hidden_dim):
        super().__init__()
        # Node features: Atom type, charge, hybridization, etc.
        # Edge features: Bond type (single, double, aromatic), distance

        self.conv1 = NNConv(hidden_dim, hidden_dim, edge_nn=MLP(...))
        self.conv2 = NNConv(hidden_dim, hidden_dim, edge_nn=MLP(...))
        self.conv3 = NNConv(hidden_dim, hidden_dim, edge_nn=MLP(...))

        self.pool = global_mean_pool
        self.predictor = nn.Linear(hidden_dim, 1)  # Predict property

    def forward(self, molecule_batch):
        x = molecule_batch.x  # Atom features
        edge_index = molecule_batch.edge_index
        edge_attr = molecule_batch.edge_attr  # Bond features
        batch = molecule_batch.batch

        # GNN with edge features
        x = self.conv1(x, edge_index, edge_attr)
        x = F.relu(x)
        x = self.conv2(x, edge_index, edge_attr)
        x = F.relu(x)
        x = self.conv3(x, edge_index, edge_attr)

        # Pool to molecule-level
        x = self.pool(x, batch)

        # Predict property (e.g., toxicity score)
        return self.predictor(x)
\`\`\`

**Production Systems:**
- **Atomwise:** Drug discovery using GNNs
- **Recursion Pharmaceuticals:** High-throughput screening with GNNs
- **Insilico Medicine:** Generated novel drug candidates (now in clinical trials!)

**Impact:**
- Screen **millions of molecules** in days (vs years in lab)
- Discover novel drug scaffolds
- **First GNN-discovered drug entered Phase 1 trials (2021)**

---

## Key Takeaways for Production GNNs

**1. Scalability is critical:**
- Use inductive methods (GraphSAGE, FastGCN)
- Neighbor sampling (don't use full graph)
- Distributed training for billion-edge graphs

**2. Domain knowledge matters:**
- Feature engineering (node/edge features)
- Graph construction (what should be a node? edge?)
- Task-specific architectures

**3. Combine with other models:**
- GNN + RNN for temporal graphs
- GNN embeddings + XGBoost for final prediction
- GNN + Transformers for hybrid reasoning

**4. Evaluation beyond accuracy:**
- Latency (must be real-time for recommendations)
- Interpretability (attention weights, salient subgraphs)
- Fairness (avoid bias in social graphs)

**5. Infrastructure:**
- PyTorch Geometric, DGL (Deep Graph Library)
- GPU clusters for training
- FAISS, Annoy for nearest neighbor search
- MLOps: monitoring, versioning, A/B testing

---

## What You'll Build

In the upcoming code challenges, you'll implement:

1. **Full GNN from scratch** (message passing, aggregation, update)
2. **Graph classification** for molecules (predict toxicity)
3. **RAG with knowledge graph** (combine GNN + LLM)

You now understand both the **symbolic** side (KGs, ontologies, logic) and the **neural** side (GNNs, embeddings). Let's combine them into production neuro-symbolic systems!`,
    },
  ],
  summary: [
    'GNNs enable deep learning on graph-structured data through message passing',
    'Message passing: MESSAGE → AGGREGATE → UPDATE repeated for multiple layers',
    'GCN architecture: normalized aggregation with symmetric matrix multiplication',
    'Real-world GNNs: Pinterest PinSage (3B pins), Uber ETAs, DeepMind AlphaFold 2',
    'Production considerations: scalability, mini-batching, and evaluation beyond accuracy'
  ],
  nextSteps: [
    'Implement a full GCN from scratch in the code challenge',
    'Build a RAG system combining GNNs with LLMs',
    'Explore advanced GNN architectures (GAT, GraphSAGE)',
    'Study production GNN deployments at scale'
  ],
  checkYourUnderstanding: [
    {
      question: 'Why do traditional CNNs fail on graph data?',
      answer: 'CNNs assume fixed grid structure (regular neighborhood, fixed input size). Graphs have variable-degree nodes, no spatial ordering, and irregular structure. GNNs solve this with permutation-invariant aggregation.'
    },
    {
      question: 'What are the three steps of message passing in GNNs?',
      answer: '1) MESSAGE: neighbors send features. 2) AGGREGATE: combine via sum/mean/max/attention. 3) UPDATE: transform aggregated info with neural network. Repeat for multiple layers to capture multi-hop information.'
    },
    {
      question: 'How does Pinterest PinSage scale to 3 billion pins?',
      answer: 'Random walk sampling for mini-batches, MapReduce for offline inference, multi-GPU training, and efficient nearest neighbor search (FAISS). Achieves 150% engagement improvement over previous system.'
    },
    {
      question: 'What is the normalized adjacency matrix formula in GCN?',
      answer: 'D^{-1/2} (A + I) D^{-1/2}, where A is adjacency, I adds self-loops, D is degree matrix. Prevents gradient explosion and ensures stable learning across different graph structures.'
    }
  ]
};