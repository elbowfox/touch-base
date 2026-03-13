'use client';

import { useState } from 'react';

interface ReachOutModalProps {
  ventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string, isAnonymous: boolean) => void;
}

export default function ReachOutModal({ ventId, isOpen, onClose, onSend }: ReachOutModalProps) {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim()) {
      onSend(message, isAnonymous);
      setMessage('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-zen-stone-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-zen shadow-zen max-w-lg w-full mx-4 p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-zen text-zen-stone-800">Reach Out 🤝</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zen-sand-100 hover:bg-zen-sand-200 flex items-center justify-center text-zen-stone-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-zen-stone-600 mb-4 leading-relaxed">
          Send a supportive message to this community member. Your kindness can make a difference.
        </p>

        {/* Message Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share words of support, encouragement, or simply let them know they're not alone..."
          className="w-full h-32 p-4 border border-zen-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zen-moss-400 resize-none text-zen-stone-800 font-serif"
          maxLength={500}
        />

        <div className="text-right text-xs text-zen-stone-500 mt-1 mb-4">
          {message.length}/500
        </div>

        {/* Anonymous Toggle */}
        <label className="flex items-center gap-3 mb-6 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors ${isAnonymous ? 'bg-zen-moss-500' : 'bg-zen-sand-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
            </div>
          </div>
          <span className="text-sm text-zen-stone-700">
            Send anonymously {isAnonymous ? '🎭' : ''}
          </span>
          {isAnonymous && (
            <span className="text-xs text-zen-stone-500 ml-auto">
              (costs 10 KP)
            </span>
          )}
        </label>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-zen-sand-300 text-zen-stone-700 rounded-full hover:bg-zen-sand-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-1 px-4 py-3 bg-zen-moss-500 text-white rounded-full hover:bg-zen-moss-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium hover:scale-105"
          >
            Send Support
          </button>
        </div>
      </div>
    </div>
  );
}
