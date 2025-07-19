#!/usr/bin/env python3

from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
import uuid

@dataclass
class ThoughtNode:
    id: str
    content: str
    score: float
    children: List['ThoughtNode'] = field(default_factory=list)
    parent: Optional['ThoughtNode'] = None
    depth: int = 0

class TreeOfThoughtPlanner:
    def __init__(self, root_problem: str):
        self.root = ThoughtNode(
            id='root',
            content=root_problem,
            score=0.0,
            depth=0
        )
        self.best_path: List[ThoughtNode] = []
    
    def add_thought(self, parent_id: str, content: str, score: float) -> str:
        """Add a new thought node to the tree."""
        parent = self._find_node(self.root, parent_id)
        if not parent:
            raise ValueError(f"Parent node {parent_id} not found")
        
        new_id = f"{parent_id}-{len(parent.children) + 1}"
        new_node = ThoughtNode(
            id=new_id,
            content=content,
            score=score,
            parent=parent,
            depth=parent.depth + 1
        )
        
        parent.children.append(new_node)
        return new_id
    
    def _find_node(self, node: ThoughtNode, node_id: str) -> Optional[ThoughtNode]:
        """Find a node by ID in the tree."""
        if node.id == node_id:
            return node
        
        for child in node.children:
            found = self._find_node(child, node_id)
            if found:
                return found
        
        return None
    
    def find_best_path(self) -> List[ThoughtNode]:
        """Find the path with the highest average score."""
        self.best_path = []
        self._explore_path(self.root, [])
        return self.best_path
    
    def _explore_path(self, node: ThoughtNode, current_path: List[ThoughtNode]):
        """Recursively explore all paths to find the best one."""
        new_path = current_path + [node]
        
        if not node.children:  # Leaf node
            path_score = sum(n.score for n in new_path) / len(new_path) if new_path else 0
            best_score = sum(n.score for n in self.best_path) / len(self.best_path) if self.best_path else 0
            
            if path_score > best_score:
                self.best_path = new_path.copy()
            return
        
        # Sort children by score and explore best ones first
        sorted_children = sorted(node.children, key=lambda x: x.score, reverse=True)
        
        for child in sorted_children:
            self._explore_path(child, new_path)
    
    def print_tree(self, node: Optional[ThoughtNode] = None, prefix: str = ''):
        """Print the tree structure."""
        if node is None:
            node = self.root
        
        print(f"{prefix}{node.content} (score: {node.score})")
        
        for i, child in enumerate(node.children):
            is_last = i == len(node.children) - 1
            child_prefix = prefix + ('└─ ' if is_last else '├─ ')
            next_prefix = prefix + ('   ' if is_last else '│  ')
            
            print(f"{child_prefix}{child.content} (score: {child.score})")
            
            if child.children:
                self._print_subtree(child, next_prefix)
    
    def _print_subtree(self, node: ThoughtNode, prefix: str):
        """Helper method to print subtree."""
        for i, child in enumerate(node.children):
            is_last = i == len(node.children) - 1
            child_prefix = prefix + ('└─ ' if is_last else '├─ ')
            next_prefix = prefix + ('   ' if is_last else '│  ')
            
            print(f"{child_prefix}{child.content} (score: {child.score})")
            
            if child.children:
                self._print_subtree(child, next_prefix)
    
    def get_path_to_node(self, node_id: str) -> List[ThoughtNode]:
        """Get the path from root to a specific node."""
        node = self._find_node(self.root, node_id)
        if not node:
            return []
        
        path = []
        current = node
        while current:
            path.insert(0, current)
            current = current.parent
        
        return path
    
    def prune_low_score_branches(self, threshold: float):
        """Remove branches with scores below threshold."""
        self._prune_recursive(self.root, threshold)
    
    def _prune_recursive(self, node: ThoughtNode, threshold: float):
        """Recursively prune branches."""
        node.children = [child for child in node.children if child.score >= threshold]
        for child in node.children:
            self._prune_recursive(child, threshold)

class TravelPlanner(TreeOfThoughtPlanner):
    """Specialized planner for travel planning."""
    
    def __init__(self, destination: str, budget: float, days: int):
        super().__init__(f"Plan a {days}-day trip to {destination} with a ${budget} budget")
        self.destination = destination
        self.budget = budget
        self.days = days
    
    def generate_travel_options(self):
        """Generate comprehensive travel options."""
        # Main strategy branches
        budget_focused = self.add_thought('root', 'Budget-focused path', 7.0)
        experience_focused = self.add_thought('root', 'Experience-focused path', 6.0)
        balanced = self.add_thought('root', 'Balanced path', 9.0)
        
        # Budget-focused sub-options
        self.add_thought(budget_focused, 'Hostels + street food', 8.0)
        self.add_thought(budget_focused, 'Airbnb + cooking', 7.5)
        self.add_thought(budget_focused, 'Couchsurfing + local markets', 6.5)
        
        # Experience-focused sub-options
        self.add_thought(experience_focused, 'Luxury hotels + fine dining', 4.0)
        self.add_thought(experience_focused, 'Mid-range hotel + restaurants', 5.5)
        self.add_thought(experience_focused, 'Boutique hotel + local experiences', 7.0)
        
        # Balanced sub-options
        budget_hotel = self.add_thought(balanced, 'Budget hotel', 8.0)
        dining_mix = self.add_thought(balanced, 'Mix of dining options', 9.0)
        attractions = self.add_thought(balanced, 'Free/low-cost attractions', 9.5)
        
        # Further detail for balanced approach
        self.add_thought(budget_hotel, '2-3 star hotels in good locations', 8.5)
        self.add_thought(dining_mix, '70% local food, 30% restaurants', 9.2)
        self.add_thought(attractions, 'Walking tours, museums, parks', 9.8)

def main():
    # Basic example
    planner = TreeOfThoughtPlanner("Plan a 3-day trip to Paris with a $1000 budget")
    
    # Build the thought tree
    budget_focused = planner.add_thought('root', 'Budget-focused path', 7.0)
    experience_focused = planner.add_thought('root', 'Experience-focused path', 6.0)
    balanced = planner.add_thought('root', 'Balanced path', 9.0)
    
    # Budget-focused branches
    planner.add_thought(budget_focused, 'Hostels + street food', 8.0)
    planner.add_thought(budget_focused, 'Airbnb + cooking', 7.0)
    
    # Experience-focused branches
    planner.add_thought(experience_focused, 'Mid-range hotel + restaurants', 5.0)
    planner.add_thought(experience_focused, 'Budget hotel + select dining', 7.0)
    
    # Balanced branches
    planner.add_thought(balanced, 'Budget hotel', 8.0)
    planner.add_thought(balanced, 'Mix of dining options', 9.0)
    planner.add_thought(balanced, 'Free/low-cost attractions', 9.0)
    
    print("Tree of Thought Structure:")
    planner.print_tree()
    
    print("\nBest path:")
    best_path = planner.find_best_path()
    for i, node in enumerate(best_path):
        print(f"{i + 1}. {node.content} (score: {node.score})")
    
    print("\n" + "="*50 + "\n")
    
    # Advanced travel planner example
    travel_planner = TravelPlanner("Tokyo", 1500, 5)
    travel_planner.generate_travel_options()
    
    print("Advanced Travel Planning Tree:")
    travel_planner.print_tree()
    
    print("\nOptimal travel plan:")
    optimal_path = travel_planner.find_best_path()
    for i, node in enumerate(optimal_path):
        print(f"{i + 1}. {node.content} (score: {node.score})")

if __name__ == "__main__":
    main()