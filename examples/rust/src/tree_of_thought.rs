use std::collections::HashMap;
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct ThoughtNode {
    pub id: String,
    pub content: String,
    pub score: f64,
    pub children: Vec<String>,
    pub parent: Option<String>,
    pub depth: usize,
}

impl ThoughtNode {
    pub fn new(content: String, score: f64, parent: Option<String>, depth: usize) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            content,
            score,
            children: Vec::new(),
            parent,
            depth,
        }
    }
}

pub struct TreeOfThoughtPlanner {
    nodes: HashMap<String, ThoughtNode>,
    root_id: String,
    best_path: Vec<String>,
}

impl TreeOfThoughtPlanner {
    pub fn new(root_problem: &str) -> Self {
        let root_node = ThoughtNode::new(root_problem.to_string(), 0.0, None, 0);
        let root_id = root_node.id.clone();
        
        let mut nodes = HashMap::new();
        nodes.insert(root_id.clone(), root_node);
        
        Self {
            nodes,
            root_id,
            best_path: Vec::new(),
        }
    }

    pub fn add_thought(&mut self, parent_id: &str, content: &str, score: f64) -> Result<String, String> {
        let parent = self.nodes.get_mut(parent_id)
            .ok_or_else(|| format!("Parent node {} not found", parent_id))?;
        
        let depth = parent.depth + 1;
        let new_node = ThoughtNode::new(content.to_string(), score, Some(parent_id.to_string()), depth);
        let new_id = new_node.id.clone();
        
        parent.children.push(new_id.clone());
        self.nodes.insert(new_id.clone(), new_node);
        
        Ok(new_id)
    }

    pub fn find_best_path(&mut self) -> Vec<String> {
        self.best_path.clear();
        self.explore_path(&self.root_id, Vec::new());
        self.best_path.clone()
    }

    fn explore_path(&mut self, node_id: &str, current_path: Vec<String>) {
        let mut new_path = current_path;
        new_path.push(node_id.to_string());
        
        let node = self.nodes.get(node_id).unwrap();
        
        if node.children.is_empty() {
            // Leaf node - evaluate path
            let path_score = self.calculate_path_score(&new_path);
            let best_score = self.calculate_path_score(&self.best_path);
            
            if path_score > best_score || self.best_path.is_empty() {
                self.best_path = new_path;
            }
            return;
        }

        // Sort children by score and explore best ones first
        let mut sorted_children: Vec<_> = node.children.iter().collect();
        sorted_children.sort_by(|a, b| {
            let score_a = self.nodes.get(*a).unwrap().score;
            let score_b = self.nodes.get(*b).unwrap().score;
            score_b.partial_cmp(&score_a).unwrap()
        });
        
        for child_id in sorted_children {
            self.explore_path(child_id, new_path.clone());
        }
    }

    fn calculate_path_score(&self, path: &[String]) -> f64 {
        if path.is_empty() {
            return 0.0;
        }
        
        let total_score: f64 = path.iter()
            .map(|id| self.nodes.get(id).unwrap().score)
            .sum();
        
        total_score / path.len() as f64
    }

    pub fn print_tree(&self) {
        println!("{}", self.format_tree(&self.root_id, ""));
    }

    fn format_tree(&self, node_id: &str, prefix: &str) -> String {
        let node = self.nodes.get(node_id).unwrap();
        let mut result = format!("{}{} (score: {})\n", prefix, node.content, node.score);
        
        for (i, child_id) in node.children.iter().enumerate() {
            let is_last = i == node.children.len() - 1;
            let child_prefix = format!("{}{}", prefix, if is_last { "└─ " } else { "├─ " });
            let next_prefix = format!("{}{}", prefix, if is_last { "   " } else { "│  " });
            
            let child = self.nodes.get(child_id).unwrap();
            result.push_str(&format!("{}{} (score: {})\n", child_prefix, child.content, child.score));
            
            if !child.children.is_empty() {
                result.push_str(&self.format_subtree(child_id, &next_prefix));
            }
        }
        
        result
    }

    fn format_subtree(&self, node_id: &str, prefix: &str) -> String {
        let node = self.nodes.get(node_id).unwrap();
        let mut result = String::new();
        
        for (i, child_id) in node.children.iter().enumerate() {
            let is_last = i == node.children.len() - 1;
            let child_prefix = format!("{}{}", prefix, if is_last { "└─ " } else { "├─ " });
            let next_prefix = format!("{}{}", prefix, if is_last { "   " } else { "│  " });
            
            let child = self.nodes.get(child_id).unwrap();
            result.push_str(&format!("{}{} (score: {})\n", child_prefix, child.content, child.score));
            
            if !child.children.is_empty() {
                result.push_str(&self.format_subtree(child_id, &next_prefix));
            }
        }
        
        result
    }

    pub fn get_path_to_node(&self, node_id: &str) -> Vec<String> {
        let mut path = Vec::new();
        let mut current_id = Some(node_id.to_string());
        
        while let Some(id) = current_id {
            path.insert(0, id.clone());
            current_id = self.nodes.get(&id).unwrap().parent.clone();
        }
        
        path
    }

    pub fn prune_low_score_branches(&mut self, threshold: f64) {
        let node_ids: Vec<_> = self.nodes.keys().cloned().collect();
        
        for node_id in node_ids {
            if let Some(node) = self.nodes.get_mut(&node_id) {
                node.children.retain(|child_id| {
                    if let Some(child) = self.nodes.get(child_id) {
                        child.score >= threshold
                    } else {
                        false
                    }
                });
            }
        }
    }
}

pub struct TravelPlanner {
    planner: TreeOfThoughtPlanner,
    destination: String,
    budget: f64,
    days: u32,
}

impl TravelPlanner {
    pub fn new(destination: &str, budget: f64, days: u32) -> Self {
        let problem = format!("Plan a {}-day trip to {} with a ${} budget", days, destination, budget);
        let planner = TreeOfThoughtPlanner::new(&problem);
        
        Self {
            planner,
            destination: destination.to_string(),
            budget,
            days,
        }
    }

    pub fn generate_travel_options(&mut self) -> Result<(), String> {
        // Main strategy branches
        let budget_focused = self.planner.add_thought(&self.planner.root_id, "Budget-focused path", 7.0)?;
        let experience_focused = self.planner.add_thought(&self.planner.root_id, "Experience-focused path", 6.0)?;
        let balanced = self.planner.add_thought(&self.planner.root_id, "Balanced path", 9.0)?;
        
        // Budget-focused sub-options
        self.planner.add_thought(&budget_focused, "Hostels + street food", 8.0)?;
        self.planner.add_thought(&budget_focused, "Airbnb + cooking", 7.5)?;
        self.planner.add_thought(&budget_focused, "Couchsurfing + local markets", 6.5)?;
        
        // Experience-focused sub-options
        self.planner.add_thought(&experience_focused, "Luxury hotels + fine dining", 4.0)?;
        self.planner.add_thought(&experience_focused, "Mid-range hotel + restaurants", 5.5)?;
        self.planner.add_thought(&experience_focused, "Boutique hotel + local experiences", 7.0)?;
        
        // Balanced sub-options
        let budget_hotel = self.planner.add_thought(&balanced, "Budget hotel", 8.0)?;
        let dining_mix = self.planner.add_thought(&balanced, "Mix of dining options", 9.0)?;
        let attractions = self.planner.add_thought(&balanced, "Free/low-cost attractions", 9.5)?;
        
        // Further detail for balanced approach
        self.planner.add_thought(&budget_hotel, "2-3 star hotels in good locations", 8.5)?;
        self.planner.add_thought(&dining_mix, "70% local food, 30% restaurants", 9.2)?;
        self.planner.add_thought(&attractions, "Walking tours, museums, parks", 9.8)?;
        
        Ok(())
    }

    pub fn find_best_path(&mut self) -> Vec<String> {
        self.planner.find_best_path()
    }

    pub fn print_tree(&self) {
        self.planner.print_tree();
    }

    pub fn get_node_content(&self, node_id: &str) -> Option<&str> {
        self.planner.nodes.get(node_id).map(|node| node.content.as_str())
    }

    pub fn get_node_score(&self, node_id: &str) -> Option<f64> {
        self.planner.nodes.get(node_id).map(|node| node.score)
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Basic example
    let mut planner = TreeOfThoughtPlanner::new("Plan a 3-day trip to Paris with a $1000 budget");
    
    // Build the thought tree
    let budget_focused = planner.add_thought(&planner.root_id, "Budget-focused path", 7.0)?;
    let experience_focused = planner.add_thought(&planner.root_id, "Experience-focused path", 6.0)?;
    let balanced = planner.add_thought(&planner.root_id, "Balanced path", 9.0)?;
    
    // Budget-focused branches
    planner.add_thought(&budget_focused, "Hostels + street food", 8.0)?;
    planner.add_thought(&budget_focused, "Airbnb + cooking", 7.0)?;
    
    // Experience-focused branches
    planner.add_thought(&experience_focused, "Mid-range hotel + restaurants", 5.0)?;
    planner.add_thought(&experience_focused, "Budget hotel + select dining", 7.0)?;
    
    // Balanced branches
    planner.add_thought(&balanced, "Budget hotel", 8.0)?;
    planner.add_thought(&balanced, "Mix of dining options", 9.0)?;
    planner.add_thought(&balanced, "Free/low-cost attractions", 9.0)?;
    
    println!("Tree of Thought Structure:");
    planner.print_tree();
    
    println!("Best path:");
    let best_path = planner.find_best_path();
    for (i, node_id) in best_path.iter().enumerate() {
        let node = planner.nodes.get(node_id).unwrap();
        println!("{}. {} (score: {})", i + 1, node.content, node.score);
    }
    
    println!("\n{}", "=".repeat(50));
    println!();
    
    // Advanced travel planner example
    let mut travel_planner = TravelPlanner::new("Tokyo", 1500.0, 5);
    travel_planner.generate_travel_options()?;
    
    println!("Advanced Travel Planning Tree:");
    travel_planner.print_tree();
    
    println!("Optimal travel plan:");
    let optimal_path = travel_planner.find_best_path();
    for (i, node_id) in optimal_path.iter().enumerate() {
        if let (Some(content), Some(score)) = (
            travel_planner.get_node_content(node_id),
            travel_planner.get_node_score(node_id)
        ) {
            println!("{}. {} (score: {})", i + 1, content, score);
        }
    }
    
    Ok(())
}