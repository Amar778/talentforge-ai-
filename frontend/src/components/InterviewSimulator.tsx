'use client';

import React, { useState } from 'react';
import { MockInterviewScenario, InterviewQuestion, InterviewFeedback } from '../app/types';
import { interviewScenarios, sampleInterviewQuestions } from '../app/mockData';
import { 
  Bot, Mic, Play, Pause, Send, Lightbulb, 
  Award, CheckCircle, BarChart3, RefreshCw, Volume2, ShieldCheck, Sparkles 
} from 'lucide-react';

interface InterviewSimulatorProps {
  onUseCredits: (amount: number) => void;
}

export const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({ onUseCredits }) => {
  const [selectedScenario, setSelectedScenario] = useState<MockInterviewScenario | null>(interviewScenarios[0]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answersMap, setAnswersMap] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackScorecard, setFeedbackScorecard] = useState<InterviewFeedback | null>(null);

  const questions: InterviewQuestion[] = selectedScenario ? sampleInterviewQuestions[selectedScenario.id] || sampleInterviewQuestions["tech-lead-ai"] : [];
  const currentQuestion = questions[currentQuestionIdx];

  const handleStartSession = () => {
    setIsSessionActive(true);
    setCurrentQuestionIdx(0);
    setAnswersMap({});
    setUserAnswer('');
    setFeedbackScorecard(null);
    onUseCredits(100);
  };

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate speech-to-text transcript
      setTimeout(() => {
        setUserAnswer((prev) => 
          prev ? prev + " I would use Server-Sent Events with a throttled dynamic buffer to render LLM responses safely." : "I would use Server-Sent Events (SSE) with a custom streaming buffer to render LLM responses efficiently without layout thrashing."
        );
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    setAnswersMap({ ...answersMap, [currentQuestion.id]: userAnswer });
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setUserAnswer(answersMap[questions[currentQuestionIdx + 1]?.id] || '');
      setShowHint(false);
    } else {
      // Generate AI Evaluation Scorecard
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setFeedbackScorecard({
          technicalScore: 92,
          communicationScore: 88,
          structureScore: 90,
          overallScore: 90,
          strengths: [
            "Strong architectural understanding of SSE stream buffering and frontend event loops.",
            "Clear articulation of debouncing strategies for layout rendering stability.",
            "Effective use of real-world metrics when describing performance optimizations."
          ],
          areasToImprove: [
            "Elaborate more on error handling fallbacks when network disconnects occur during active stream payloads."
          ],
          improvedSampleAnswer: "To architect a low-latency LLM streaming UI: 1) Establish a persistent SSE or WebSocket connection, 2) Append incoming chunk tokens into an un-rendered FIFO buffer, 3) Flush the buffer to React state on a 60fps animation frame request, 4) Handle reconnection gracefully with state snapshot recovery."
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Real-Time AI Interview Simulator</span>
          </div>
          <h2 className="text-2xl font-bold text-white">AI Behavioral & Technical Mock Interviewer</h2>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Simulate realistic technical and behavioral interviews with immediate AI feedback, STAR structure evaluation, and speech analysis.
          </p>
        </div>
      </div>

      {!isSessionActive && !feedbackScorecard ? (
        /* Scenario Selection Grid */
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Select Your Interview Track</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interviewScenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`glass-card glass-card-hover p-6 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-4 ${
                  selectedScenario?.id === scenario.id
                    ? 'border-purple-500 bg-purple-950/30'
                    : 'border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-2.5 py-1 rounded-full border border-purple-500/30 font-medium">
                      {scenario.category}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{scenario.difficulty}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">{scenario.roleTitle}</h4>
                  <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed">{scenario.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>{scenario.totalQuestions} Questions</span>
                  <span>~{scenario.estimatedTimeMinutes} Mins</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleStartSession}
              disabled={!selectedScenario}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Launch AI Interview Session (100 Credits)</span>
            </button>
          </div>
        </div>
      ) : isSubmitting ? (
        /* Evaluation Loading */
        <div className="glass-card p-12 rounded-2xl text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
          <h3 className="text-xl font-bold text-white">Analyzing Your Answers...</h3>
          <p className="text-sm text-gray-400">Evaluating technical accuracy, STAR method structure, and communication clarity.</p>
        </div>
      ) : feedbackScorecard ? (
        /* Post-Interview Scorecard */
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-4">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Evaluation Completed</span>
                <h3 className="text-2xl font-bold text-white">Interview Performance Scorecard</h3>
              </div>
              
              <div className="flex items-center space-x-2 bg-emerald-950/80 px-4 py-2 rounded-xl border border-emerald-500/30">
                <Award className="w-6 h-6 text-emerald-400" />
                <div>
                  <span className="text-xs text-gray-400 block">Overall Rating</span>
                  <span className="text-xl font-extrabold text-emerald-400">{feedbackScorecard.overallScore}/100</span>
                </div>
              </div>
            </div>

            {/* Score Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 text-center">
                <span className="text-xs text-gray-400 block">Technical Accuracy</span>
                <span className="text-2xl font-bold text-purple-400 mt-1 block">{feedbackScorecard.technicalScore}%</span>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 text-center">
                <span className="text-xs text-gray-400 block">Communication Clarity</span>
                <span className="text-2xl font-bold text-indigo-400 mt-1 block">{feedbackScorecard.communicationScore}%</span>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 text-center">
                <span className="text-xs text-gray-400 block">STAR Structure</span>
                <span className="text-2xl font-bold text-pink-400 mt-1 block">{feedbackScorecard.structureScore}%</span>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Key Strengths</span>
                </h4>
                <div className="space-y-2">
                  {feedbackScorecard.strengths.map((str, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-white/5 text-xs text-gray-200">
                      {str}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Areas to Refine</span>
                </h4>
                <div className="space-y-2">
                  {feedbackScorecard.areasToImprove.map((area, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-white/5 text-xs text-gray-200">
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ideal Sample Answer */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-2">
              <span className="text-xs font-bold text-purple-300 block">AI Optimized Model Answer</span>
              <p className="text-xs text-gray-300 leading-relaxed italic">{feedbackScorecard.improvedSampleAnswer}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => { setFeedbackScorecard(null); setIsSessionActive(false); }}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-white/10"
              >
                Return to Interview Tracks
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* Active Interview Simulator Room */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: AI Avatar & Question Stream */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* AI Avatar Video / Audio Box */}
            <div className="glass-card p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-b from-slate-900 via-purple-950/20 to-slate-950 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white ring-4 ring-purple-500/20">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">AI Interviewer Persona</h3>
                    <span className="text-xs text-emerald-400 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                      <span>Live Simulation Active</span>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-purple-300 font-medium">
                  Question {currentQuestionIdx + 1} of {questions.length}
                </div>
              </div>

              {/* Dynamic Question Display */}
              <div className="p-5 bg-purple-950/30 border border-purple-500/30 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Category: {currentQuestion.category}
                </span>
                <p className="text-base font-semibold text-white leading-relaxed">
                  "{currentQuestion.question}"
                </p>
              </div>

              {/* Hint Accordion */}
              <div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>{showHint ? "Hide Answer Strategy Hint" : "Show Answer Strategy Hint"}</span>
                </button>
                {showHint && (
                  <div className="mt-2 p-3 bg-slate-900/90 rounded-lg border border-white/10 text-xs text-gray-300">
                    {currentQuestion.hint}
                  </div>
                )}
              </div>
            </div>

            {/* Candidate Answer Input */}
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-300">Your Response (Voice or Text)</label>
                
                <button
                  onClick={handleRecordToggle}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isRecording 
                      ? 'bg-pink-600 text-white animate-pulse' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isRecording ? "Listening & Transcribing..." : "Speak Answer"}</span>
                </button>
              </div>

              <textarea
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type or dictate your answer here. Use structure: Situation, Action, Results..."
                className="bg-slate-900/90 text-white text-xs p-3.5 rounded-xl border border-white/10 w-full focus:border-purple-500 focus:outline-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    if (currentQuestionIdx > 0) {
                      setCurrentQuestionIdx(currentQuestionIdx - 1);
                      setUserAnswer(answersMap[questions[currentQuestionIdx - 1]?.id] || '');
                    }
                  }}
                  disabled={currentQuestionIdx === 0}
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white disabled:opacity-30"
                >
                  Previous Question
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 flex items-center space-x-2"
                >
                  <span>{currentQuestionIdx === questions.length - 1 ? "Complete & Submit Interview" : "Next Question"}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right 1 Col: Key points & Live Guidelines */}
          <div className="space-y-6">
            <div className="glass-card p-5 rounded-xl border border-white/10 space-y-4">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Evaluation Keypoints</h4>
              <p className="text-xs text-gray-400">The AI interviewer is evaluating your answer against these core competencies:</p>
              
              <div className="space-y-2">
                {currentQuestion.idealAnswerKeypoints.map((pt, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-white/5 text-xs text-gray-300 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
