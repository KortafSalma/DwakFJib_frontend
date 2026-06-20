import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Search, Plus, Send, Paperclip, Check, CheckCheck,
  ChevronLeft, Trash2, User, X, Clock, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { messagingService } from '../../api';

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
};

const MessagingPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newConversationSubject, setNewConversationSubject] = useState('');
  const [newConversationParticipant, setNewConversationParticipant] = useState('');
  const [newConversationMessage, setNewConversationMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendingNew, setSendingNew] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [hasFiles, setHasFiles] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const pollTimerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const fetchConversations = useCallback(async () => {
    try {
      const params = searchQuery ? { search: searchQuery } : {};
      const res = await messagingService.getConversations(params);
      const data = res.data?.data || res.data || [];
      setConversations(data);
    } catch {
      toast.error('Impossible de charger les conversations');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const fetchMessages = useCallback(async (conversationId) => {
    if (!conversationId) return;
    setLoadingMessages(true);
    try {
      const res = await messagingService.getMessages(conversationId);
      const data = res.data?.data || res.data || [];
      setMessages(Array.isArray(data) ? data.reverse() : []);
      scrollToBottom();
    } catch {
      toast.error('Impossible de charger les messages');
    } finally {
      setLoadingMessages(false);
    }
  }, [scrollToBottom]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      messagingService.markConversationRead(selectedConversation.id);
    }
  }, [selectedConversation, fetchMessages]);

  useEffect(() => {
    if (selectedConversation) {
      pollTimerRef.current = setInterval(() => {
        fetchMessages(selectedConversation.id);
      }, 5000);
      return () => clearInterval(pollTimerRef.current);
    }
  }, [selectedConversation, fetchMessages]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowMobileList(false);
    const updated = conversations.map((c) =>
      c.id === conversation.id ? { ...c, unread_count: 0 } : c
    );
    setConversations(updated);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !fileInputRef.current?.files?.length) return;
    setSending(true);
    try {
      const formData = new FormData();
      formData.append('body', newMessage);

      if (fileInputRef.current?.files?.length) {
        Array.from(fileInputRef.current.files).forEach((file) => {
          formData.append('attachments[]', file);
        });
      }

      const res = await messagingService.sendMessage(selectedConversation.id, formData);
      const sentMsg = res.data?.data || res.data;
      setMessages((prev) => [...prev, sentMsg]);
      setNewMessage('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setHasFiles(false);
      scrollToBottom();

      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? { ...c, last_message: sentMsg, updated_at: new Date().toISOString() }
            : c
        )
      );
    } catch {
      toast.error('Impossible d\'envoyer le message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const searchUsers = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearchingUsers(true);
    try {
      const res = await messagingService.getConversations({ search: query });
      const results = res.data?.data || [];
      setSearchResults(results);
    } catch {
      setSearchResults([]);
    } finally {
      setSearchingUsers(false);
    }
  };

  const handleCreateConversation = async () => {
    if (!newConversationParticipant.trim()) return;
    setSendingNew(true);
    try {
      const participantIds = newConversationParticipant
        .split(',')
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));

      const res = await messagingService.createConversation({
        subject: newConversationSubject || undefined,
        participants: participantIds,
        message: newConversationMessage || undefined,
      });
      const newConv = res.data?.data || res.data;
      setConversations((prev) => [newConv, ...prev]);
      setShowNewModal(false);
      setNewConversationSubject('');
      setNewConversationParticipant('');
      setNewConversationMessage('');
      setSelectedConversation(newConv);
    } catch {
      toast.error('Impossible de créer la conversation');
    } finally {
      setSendingNew(false);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setShowMobileList(true);
  };

  const getOtherParticipants = (conversation) => {
    if (!conversation?.participants) return [];
    return conversation.participants.filter((p) => Number(p.id) !== Number(user?.id));
  };

  const getConversationTitle = (conversation) => {
    if (conversation?.subject) return conversation.subject;
    const others = getOtherParticipants(conversation);
    return others.map((p) => p.name).join(', ') || 'Conversation';
  };

  const messageStatusIcon = (msg) => {
    if (msg.is_read || msg.read_at) return <CheckCheck className="w-3.5 h-3.5 text-primary" />;
    if (msg.status === 'sent') return <Check className="w-3.5 h-3.5 text-contrast-muted" />;
    return <Clock className="w-3.5 h-3.5 text-contrast-muted" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex rounded-2xl border border-subtle bg-card overflow-hidden">
      <div className={`${selectedConversation && !showMobileList ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-80 xl:w-96 border-r border-subtle bg-body/50`}>
        <div className="p-4 border-b border-subtle">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-contrast-primary">Messages</h2>
            <button
              onClick={() => setShowNewModal(true)}
              className="w-9 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-contrast-muted mx-auto mb-3" />
              <p className="text-sm text-contrast-muted">No conversations yet</p>
              <button
                onClick={() => setShowNewModal(true)}
                className="mt-3 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
              >
                Start a conversation
              </button>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = selectedConversation?.id === conv.id;
              const others = getOtherParticipants(conv);
              const title = getConversationTitle(conv);
              const lastMsg = conv.last_message;

              return (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full p-3 flex items-start gap-3 border-b border-subtle hover:bg-elevated/50 transition-all text-left ${
                    isActive ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">
                      {title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-contrast-primary truncate">{title}</p>
                      {lastMsg && (
                        <span className="text-[10px] text-contrast-muted flex-shrink-0 ml-2">
                          {formatTime(conv.updated_at)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-contrast-secondary truncate mt-0.5">
                      {lastMsg ? lastMsg.body : 'No messages yet'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {others.slice(0, 2).map((p) => (
                        <span key={p.id} className="text-[10px] text-contrast-muted">
                          {p.role}
                        </span>
                      ))}
                      {conv.unread_count > 0 && (
                        <span className="ml-auto w-5 h-5 bg-primary rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                          {conv.unread_count > 9 ? '9+' : conv.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className={`${!selectedConversation || showMobileList ? 'hidden lg:flex' : 'flex'} flex-1 flex-col`}>
        {selectedConversation ? (
          <>
            <div className="p-4 border-b border-subtle flex items-center gap-3">
              <button
                onClick={handleBackToList}
                className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-contrast-secondary hover:bg-elevated"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">
                  {getConversationTitle(selectedConversation).charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-contrast-primary truncate">
                  {getConversationTitle(selectedConversation)}
                </h3>
                <p className="text-[10px] text-contrast-muted">
                  {getOtherParticipants(selectedConversation).map((p) => p.name).join(', ')}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-sm text-contrast-muted">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = Number(msg.sender_id) === Number(user?.id);
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                          isMine
                            ? 'bg-primary text-white rounded-br-md'
                            : 'bg-elevated border border-subtle text-contrast-primary rounded-bl-md'
                        }`}
                      >
                        {!isMine && (
                          <p className="text-[10px] font-medium text-contrast-muted mb-1">
                            {msg.sender?.name || 'Unknown'}
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.body}</p>
                        {msg.attachments?.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.attachments.map((att) => (
                              <a
                                key={att.id}
                                href={att.file_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 text-xs ${
                                  isMine ? 'text-white/80 hover:text-white' : 'text-primary hover:text-primary-dark'
                                }`}
                              >
                                <Paperclip className="w-3 h-3" />
                                {att.file_name}
                              </a>
                            ))}
                          </div>
                        )}
                        <div className={`flex items-center gap-1 mt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-[10px] ${isMine ? 'text-white/60' : 'text-contrast-muted'}`}>
                            {formatTime(msg.created_at)}
                          </span>
                          {isMine && messageStatusIcon(msg)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-subtle">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2.5 pr-10 text-sm bg-elevated border border-subtle rounded-xl text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    style={{ minHeight: 42, maxHeight: 120 }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-3 bottom-2.5 text-contrast-muted hover:text-contrast-primary transition-all"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                    onChange={(e) => setHasFiles(e.target.files?.length > 0)}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={(!newMessage.trim() && !hasFiles) || sending}
                  className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-contrast-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-contrast-primary mb-1">Your Messages</h3>
              <p className="text-sm text-contrast-muted">Select a conversation or start a new one</p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showNewModal && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowNewModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] bg-card border border-subtle rounded-2xl shadow-2xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-contrast-primary">New Conversation</h3>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-contrast-secondary hover:bg-elevated"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-contrast-secondary mb-1">Subject (optional)</label>
                  <input
                    type="text"
                    value={newConversationSubject}
                    onChange={(e) => setNewConversationSubject(e.target.value)}
                    placeholder="e.g., Question about order #123"
                    className="w-full px-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-contrast-secondary mb-1">Recipient User IDs</label>
                  <input
                    type="text"
                    value={newConversationParticipant}
                    onChange={(e) => {
                      setNewConversationParticipant(e.target.value);
                      searchUsers(e.target.value);
                    }}
                    placeholder="Enter user IDs, comma separated"
                    className="w-full px-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-[10px] text-contrast-muted mt-1">
                    Enter the user IDs of the people you want to message
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-contrast-secondary mb-1">Message (optional)</label>
                  <textarea
                    value={newConversationMessage}
                    onChange={(e) => setNewConversationMessage(e.target.value)}
                    placeholder="Type your first message..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-sm text-contrast-secondary hover:text-contrast-primary transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateConversation}
                  disabled={!newConversationParticipant.trim() || sendingNew}
                  className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {sendingNew ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Start Conversation
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagingPage;
