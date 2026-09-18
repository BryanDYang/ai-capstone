import React, { useState } from 'react';
import { mockMeetings, mockProjects } from '../data';
import { cn } from '../lib/utils';
import { 
  ChevronDown, 
  FolderPlus,
  Filter,
  CheckCircle2,
  Clock,
  MoreVertical,
  Activity,
  Plus,
  Calendar,
  X,
  ChevronLeft,
  MoreHorizontal
} from 'lucide-react';
import { Meeting, ProjectWorkspace } from '../types';

interface Props {
  onSelectMeeting: (id: string) => void;
}

export function MeetingsListView({ onSelectMeeting }: Props) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null); // null = All Projects
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterSort, setFilterSort] = useState<'Date' | 'Duration'>('Date');
  const [isPlusDropdownOpen, setIsPlusDropdownOpen] = useState(false);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newMeetingTitle, setNewMeetingTitle] = useState('New Sync');
  const [newMeetingProject, setNewMeetingProject] = useState(mockProjects[0]?.id || '');
  const [newMeetingDate, setNewMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [newProjectName, setNewProjectName] = useState('');

  const filteredMeetings = mockMeetings.filter(m => 
    selectedProject ? m.projectId === selectedProject : true
  );

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7]">
      {showAddProjectModal && (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold tracking-tight text-gray-900">Add Project</h3>
              <button onClick={() => setShowAddProjectModal(false)} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-1.5 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-500 mb-6 text-sm">Create a new workspace for your meetings.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                <FolderPlus className="w-4 h-4" />
                <span>Project Details</span>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Project Name</label>
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  placeholder="e.g. Thesis Research"
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddProjectModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddProjectModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddMeetingModal && (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold tracking-tight text-gray-900">Add Meeting</h3>
              <button onClick={() => setShowAddMeetingModal(false)} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-1.5 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-500 mb-6 text-sm">EventKit auto-match found a recent calendar event.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                <Calendar className="w-4 h-4" />
                <span>EventKit Match</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Meeting Title</label>
                <input 
                  type="text" 
                  value={newMeetingTitle}
                  onChange={e => setNewMeetingTitle(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                <input 
                  type="date" 
                  value={newMeetingDate}
                  onChange={e => setNewMeetingDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Project Workspace</label>
                <div className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 font-medium">
                  {mockProjects.find(p => p.id === selectedProject)?.title || "Select a project first"}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Audio File</label>
                <input 
                  type="file"
                  accept="audio/*"
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddMeetingModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddMeetingModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
              >
                Add Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-4 pt-12 pb-3 shrink-0 relative z-20">
        <div className="flex justify-between items-center mb-1">
          {selectedProject ? (
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center space-x-1.5 active:opacity-70 transition-opacity -ml-2"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                {mockProjects.find(p => p.id === selectedProject)?.title}
              </h1>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Projects
              </h1>
            </div>
          )}
          <div className="relative">
            <button 
              onClick={() => {
                if (selectedProject) {
                  setShowAddMeetingModal(true);
                } else {
                  setShowAddProjectModal(true);
                }
              }}
              className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 shrink-0"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {!selectedProject ? (
          // Projects List
          <div className="px-4 pt-4 space-y-3">
            {mockProjects.map(proj => (
              <div 
                key={proj.id}
                onClick={() => setSelectedProject(proj.id)}
                className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* Image / Icon placeholder */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: `${proj.colorHex}20`, borderColor: `${proj.colorHex}40` }}
                  >
                    <span className="text-lg font-bold" style={{ color: proj.colorHex }}>
                      {proj.title.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-base font-bold text-gray-900">{proj.title}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); }} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Session Stream
          <div className="px-4 pb-8 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Session Stream</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-medium flex items-center"><Filter className="w-3 h-3 mr-1"/> Date </span>
              </div>
            </div>

            <div className="space-y-3">
              {filteredMeetings.map(meeting => (
                <button 
                  key={meeting.id} 
                  onClick={() => onSelectMeeting(meeting.id)}
                  className="w-full text-left bg-white rounded-2xl p-4 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-transform relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-bold text-gray-900 truncate pr-4">{meeting.title}</h3>
                    <span className="text-xs font-mono font-medium text-gray-500 shrink-0">{meeting.date}</span>
                  </div>
                  
                  {/* Mini Waveform Strip & Duration */}
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2 border border-gray-100">
                    <span className="text-xs font-mono text-gray-500 font-medium shrink-0">{meeting.duration}</span>
                    <div className="flex-1 h-5 flex items-center items-end space-x-[2px] opacity-60">
                      {meeting.waveformPeaks?.map((peak, idx) => (
                        <div 
                          key={idx} 
                          className={cn("w-1 rounded-t-full transition-all duration-300", idx < 12 ? "bg-blue-500" : "bg-gray-300")} 
                          style={{ height: `${peak * 100}%` }}
                        />
                      )) || <div className="h-0.5 w-full bg-gray-200 rounded-full" />}
                    </div>
                  </div>
                </button>
              ))}
              
              {filteredMeetings.length === 0 && (
                 <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
                   <p className="text-sm font-medium text-gray-400">Drop MP3 here or sync from Voice Memos</p>
                   <p className="text-xs text-gray-400">to assign to this workspace.</p>
                 </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
