'use client';

import React, { useState, useCallback, useEffect } from 'react';

interface IterationStep {
  id: number;
  content: string;
  qualityScore: number;
  feedback: string[];
  improvements: string[];
  timestamp: Date;
}

const QUALITY_THRESHOLDS = {
  EXCELLENT: 9,
  GOOD: 7,
  ACCEPTABLE: 5,
  POOR: 3
};

const SAMPLE_TOPICS = [
  "Write a product description for wireless headphones",
  "Create a social media post about sustainable living",
  "Draft an email to announce a company policy change",
  "Write a blog introduction about AI in healthcare"
];

export const FeedbackChainingDemo: React.FC = () => {
  const [topic, setTopic] = useState(SAMPLE_TOPICS[0]);
  const [iterations, setIterations] = useState<IterationStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [targetQuality, setTargetQuality] = useState(8);
  const [maxIterations, setMaxIterations] = useState(5);

  // Simulate content generation with varying quality based on topic and iteration
  const generateContent = useCallback((prompt: string, iterationNum: number): string => {
    const contentMap: { [key: string]: string[] } = {
      "Write a product description for wireless headphones": [
        "This product is good. You should buy it. It works well and people like it.",
        "Our wireless headphones offer excellent sound quality with advanced noise cancellation technology, providing users with an immersive audio experience.",
        "Experience premium audio with our wireless headphones featuring industry-leading active noise cancellation, 30-hour battery life, and Hi-Res Audio certification. The lightweight design ensures all-day comfort while Bluetooth 5.2 connectivity delivers seamless pairing across all your devices.",
        "Transform your listening experience with our flagship wireless headphones. Engineered with precision-tuned 40mm drivers and industry-leading active noise cancellation, they deliver studio-quality sound that reveals every detail in your music. The premium materials and ergonomic design provide exceptional comfort during extended use, while the impressive 30-hour battery life keeps you connected all day. Whether you're commuting, working, or relaxing, these headphones adapt to your lifestyle with intuitive touch controls and seamless multi-device connectivity."
      ],
      "Create a social media post about sustainable living": [
        "Be green. Save planet. Good for environment.",
        "Living sustainably is important for our future. Make eco-friendly choices every day to help protect the environment.",
        "🌱 Embrace sustainable living! Small changes create big impact: choose reusable products, support local businesses, reduce energy consumption, and make mindful purchases. Every sustainable choice contributes to a healthier planet for future generations. #SustainableLiving #EcoFriendly",
        "🌍 Transform your lifestyle, transform the world! ✨ Sustainable living isn't just a trend—it's our responsibility. From composting kitchen scraps to choosing renewable energy, every conscious decision ripples outward. Join millions making the shift to eco-conscious living. Your planet, your children, your future—they're all counting on the choices you make today. 🌱💚 #SustainableLife #ClimateAction #GreenLiving"
      ],
      "Draft an email to announce a company policy change": [
        "Hi everyone. We have new policy. Please follow it. Thanks.",
        "Dear Team, We are implementing a new company policy effective immediately. Please review the attached document and ensure compliance. Thank you for your cooperation.",
        "Dear Team Members, I hope this message finds you well. We're writing to inform you of an important policy update that will enhance our workplace efficiency and employee satisfaction. The new flexible work arrangement policy, effective next month, offers expanded remote work options and flexible scheduling. Please review the detailed guidelines in the attached document and feel free to reach out with any questions.",
        "Subject: Exciting Policy Update - Enhanced Work Flexibility Program 🎉\n\nDear Valued Team Members,\n\nI'm thrilled to announce a significant enhancement to our workplace policies that reflects our commitment to work-life balance and employee well-being. Effective [Date], we're launching our Enhanced Work Flexibility Program, designed with your feedback and evolving work preferences in mind.\n\n✨ What's New:\n• Expanded remote work eligibility\n• Flexible core hours (10 AM - 3 PM)\n• Results-focused performance metrics\n• Enhanced home office support\n\nThis policy demonstrates our trust in your professionalism and dedication while supporting your personal and professional growth. Please review the comprehensive guide attached and join us for the Q&A session on [Date].\n\nThank you for making our company a place where innovation and flexibility thrive.\n\nBest regards,\n[Name]"
      ],
      "Write a blog introduction about AI in healthcare": [
        "AI is changing healthcare. It helps doctors and is good for patients.",
        "Artificial intelligence is revolutionizing the healthcare industry by providing advanced diagnostic tools and improving patient outcomes through data-driven insights.",
        "The intersection of artificial intelligence and healthcare represents one of the most promising frontiers in modern medicine. From diagnostic imaging that can detect diseases earlier than human specialists to predictive algorithms that anticipate patient complications, AI is transforming how we approach healthcare delivery, making it more precise, efficient, and accessible to patients worldwide.",
        "In the sterile corridors of modern hospitals, a quiet revolution is unfolding—one powered not by stethoscopes or surgical instruments, but by algorithms and neural networks. Artificial intelligence has emerged as healthcare's most transformative ally, capable of analyzing millions of medical images in seconds, predicting patient deterioration before symptoms appear, and personalizing treatment plans with unprecedented precision. As we stand at the confluence of computational power and medical expertise, we're witnessing the dawn of an era where AI doesn't just assist healthcare—it amplifies human healing potential, democratizes expert-level care, and transforms the very definition of what's possible in medicine."
      ]
    };

    const variants = contentMap[prompt] || contentMap["Write a product description for wireless headphones"];
    const variantIndex = Math.min(iterationNum - 1, variants.length - 1);
    return variants[variantIndex];
  }, []);

  // Simulate quality scoring based on content characteristics
  const evaluateQuality = useCallback((content: string): number => {
    let score = 2; // Base score
    
    // Length and detail
    if (content.length > 100) score += 1;
    if (content.length > 200) score += 1;
    if (content.length > 300) score += 1;
    
    // Specific features
    if (content.includes('noise cancellation') || content.includes('battery')) score += 0.5;
    if (content.includes('Bluetooth') || content.includes('connectivity')) score += 0.5;
    if (content.includes('comfort') || content.includes('ergonomic')) score += 0.5;
    if (content.includes('premium') || content.includes('quality')) score += 0.5;
    
    // Professional language
    if (content.includes('experience') || content.includes('delivers')) score += 0.5;
    if (content.includes('advanced') || content.includes('precision')) score += 0.5;
    
    // Add some randomness for realism
    score += (Math.random() - 0.5) * 0.8;
    
    return Math.min(Math.max(Math.round(score * 10) / 10, 1), 10);
  }, []);

  // Generate feedback based on quality score and content
  const generateFeedback = useCallback((content: string, score: number): string[] => {
    const feedback: string[] = [];
    
    if (score < QUALITY_THRESHOLDS.POOR) {
      feedback.push("Content is too generic and lacks specific details");
      feedback.push("Missing key product features and benefits");
      feedback.push("Language is too casual for professional use");
    } else if (score < QUALITY_THRESHOLDS.ACCEPTABLE) {
      feedback.push("Good start but needs more compelling language");
      feedback.push("Add more specific technical details");
      feedback.push("Include emotional appeal and user benefits");
    } else if (score < QUALITY_THRESHOLDS.GOOD) {
      feedback.push("Content is informative but could be more engaging");
      feedback.push("Consider adding sensory language and lifestyle context");
      feedback.push("Structure could be improved for better flow");
    } else if (score < QUALITY_THRESHOLDS.EXCELLENT) {
      feedback.push("Nearly excellent! Minor refinements needed");
      feedback.push("Consider enhancing the emotional connection");
      feedback.push("Polish the conclusion for stronger impact");
    } else {
      feedback.push("Excellent quality achieved!");
      feedback.push("Content meets all criteria for engagement and information");
    }
    
    return feedback;
  }, []);

  // Generate improvement suggestions
  const generateImprovements = useCallback((content: string, feedback: string[]): string[] => {
    const improvements: string[] = [];
    
    if (feedback.some(f => f.includes('generic'))) {
      improvements.push("Add specific product features and technical specifications");
    }
    if (feedback.some(f => f.includes('compelling'))) {
      improvements.push("Use more vivid and persuasive language");
    }
    if (feedback.some(f => f.includes('engaging'))) {
      improvements.push("Include user scenarios and emotional benefits");
    }
    if (feedback.some(f => f.includes('structure'))) {
      improvements.push("Reorganize content for better logical flow");
    }
    if (feedback.some(f => f.includes('emotional'))) {
      improvements.push("Strengthen the emotional appeal and user connection");
    }
    
    return improvements;
  }, []);

  const runFeedbackLoop = useCallback(async () => {
    setIsRunning(true);
    setIterations([]);
    setCurrentIteration(0);

    let currentContent = "";
    let currentScore = 0;
    let iterationCount = 0;

    const newIterations: IterationStep[] = [];

    while (iterationCount < maxIterations && currentScore < targetQuality) {
      iterationCount++;
      setCurrentIteration(iterationCount);

      // Generate content
      currentContent = generateContent(topic, iterationCount);
      
      // Evaluate quality
      currentScore = evaluateQuality(currentContent);
      
      // Generate feedback and improvements
      const feedback = generateFeedback(currentContent, currentScore);
      const improvements = generateImprovements(currentContent, feedback);

      const step: IterationStep = {
        id: iterationCount,
        content: currentContent,
        qualityScore: currentScore,
        feedback,
        improvements,
        timestamp: new Date()
      };

      newIterations.push(step);
      setIterations([...newIterations]);

      // Add delay for visualization
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (currentScore >= targetQuality) {
        break;
      }
    }

    setIsRunning(false);
  }, [topic, targetQuality, maxIterations, generateContent, evaluateQuality, generateFeedback, generateImprovements]);

  const getQualityColor = (score: number) => {
    if (score >= QUALITY_THRESHOLDS.EXCELLENT) return 'text-green-600';
    if (score >= QUALITY_THRESHOLDS.GOOD) return 'text-blue-600';
    if (score >= QUALITY_THRESHOLDS.ACCEPTABLE) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityBadge = (score: number) => {
    if (score >= QUALITY_THRESHOLDS.EXCELLENT) return 'bg-green-100 text-green-800';
    if (score >= QUALITY_THRESHOLDS.GOOD) return 'bg-blue-100 text-blue-800';
    if (score >= QUALITY_THRESHOLDS.ACCEPTABLE) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🔄</span>
          Feedback Chaining Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch as content iteratively improves through feedback loops until it reaches the target quality threshold.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_TOPICS.map((t, index) => (
                <option key={index} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Quality (1-10)
            </label>
            <input
              type="range"
              min="5"
              max="10"
              step="0.5"
              value={targetQuality}
              onChange={(e) => setTargetQuality(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{targetQuality}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Max Iterations
            </label>
            <input
              type="range"
              min="3"
              max="8"
              value={maxIterations}
              onChange={(e) => setMaxIterations(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{maxIterations}</div>
          </div>
        </div>

        <button
          onClick={runFeedbackLoop}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isRunning ? `Running... (Iteration ${currentIteration})` : 'Start Feedback Loop'}
        </button>
      </div>

      {/* Iterations Display */}
      {iterations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Feedback Loop Progress</h3>
          
          {iterations.map((iteration, index) => (
            <div
              key={iteration.id}
              className={`border rounded-lg p-6 transition-all ${
                index === iterations.length - 1 && isRunning
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-gray-600 bg-gray-800/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white">
                  Iteration {iteration.id}
                </h4>
                <div className="flex items-center space-x-4">
                  <span className={`text-2xl font-bold ${getQualityColor(iteration.qualityScore)}`}>
                    {iteration.qualityScore}/10
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityBadge(iteration.qualityScore)}`}>
                    {iteration.qualityScore >= QUALITY_THRESHOLDS.EXCELLENT ? 'Excellent' :
                     iteration.qualityScore >= QUALITY_THRESHOLDS.GOOD ? 'Good' :
                     iteration.qualityScore >= QUALITY_THRESHOLDS.ACCEPTABLE ? 'Acceptable' : 'Needs Work'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Generated Content */}
                <div className="lg:col-span-1">
                  <h5 className="font-medium text-gray-300 mb-2">Generated Content</h5>
                  <div className="bg-gray-800/40 p-4 rounded border border-gray-600/50 text-sm text-gray-200">
                    {iteration.content}
                  </div>
                </div>

                {/* Feedback */}
                <div className="lg:col-span-1">
                  <h5 className="font-medium text-gray-300 mb-2">Feedback</h5>
                  <ul className="space-y-2">
                    {iteration.feedback.map((fb, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-300">{fb}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="lg:col-span-1">
                  <h5 className="font-medium text-gray-300 mb-2">Suggested Improvements</h5>
                  <ul className="space-y-2">
                    {iteration.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-blue-400 mr-2">→</span>
                        <span className="text-gray-300">{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {iteration.qualityScore >= targetQuality && (
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <span className="text-green-800 font-medium">
                    ✅ Target quality achieved! Loop completed.
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Summary */}
          {!isRunning && iterations.length > 0 && (
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/50">
              <h4 className="font-medium text-white mb-3">Loop Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-300">Total Iterations:</span> <span className="text-white">{iterations.length}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-300">Final Quality Score:</span>{' '}
                  <span className={getQualityColor(iterations[iterations.length - 1]?.qualityScore || 0)}>
                    {iterations[iterations.length - 1]?.qualityScore || 0}/10
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-300">Target Achieved:</span>{' '}
                  <span className={
                    (iterations[iterations.length - 1]?.qualityScore || 0) >= targetQuality
                      ? 'text-green-400' : 'text-red-400'
                  }>
                    {(iterations[iterations.length - 1]?.qualityScore || 0) >= targetQuality ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackChainingDemo;