import React, { useState, useEffect } from 'react';
import { mockMeetings } from '../data';
import { cn } from '../lib/utils';
import { 
  Upload, 
  Calendar, 
  CheckCircle2, 
  Lightbulb, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw,
  Share,
  Edit3,
  X,
  Check,
  AlertTriangle,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CandidateTask, TranscriptTurn } from '../types';
import { meetingNavigation } from '../lib/events';

interface Props {
  meetingId: string;
  onBack: () => void;
}

export function MeetingDetailView({ meetingId, onBack }: Props) {
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAudioCollapsed, setIsAudioCollapsed] = useState(false);
  const [activeSegment, setActiveSegment] = useState<'summary' | 'tasks' | 'transcript' | 'storyline'>(() => {
    const pending = meetingNavigation.getPending();
    if (pending && pending.meetingId === meetingId && pending.segment) {
      return pending.segment;
    }
    return 'summary';
  });
  const [selectedStorylineAttendee, setSelectedStorylineAttendee] = useState<string | null>(null);
  
  useEffect(() => {
    const pending = meetingNavigation.getPending();
    if (pending && pending.meetingId === meetingId) {
      meetingNavigation.clearPending();
    }
    const unsubscribe = meetingNavigation.subscribe((e) => {
      if (e.meetingId === meetingId && e.segment) {
        setActiveSegment(e.segment);
      }
    });
    return unsubscribe;
  }, [meetingId]);
  
  const meeting = mockMeetings.find(m => m.id === meetingId);

  if (!meeting) return null;

  return (
    <div className="flex flex-col h-full bg-[#f9fafb] animate-in slide-in-from-right-8 duration-300">
      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full rounded-t-3xl shadow-xl overflow-hidden h-[85%] flex flex-col animate-in slide-in-from-bottom-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="px-5 pb-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Privacy & Governance</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-900 bg-gray-100 p-1.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-8">
              
              <section>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Selective Redaction</h4>
                <p className="text-sm text-gray-500 mb-4">Select sensitive transcript segments to permanently strike from the RAG indexing pipeline.</p>
                <button className="w-full py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-200 transition-colors">
                  Open Redaction Tool
                </button>
              </section>

              <section>
                <h4 className="text-sm font-bold text-red-600 mb-2">Project-Scoped Purge</h4>
                <p className="text-sm text-gray-500 mb-4">Permanently delete all vector embeddings, transcripts, and securely clear raw audio files for this project. This action cannot be undone.</p>
                <button className="w-full py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl border border-red-200 hover:bg-red-100 transition-colors">
                  Purge Project Data
                </button>
              </section>

            </div>
          </div>
        </div>
      )}

      {showConsent && (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6 animate-in slide-in-from-bottom-4">
            <h3 className="text-xl font-semibold mb-1 tracking-tight text-gray-900">Session Setup</h3>
            <p className="text-gray-500 mb-6 text-sm">Review meeting metadata and confirm consent.</p>
            
            {/* Calendar Auto-Match Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                <Calendar className="w-4 h-4" />
                <span>EventKit Match</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Meeting Title</label>
                <input 
                  type="text" 
                  defaultValue={meeting.title} 
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-2">Detected Attendees</label>
                <div className="flex flex-wrap gap-2">
                  {meeting.attendees.map(a => (
                    <div key={a.id} className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-full pl-1 pr-3 py-1">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-medium", a.color)}>
                        {a.initials}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Project Workspace</label>
                <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                  <option>Thesis Project</option>
                  <option>Personal Life</option>
                </select>
              </div>
            </div>

            <label className="flex items-start space-x-3 mb-8 p-3 bg-red-50 rounded-xl border border-red-100 cursor-pointer transition-colors hover:bg-red-100/50">
              <input 
                type="checkbox" 
                checked={consentGiven} 
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-red-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-medium text-red-900 leading-tight">
                I confirm all attendees were explicitly notified and consented to this recording.
              </span>
            </label>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowConsent(false)}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                disabled={!consentGiven}
                onClick={() => setShowConsent(false)}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors",
                  consentGiven ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "bg-blue-300 cursor-not-allowed"
                )}
              >
                Ingest Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 pt-12 pb-3 shrink-0">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center space-x-1.5">
            <button 
              onClick={onBack}
              className="p-1.5 -ml-2 rounded-full hover:bg-gray-100 text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">{meeting.title}</h1>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"><Share className="w-4 h-4" /></button>
          </div>
        </div>

        {/* 4-Segment Controller */}
        <div className="flex p-1 bg-gray-100 rounded-lg">
          {(['summary', 'tasks', 'transcript', 'storyline'] as const).map(seg => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={cn(
                "flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all",
                activeSegment === seg ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeSegment === 'storyline' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {!selectedStorylineAttendee ? (
              <div className="grid grid-cols-3 gap-4">
                {meeting.attendees.map(a => (
                  <button 
                    key={a.id}
                    onClick={() => setSelectedStorylineAttendee(a.id)}
                    className="flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm active:scale-95 transition-transform"
                  >
                    <div className={cn("w-14 h-14 rounded-full flex items-center justify-center text-xl text-white font-bold mb-3 shadow-sm", a.color)}>
                      {a.initials}
                    </div>
                    <span className="text-sm font-semibold text-gray-900 text-center">{a.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4">
                <button 
                  onClick={() => setSelectedStorylineAttendee(null)}
                  className="flex items-center space-x-1 text-sm font-medium text-blue-600 mb-6 hover:text-blue-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Attendees</span>
                </button>

                {(() => {
                  const attendee = meeting.attendees.find(a => a.id === selectedStorylineAttendee);
                  if (!attendee) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm text-white font-bold shadow-sm", attendee.color)}>
                          {attendee.initials}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{attendee.name}'s Storyline</h3>
                          <p className="text-xs text-gray-500">Extracted perspective and intent</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                          <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">What They Want</h4>
                          <p className="text-sm text-blue-900 leading-relaxed">
                            Looking to streamline the current hardware integration process and reduce friction between the firmware updates and physical testing phases.
                          </p>
                        </div>

                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">What They See</h4>
                          <p className="text-sm text-emerald-900 leading-relaxed">
                            Noticing that current blockages are mainly due to misaligned expectations on delivery timelines for the prototype parts.
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                          <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-2">Talking About</h4>
                          <p className="text-sm text-purple-900 leading-relaxed">
                            Focused heavily on establishing a stricter milestone schedule and acquiring the new v3 sensory modules before next month.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {activeSegment === 'summary' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Executive Summary</h3>
              <ul className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                {meeting.summary.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                    <span className="text-gray-700 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Decisions Reached</h3>
              <div className="space-y-2">
                {meeting.decisions.map((decision, i) => (
                  <div key={decision.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start space-x-3">
                    <span className="font-semibold text-gray-400 mt-0.5">{i + 1}.</span>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm">{decision.text}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-md shrink-0">
                      [{decision.timestamp}]
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSegment === 'tasks' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {meeting.candidateTasks.map(task => (
              <div key={task.id} className={cn(
                "bg-white rounded-xl border shadow-sm p-4",
                task.duplicateOf ? "border-amber-300" : "border-gray-200"
              )}>
                {task.duplicateOf && (
                  <div className="flex items-start space-x-2 bg-amber-50 text-amber-800 text-xs p-2.5 rounded-lg mb-3">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Matches Open Task from Prev Sync. Update existing status or track as new?</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2 shrink-0">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-medium", task.assignee.color)}>
                      {task.assignee.initials}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{task.assignee.name}</span>
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center space-x-1.5 text-red-600 bg-red-50 border border-red-100 px-2 py-1 rounded-lg text-xs font-semibold shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due {task.dueDate}</span>
                    </div>
                  )}
                  <button onClick={() => setActiveSegment('transcript')} className="text-xs font-mono text-blue-500 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md shrink-0 transition-colors">
                    [{task.timestamp}]
                  </button>
                </div>
                <p className="text-gray-900 font-medium text-sm mb-4">{task.description}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                    <Check className="w-4 h-4" /> <span>Approve</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    <Edit3 className="w-4 h-4" /> <span>Edit</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-gray-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                    <X className="w-4 h-4" /> <span>Dismiss</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSegment === 'transcript' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
             {meeting.transcript.map((turn, idx) => {
               return (
                 <div key={turn.id} className="flex w-full justify-start">
                   <div className="flex max-w-[85%] space-x-2 flex-row">
                     <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-medium shrink-0", turn.speaker.color)}>
                       {turn.speaker.initials}
                     </div>
                     <div>
                       <div className="flex items-baseline space-x-2 mb-1 justify-start">
                         <span className="text-xs font-medium text-gray-500">{turn.speaker.name}</span>
                         <span className="text-[10px] font-mono text-gray-400">{turn.startTime}</span>
                       </div>
                       <div className="p-3 rounded-2xl text-sm leading-relaxed cursor-pointer active:scale-[0.98] transition-transform bg-white border border-gray-200 text-gray-800 shadow-sm rounded-tl-sm">
                         {turn.text}
                       </div>
                     </div>
                   </div>
                 </div>
               )
             })}
          </div>
        )}
      </div>

      {/* Audio Scrubber Dock */}
      <div className="shrink-0 relative z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 pb-[83px] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-all">
        {isAudioCollapsed ? (
          <div className="max-w-md mx-auto flex items-center justify-between h-8">
             <div className="flex items-center space-x-3">
               <button className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
                 <Play className="w-3.5 h-3.5 ml-0.5" />
               </button>
               <span className="text-sm font-semibold text-gray-900">14:32</span>
               <span className="text-xs font-medium text-gray-400">/ 30:40</span>
             </div>
             <button 
               onClick={() => setIsAudioCollapsed(false)} 
               className="p-2 -mr-2 text-gray-500 hover:text-gray-900"
             >
               <ChevronUp className="w-5 h-5" />
             </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-gray-500">14:32</span>
              <div className="flex-1 mx-4 h-8 flex items-center">
                {/* Fake waveform */}
                <div className="w-full h-full flex items-center justify-between space-x-[2px] opacity-60">
                   {Array.from({length: 40}).map((_, i) => (
                     <div key={i} className="w-1 bg-gray-300 rounded-full" style={{ height: `${Math.max(20, Math.random() * 100)}%`}} />
                   ))}
                </div>
              </div>
              <span className="text-xs font-mono text-gray-500">-30:40</span>
            </div>
            <div className="flex items-center justify-between px-6">
              <button className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">1.0x</button>
              <div className="flex items-center space-x-6">
                <button className="text-gray-700 hover:text-black"><RotateCcw className="w-6 h-6" /></button>
                <button className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                  <Play className="w-5 h-5 ml-1" />
                </button>
                <button className="text-gray-700 hover:text-black"><RotateCw className="w-6 h-6" /></button>
              </div>
              <button 
                onClick={() => setIsAudioCollapsed(true)}
                className="p-2 text-gray-500 hover:text-gray-900"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
