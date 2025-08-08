import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeSearchEngine, SearchResult } from '@/utils/employeeSearch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Users, Search, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  searchResults?: SearchResult[];
}

const SAMPLE_QUERIES = [
  "Find Python developers with 3+ years experience",
  "Who has worked on healthcare projects?", 
  "Suggest people for a React Native project",
  "Find developers who know both AWS and Docker",
  "Show me available UX designers",
  "Who can work on mobile banking apps?"
];

export function HRChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your HR assistant. I can help you find employees based on their skills, experience, projects, and availability. Try asking me something like:\n\n• Find Python developers with 3+ years experience\n• Who has worked on healthcare projects?\n• Show me available React developers",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const searchEngine = EmployeeSearchEngine.getInstance();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Search for employees
    const searchResults = searchEngine.searchEmployees(content);
    const responseContent = searchEngine.generateResponse(searchResults, content);

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      isUser: false,
      timestamp: new Date(),
      searchResults: searchResults.length > 0 ? searchResults : undefined,
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleSampleQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-surface border-b border-border shadow-soft">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">HR Resource Assistant</h1>
              <p className="text-sm text-muted-foreground">Find the right people for your projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col min-w-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
            <div className="py-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <ChatMessage
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                  
                  {/* Employee Results */}
                  {message.searchResults && message.searchResults.length > 0 && (
                    <div className="ml-11 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Search className="w-4 h-4" />
                        Found {message.searchResults.length} employee(s)
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {message.searchResults.slice(0, 6).map((result) => (
                          <EmployeeCard
                            key={result.employee.id}
                            employee={result.employee}
                            matchedCriteria={result.matchedCriteria}
                            relevanceScore={result.relevanceScore}
                          />
                        ))}
                      </div>
                      {message.searchResults.length > 6 && (
                        <p className="text-sm text-muted-foreground ml-2">
                          And {message.searchResults.length - 6} more results...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-chat-bot flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="bg-chat-bot rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Chat Input */}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>

        {/* Sidebar with Sample Queries */}
        <div className="w-80 border-l border-border bg-surface-secondary">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-foreground mb-2">Try these queries:</h3>
              <div className="space-y-2">
                {SAMPLE_QUERIES.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleQuery(query)}
                    className="w-full text-left p-3 text-sm bg-background border border-border rounded-lg hover:bg-muted transition-colors"
                    disabled={isLoading}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-foreground mb-2">Search Tips:</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">Skills</Badge>
                  <Badge variant="secondary" className="text-xs">Experience</Badge>
                  <Badge variant="secondary" className="text-xs">Projects</Badge>
                </div>
                <p>Use natural language like "Find React developers" or "Show available designers"</p>
                <p>Specify experience: "3+ years", "senior level"</p>
                <p>Filter by availability: "available now", "not busy"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}